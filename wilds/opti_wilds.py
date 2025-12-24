import json
from itertools import product

import pulp
from tqdm.auto import tqdm

from amulet_finder import generate_amulets


def load_data_files():
    """
    Load data files for items, decorations, skills, and sets.

    Returns:
        tuple: (items_data, decorations, available_skills, available_sets)
    """

    # group -> list of dicts {'name': str, 'skills': {skill: points}, 'slots': [{'value': value, 'type': slot_type}, ...], 'set': str (optional)}
    items_data = json.load(open('db/items.json'))

    # list of dicts {'name': str, 'skills': {skill: points}, 'size': int, 'type': slot_type}
    decorations = json.load(open('db/decorations.json'))

    # List of skill names
    available_skills = json.load(open('db/skills.json'))

    # List of set names
    available_sets = json.load(open('db/sets.json'))

    return items_data, decorations, available_skills, available_sets


def define_data(desired_skills, desired_sets, items_data, decorations, include_all_amulets=True, transcend=False,
                include_gog_sets=False):
    """
    Define all the input data for the optimizer, including skills, groups, sets, items, and decorations.

    Returns:
        dict: A dictionary containing all defined data.
    """

    # Define the groups
    groups = ['weapon', 'head', 'chest', 'arms', 'waist', 'legs', 'amulet']
    armor_groups = ['weapon', 'head', 'chest', 'arms', 'waist', 'legs']

    if include_all_amulets:
        # add generated amulets
        items_data['amulet'] += generate_amulets(
            [s['name'] for s in desired_skills],
            only_better_slots=True,
        )

    if include_gog_sets:
        generated_weapons = []
        for item_data in items_data['weapon']:
            if item_data.get('is_gog', False):
                skill_sets = list(filter(lambda x: not x['is_group'], desired_sets))
                skill_groups = list(filter(lambda x: x['is_group'], desired_sets))
                for i, (skill_set, skill_group) in enumerate(product(skill_sets or [None], skill_groups or [None]), 1):
                    sets = []
                    if skill_set is not None:
                        sets.append(skill_set['set'])
                    if skill_group is not None:
                        sets.append(skill_group['set'])
                    generated_weapons.append({
                        **item_data,
                        'name': f"{item_data['name']} ({', '.join(sets)})",
                        'sets': sets
                    })
        items_data['weapon'] += generated_weapons

    return {
        'desired_skills': desired_skills,
        'groups': groups,
        'armor_groups': armor_groups,
        'desired_sets': desired_sets,
        'items_data': items_data,
        'decorations': decorations,
        "transcend": transcend
    }


def setup_problem(data):
    """
    Set up the PuLP optimization problem, including variables, constraints, and objective.

    Args:
        data (dict): The data dictionary from define_data().

    Returns:
        tuple: (prob, item_vars, deco_vars, deco_size, effective_vars, skills)
    """
    desired_skills = data['desired_skills']
    groups = data['groups']
    armor_groups = data['armor_groups']
    desired_sets = data['desired_sets']
    items_data = data['items_data']
    decorations = data['decorations']
    transcend = data['transcend']

    max_level = 4
    levels = range(1, max_level + 1)
    slot_types = ['A', 'W']

    # Create the optimization problem
    prob = pulp.LpProblem("MHWi_Build_Optimizer", pulp.LpMaximize)

    # Binary variables for selecting items in each group
    item_vars = {group: {} for group in groups}
    for group in groups:
        for item in items_data[group]:
            var = pulp.LpVariable(f"{group}_{item['name']}", cat='Binary')
            item_vars[group][item['name']] = var

    # Constraints: exactly one item per group
    for group in groups:
        prob += pulp.lpSum(item_vars[group].values()) == 1, f"One_{group}"

    # Set restrictions
    for ds in desired_sets:
        set_sum = pulp.lpSum(
            item_vars[group][item['name']]
            for group in armor_groups
            for item in items_data[group]
            if ds['set'] in item.get('sets')
        )
        prob += set_sum >= ds['min_pieces'], f"Min_Set_{ds['set']}"

    # Integer variables for number of each decoration
    deco_vars = {'A': {}, 'W': {}}
    deco_size = {'A': {}, 'W': {}}
    for deco in decorations:
        var = pulp.LpVariable(f"deco_{deco['type']}_{deco['name']}", lowBound=0, cat='Integer')
        deco_vars[deco['type']][deco['name']] = var
        deco_size[deco['type']][deco['name']] = deco['size']

    # Total slots per level and type
    slots_T_L = {'A': {}, 'W': {}}
    for L in levels:
        for T in slot_types:
            expr = pulp.lpSum(
                item_vars[group][item['name']] * sum(
                    1 for slot in item['transcended_slots' if transcend and 'transcended_slots' in item else 'slots'] if
                    slot['value'] == L and slot['type'] == T)
                for group in groups for item in items_data[group]
            )
            slots_T_L[T][L] = expr

    # Used variables: used_L_T_S for slots of level L type T used by decos of size S
    used_vars = {}
    for L in levels:
        used_vars[L] = {}
        for T in slot_types:
            used_vars[L][T] = {}
            for S in range(1, L + 1):
                used_vars[L][T][S] = pulp.LpVariable(f"used_L{L}_T{T}_S{S}", lowBound=0, cat='Integer')

    # Constraints for slot usage per level and type
    for L in levels:
        for T in slot_types:
            prob += pulp.lpSum(used_vars[L][T][S] for S in range(1, L + 1)) <= slots_T_L[T][L], f"slot_usage_T{T}_L{L}"

    # Constraints for deco assignment per size and type
    for S in levels:
        for T in slot_types:
            decos_S_T = pulp.lpSum(
                deco_vars[T].get(name, 0) for name in deco_vars[T] if deco_size[T][name] == S
            )
            prob += pulp.lpSum(
                used_vars[L][T][S] for L in range(S, max_level + 1)
            ) == decos_S_T, f"deco_assignment_S{S}_T{T}"

    # All skills from desired
    skills = {skill['name']: skill for skill in desired_skills}

    # Effective level variables
    effective_vars = {}
    for skill in skills:
        effective_vars[skill] = pulp.LpVariable(f"effective_{skill}", lowBound=0)

    # For each skill, compute level and constrain effective
    for skill in skills:
        level_expr = 0
        # From items
        for group in groups:
            for item in items_data[group]:
                if skill in item['skills']:
                    level_expr += item_vars[group][item['name']] * item['skills'][skill]
        # From decorations
        for deco in decorations:
            if skill in deco['skills']:
                level_expr += deco_vars[deco['type']][deco['name']] * deco['skills'][skill]

        prob += effective_vars[skill] <= level_expr, f"Level_{skill}"
        prob += effective_vars[skill] <= skills[skill]['max_points'], f"Max_{skill}"

    # Objective: maximize weighted sum of effective levels
    prob += pulp.lpSum(effective_vars[skill] * skills[skill]['weight'] for skill in skills)

    return prob, item_vars, deco_vars, deco_size, effective_vars, skills


def collect_build(prob, item_vars, deco_vars, deco_size, effective_vars, data):
    """
    Collect the current optimal build after solving, including items, decorations, skills, and slot assignments.

    Args:
        prob (pulp.LpProblem): The solved PuLP problem.
        item_vars (dict): Item selection variables.
        deco_vars (dict): Decoration variables.
        deco_size (dict): Decoration sizes.
        effective_vars (dict): Effective skill level variables.
        data (dict): The data dictionary from define_data().

    Returns:
        dict: The collected build data.
    """
    groups = data['groups']
    items_data = data['items_data']
    decorations = data['decorations']
    transcend = data['transcend']
    skills = {skill['name']: skill for skill in data['desired_skills']}
    slot_types = ['A', 'W']

    build = {'items': {}, 'decorations': {'A': {}, 'W': {}}, 'slots': {}, 'skills': {}, 'score': 0}

    # Selected items
    sel_vars = []
    for group in groups:
        for name, var in item_vars[group].items():
            if var.value() == 1:
                build['items'][group] = name
                sel_vars.append(var)

    # Selected decorations
    for slot_type in slot_types:
        for name, var in deco_vars[slot_type].items():
            count = int(var.value())
            if count > 0:
                build['decorations'][slot_type][name] = count

    # Achieved skills
    for skill in skills:
        level = sum(
            item_vars[group][item['name']].value() * item['skills'].get(skill, 0)
            for group in groups
            for item in items_data[group]
        ) + sum(
            deco_vars[deco['type']][deco['name']].value() * deco['skills'].get(skill, 0)
            for deco in decorations
        )
        effective = min(level, skills[skill]['max_points'])
        build['skills'][skill] = effective

    # Total score
    build['score'] = sum(effective_vars[skill].value() * skills[skill]['weight'] for skill in skills)

    # Post-processing: Assign decorations to specific slots
    # Collect selected slots
    selected_slots = {}
    for group in groups:
        name = build['items'][group]
        for item in items_data[group]:
            if item['name'] == name:
                selected_slots[group] = [
                    {'idx': idx + 1, 'level': slot['value'], 'type': slot['type'], 'assigned': None}
                    for idx, slot in enumerate(item['transcended_slots' if transcend and 'transcended_slots' in item else 'slots'])
                ]

    # Collect deco instances to place, sorted by size descending
    deco_list = []
    for slot_type in slot_types:
        for name, count in build['decorations'][slot_type].items():
            for _ in range(count):
                deco_list.append({'name': name, 'size': deco_size[slot_type][name], 'type': slot_type})
    deco_list.sort(key=lambda d: d['size'], reverse=True)

    # Assign decos to slots
    for deco in deco_list:
        assigned = False
        for group in groups:
            if group not in selected_slots:
                continue
            for slot in selected_slots[group]:
                if slot['assigned'] is None and slot['level'] >= deco['size'] and slot['type'] == deco['type']:
                    slot['assigned'] = deco['name']
                    assigned = True
                    break
            if assigned:
                break
        if not assigned:
            print("Warning: Could not assign decoration to a slot (should not happen).")

    # Store slot assignments
    build['slots'] = selected_slots

    return build, sel_vars


def output_builds(builds, data, next_line="\n"):
    """
    Returns the collected builds in a readable format.

    Args:
        builds (list): List of build dictionaries.
        data (dict): The data dictionary from define_data().
        next_line (str): Line separator, default is newline.
    """
    output = []
    skills = {skill['name']: skill for skill in data['desired_skills']}
    for idx, build in enumerate(builds, 1):
        build_str = f"Build {idx} (Score: {build['score']}):{next_line}"
        build_str += f"Items:{next_line}"
        for group, name in build['items'].items():
            slots = build['slots'][group]
            slots_dic = {}
            for slot in slots:
                slots_dic[slot['idx']] = slot['assigned'] or "-"
            slots_desc = ", ".join(slots_dic[i] for i in range(1, len(slots_dic) + 1))
            if group == 'amulet' and name.startswith('Amulet_R'):
                amulet = next((a for a in data['items_data']['amulet'] if a['name'] == name), None)
                name = f"R{amulet['rarity']}, G{'|'.join(map(str, amulet['groups']))}, {', '.join(k + ': ' + str(v) for k, v in amulet['skills'].items())}"
            build_str += f"{group.capitalize()}: {name} [{slots_desc}]{next_line}"

        build_str += f"{next_line}Skills:{next_line}"
        for skill, effective in build['skills'].items():
            build_str += f"{skill}: {int(effective)}/{skills[skill]['max_points']} (weight: {skills[skill]['weight']}){next_line}"

        output.append(build_str)
    return output


def run_optimizer(data, N):
    prob, item_vars, deco_vars, deco_size, effective_vars, skills = setup_problem(data)

    builds = []
    seen_skill_configs = []
    k = 0

    with tqdm(total=N) as pbar:
        while len(builds) < N:
            prob.solve(pulp.PULP_CBC_CMD(msg=False))

            if pulp.LpStatus[prob.status] != 'Optimal':
                break

            build, sel_vars = collect_build(prob, item_vars, deco_vars, deco_size, effective_vars, data)

            # maybe render this optional
            current_skills = {s: build['skills'][s] for s in build['skills']}
            if current_skills in seen_skill_configs:
                prob += pulp.lpSum(1 - v for v in sel_vars) >= 1, f"exclude_piece_combo_{k}"
                k += 1
                continue

            builds.append(build)
            seen_skill_configs.append(current_skills)

            prob += pulp.lpSum(1 - v for v in sel_vars) >= 1, f"exclude_build_{k}"
            pbar.update(1)
            k += 1

    return builds


def main():
    """
    Main function to run the optimizer.
    """
    # Define the desired skills with max points and weights
    desired_skills = json.load(open('./db/loadouts.json', encoding='utf-8'))['ig']

    # User-defined set restrictions
    desired_sets = [
        {'set': "Rey Dau's Voltage", 'min_pieces': 2},
        {'set': "Lord's Soul", 'min_pieces': 3},
    ]  # or [] for no restrictions
    items_data_default, decorations_default, available_skills, available_sets = load_data_files()

    # items filter
    items_data_default['weapon'] = [item for item in items_data_default['weapon'] if 'Levin Acrus' == item['name']]
    #
    # items_data_default['head'] = [item for item in items_data_default['head'] if 'Rey Sandhelm γ' != item['name']]

    data = define_data(desired_skills, desired_sets, items_data_default, decorations_default)
    builds = run_optimizer(data, N=10)

    print(*output_builds(builds, data), sep="\n" + "-" * 40 + "\n\n")


if __name__ == "__main__":
    main()
