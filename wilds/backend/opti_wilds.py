import json
from itertools import product
from typing import Any

import pulp
from tqdm.auto import tqdm

from amulet_finder import generate_amulets
from i18n_utils import DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, iter_entry_name_values, localize_names


def _get_names(entry):
    return localize_names(entry)


def _normalize_item(item):
    normalized = dict(item)
    normalized['id'] = str(item.get('id', item.get('name', '')))
    normalized['names'] = _get_names(item)
    return normalized


def _find_by_id_or_name(entries, value):
    if value is None:
        return None
    str_value = str(value)
    for entry in entries:
        if str(entry.get('id')) == str_value:
            return entry
        if str_value in set(iter_entry_name_values(entry)):
            return entry
    return None


def load_data_files():
    """
    Load data files for items, decorations, skills, and sets.

    Returns:
        tuple: (items_data, decorations, available_skills, available_sets)
    """
    items_data = json.load(open('../db/items.json', encoding='utf-8'))
    for group, entries in items_data.items():
        items_data[group] = [_normalize_item(item) for item in entries]

    decorations_raw = json.load(open('../db/decorations.json', encoding='utf-8'))
    decorations = []
    for deco in decorations_raw:
        normalized: dict[str, Any] = dict(deco)
        normalized['id'] = str(deco.get('id', deco.get('name', '')))
        normalized['names'] = _get_names(deco)
        decorations.append(normalized)

    available_skills_raw = json.load(open('../db/skills.json', encoding='utf-8'))
    available_skills = [
        {
            'id': str(skill['id']),
            'names': _get_names(skill),
            'icon': skill.get('icon'),
            'max_points': skill.get('max_points'),
        }
        for skill in available_skills_raw
    ]

    available_sets_raw = json.load(open('../db/sets.json', encoding='utf-8'))

    def _normalize_set_list(entries):
        if entries and isinstance(entries[0], str):
            return [
                {
                    'id': name,
                    'names': {lang: name for lang in SUPPORTED_LANGUAGES},
                    'icon': None,
                }
                for name in entries
            ]
        return [
            {
                'id': str(entry['id']),
                'names': _get_names(entry),
                'icon': entry.get('icon'),
            }
            for entry in entries
        ]

    available_sets = {
        'sets': _normalize_set_list(available_sets_raw.get('sets', [])),
        'groups': _normalize_set_list(available_sets_raw.get('groups', [])),
    }

    return items_data, decorations, available_skills, available_sets


def define_data(
    desired_skills,
    desired_sets,
    items_data,
    decorations,
    include_all_amulets=True,
    transcend=False,
    include_gog_sets=False,
    gog_set_filter='',
    gog_group_filter='',
):
    """
    Define all the input data for the optimizer, including skills, groups, sets, items, and decorations.

    Returns:
        dict: A dictionary containing all defined data.
    """
    groups = ['weapon', 'head', 'chest', 'arms', 'waist', 'legs', 'amulet']
    armor_groups = ['weapon', 'head', 'chest', 'arms', 'waist', 'legs']

    skill_catalog = {
        str(skill['id']): {
            'names': _get_names(skill),
            'icon': skill.get('icon'),
        }
        for skill in desired_skills
    }
    skill_name_to_id = {}
    for skill_id, skill_data in skill_catalog.items():
        for value in skill_data['names'].values():
            if value:
                skill_name_to_id[value] = skill_id

    if include_all_amulets:
        generated = generate_amulets(
            [
                skill_catalog[s['id']]['names'].get(DEFAULT_LANGUAGE, '')
                for s in desired_skills
                if s['id'] in skill_catalog
            ],
            only_better_slots=True,
        )
        generated_items = []
        for amulet in generated:
            amulet_id = f"generated:{amulet['name']}"
            generated_items.append({
                'id': amulet_id,
                'names': {lang: amulet['name'] for lang in SUPPORTED_LANGUAGES},
                'skills': {
                    skill_name_to_id[name]: value
                    for name, value in amulet.get('skills', {}).items()
                    if name in skill_name_to_id
                },
                'slots': amulet.get('slots', []),
                'rarity': amulet.get('rarity'),
                'groups': amulet.get('groups', []),
            })
        items_data['amulet'] += generated_items

    if include_gog_sets or gog_set_filter or gog_group_filter:
        generated_weapons = []

        desired_set_lookup = {str(x['set_id']): x for x in desired_sets}
        desired_skill_sets = [x for x in desired_sets if not x.get('is_group', False)]
        desired_skill_groups = [x for x in desired_sets if x.get('is_group', False)]

        # include_gog_sets=True full expansion from desired sets/groups.
        # include_gog_sets=False uses explicit filters to add only matching GOG variants.
        if include_gog_sets:
            set_candidates = desired_skill_sets or [None]
            group_candidates = desired_skill_groups or [None]
        else:
            set_candidates = [
                ({
                    'set_id': str(gog_set_filter),
                    'set_name': desired_set_lookup.get(str(gog_set_filter), {}).get('set_name', str(gog_set_filter)),
                    'set_names': desired_set_lookup.get(str(gog_set_filter), {}).get('set_names', {
                        lang: str(gog_set_filter) for lang in SUPPORTED_LANGUAGES
                    }),
                } if gog_set_filter else None)
            ]
            group_candidates = [
                ({
                    'set_id': str(gog_group_filter),
                    'set_name': desired_set_lookup.get(str(gog_group_filter), {}).get('set_name', str(gog_group_filter)),
                    'set_names': desired_set_lookup.get(str(gog_group_filter), {}).get('set_names', {
                        lang: str(gog_group_filter) for lang in SUPPORTED_LANGUAGES
                    }),
                    'is_group': True,
                } if gog_group_filter else None)
            ]

        for item_data in items_data['weapon']:
            if not item_data.get('is_gog', False):
                continue

            for skill_set, skill_group in product(set_candidates, group_candidates):
                set_ids = []
                set_names = {lang: [] for lang in SUPPORTED_LANGUAGES}
                if skill_set is not None:
                    set_ids.append(str(skill_set['set_id']))
                    localized_names = skill_set.get('set_names', {})
                    for lang in SUPPORTED_LANGUAGES:
                        set_names[lang].append(
                            localized_names.get(lang) or skill_set.get('set_name', str(skill_set['set_id']))
                        )
                if skill_group is not None:
                    set_ids.append(str(skill_group['set_id']))
                    localized_names = skill_group.get('set_names', {})
                    for lang in SUPPORTED_LANGUAGES:
                        set_names[lang].append(
                            localized_names.get(lang) or skill_group.get('set_name', str(skill_group['set_id']))
                        )

                if not set_ids:
                    continue

                item_names = _get_names(item_data)

                generated_weapons.append({
                    **item_data,
                    'id': f"{item_data['id']}:gog:{'|'.join(set_ids)}",
                    'names': {
                        lang: f"{item_names.get(lang, item_names.get(DEFAULT_LANGUAGE, ''))} ({', '.join(set_names[lang])})"
                        for lang in SUPPORTED_LANGUAGES
                    },
                    'sets': set_ids,
                })

        items_data['weapon'] += generated_weapons

    return {
        'desired_skills': desired_skills,
        'groups': groups,
        'armor_groups': armor_groups,
        'desired_sets': desired_sets,
        'items_data': items_data,
        'decorations': decorations,
        'transcend': transcend,
        'skill_catalog': skill_catalog,
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

    prob = pulp.LpProblem("MHWi_Build_Optimizer", pulp.LpMaximize)

    item_vars = {group: {} for group in groups}
    for group in groups:
        for item in items_data[group]:
            item_id = item['id']
            var = pulp.LpVariable(f"{group}_{item_id}", cat='Binary')
            item_vars[group][item_id] = var

    for group in groups:
        prob += pulp.lpSum(item_vars[group].values()) == 1, f"One_{group}"

    for ds in desired_sets:
        set_id = ds['set_id']
        set_sum = pulp.lpSum(
            item_vars[group][item['id']]
            for group in armor_groups
            for item in items_data[group]
            if set_id in item.get('sets', [])
        )
        prob += set_sum >= ds['min_pieces'], f"Min_Set_{set_id}"

    deco_vars = {'A': {}, 'W': {}}
    deco_size = {'A': {}, 'W': {}}
    for deco in decorations:
        deco_id = deco['id']
        var = pulp.LpVariable(f"deco_{deco['type']}_{deco_id}", lowBound=0, cat='Integer')
        deco_vars[deco['type']][deco_id] = var
        deco_size[deco['type']][deco_id] = deco['size']

    slots_T_L = {'A': {}, 'W': {}}
    for level in levels:
        for slot_type in slot_types:
            expr = pulp.lpSum(
                item_vars[group][item['id']] * sum(
                    1
                    for slot in item.get(
                        'transcended_slots' if transcend and 'transcended_slots' in item else 'slots',
                        []
                    )
                    if slot['value'] == level and slot['type'] == slot_type
                )
                for group in groups for item in items_data[group]
            )
            slots_T_L[slot_type][level] = expr

    used_vars = {}
    for level in levels:
        used_vars[level] = {}
        for slot_type in slot_types:
            used_vars[level][slot_type] = {}
            for size in range(1, level + 1):
                used_vars[level][slot_type][size] = pulp.LpVariable(
                    f"used_L{level}_T{slot_type}_S{size}", lowBound=0, cat='Integer'
                )

    for level in levels:
        for slot_type in slot_types:
            prob += (
                pulp.lpSum(used_vars[level][slot_type][size] for size in range(1, level + 1))
                <= slots_T_L[slot_type][level]
            ), f"slot_usage_T{slot_type}_L{level}"

    for size in levels:
        for slot_type in slot_types:
            decos_size_type = pulp.lpSum(
                deco_vars[slot_type].get(deco_id, 0)
                for deco_id in deco_vars[slot_type]
                if deco_size[slot_type][deco_id] == size
            )
            prob += (
                pulp.lpSum(used_vars[level][slot_type][size] for level in range(size, max_level + 1))
                == decos_size_type
            ), f"deco_assignment_S{size}_T{slot_type}"

    skills = {str(skill['id']): skill for skill in desired_skills}

    effective_vars = {}
    for skill_id in skills:
        effective_vars[skill_id] = pulp.LpVariable(f"effective_{skill_id}", lowBound=0)

    for skill_id in skills:
        level_expr = 0
        for group in groups:
            for item in items_data[group]:
                if skill_id in item.get('skills', {}):
                    level_expr += item_vars[group][item['id']] * item['skills'][skill_id]
        for deco in decorations:
            if skill_id in deco.get('skills', {}):
                level_expr += deco_vars[deco['type']][deco['id']] * deco['skills'][skill_id]

        prob += effective_vars[skill_id] <= level_expr, f"Level_{skill_id}"
        prob += effective_vars[skill_id] <= skills[skill_id]['max_points'], f"Max_{skill_id}"

    prob += pulp.lpSum(effective_vars[skill_id] * skills[skill_id]['weight'] for skill_id in skills)

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
    skills = {str(skill['id']): skill for skill in data['desired_skills']}
    slot_types = ['A', 'W']

    build: dict[str, Any] = {'items': {}, 'decorations': {'A': {}, 'W': {}}, 'slots': {}, 'skills': {}, 'score': 0}

    sel_vars = []
    for group in groups:
        for item_id, var in item_vars[group].items():
            if var.value() == 1:
                build['items'][group] = item_id
                sel_vars.append(var)

    for slot_type in slot_types:
        for deco_id, var in deco_vars[slot_type].items():
            count = int(var.value())
            if count > 0:
                build['decorations'][slot_type][deco_id] = count

    for skill_id in skills:
        level = sum(
            item_vars[group][item['id']].value() * item.get('skills', {}).get(skill_id, 0)
            for group in groups
            for item in items_data[group]
        ) + sum(
            deco_vars[deco['type']][deco['id']].value() * deco.get('skills', {}).get(skill_id, 0)
            for deco in decorations
        )
        max_points = int(skills[skill_id].get('max_points', 5))
        effective = min(level, max_points)
        build['skills'][skill_id] = effective

    build['score'] = sum(effective_vars[skill_id].value() * skills[skill_id]['weight'] for skill_id in skills)

    selected_slots = {}
    for group in groups:
        item_id = build['items'][group]
        for item in items_data[group]:
            if item['id'] == item_id:
                selected_slots[group] = [
                    {'idx': idx + 1, 'level': slot['value'], 'type': slot['type'], 'assigned': None}
                    for idx, slot in enumerate(item.get('transcended_slots' if transcend and 'transcended_slots' in item else 'slots', []))
                ]

    deco_list = []
    for slot_type in slot_types:
        for deco_id, count in build['decorations'][slot_type].items():
            for _ in range(count):
                deco_list.append({'id': deco_id, 'size': deco_size[slot_type][deco_id], 'type': slot_type})
    deco_list.sort(key=lambda d: d['size'], reverse=True)

    for deco in deco_list:
        assigned = False
        for group in groups:
            if group not in selected_slots:
                continue
            for slot in selected_slots[group]:
                if slot['assigned'] is None and slot['level'] >= deco['size'] and slot['type'] == deco['type']:
                    slot['assigned'] = deco['id']
                    assigned = True
                    break
            if assigned:
                break

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
    skills = {str(skill['id']): skill for skill in data['desired_skills']}
    items_index = {
        group: {item['id']: item for item in data['items_data'][group]}
        for group in data['groups']
    }

    for idx, build in enumerate(builds, 1):
        build_str = f"Build {idx} (Score: {build['score']}):{next_line}"
        build_str += f"Items:{next_line}"
        for group, item_id in build['items'].items():
            slots = build['slots'][group]
            slots_desc = ", ".join(slot['assigned'] or "-" for slot in slots)
            item_name = _get_names(items_index[group][item_id])['en']
            build_str += f"{group.capitalize()}: {item_name} [{slots_desc}]{next_line}"

        build_str += f"{next_line}Skills:{next_line}"
        for skill_id, effective in build['skills'].items():
            skill_name = _get_names(skills[skill_id])['en']
            build_str += f"{skill_name}: {int(effective)}/{skills[skill_id]['max_points']} (weight: {skills[skill_id]['weight']}){next_line}"
        output.append(build_str)

    return output


def output_builds_json(builds, data):
    """
    Returns the collected builds in a structured JSON format.

    Args:
        builds (list): List of build dictionaries.
        data (dict): The data dictionary from define_data().

    Returns:
        list: List of structured build dictionaries.
    """
    output = []
    skills_info = {str(skill['id']): skill for skill in data['desired_skills']}
    items_index = {
        group: {item['id']: item for item in data['items_data'][group]}
        for group in data['groups']
    }
    deco_index = {deco['id']: deco for deco in data['decorations']}

    # Build set/group name lookup from DB so results can show exact bonuses.
    sets_db = json.load(open('../db/sets.json', encoding='utf-8'))
    set_lookup = {
        str(s['id']): {'names': _get_names(s), 'icon': s.get('icon')}
        for s in sets_db.get('sets', [])
    }
    group_lookup = {
        str(g['id']): {'names': _get_names(g), 'icon': g.get('icon')}
        for g in sets_db.get('groups', [])
    }

    for idx, build in enumerate(builds, 1):
        items = []
        set_bonus_counts: dict[str, int] = {}
        group_bonus_counts: dict[str, int] = {}
        for group, item_id in build['items'].items():
            item_data = items_index[group][item_id]
            slots = build['slots'][group]
            slots_list = []
            for slot in slots:
                decoration_id = slot['assigned'] or None
                decoration_names = _get_names(deco_index[decoration_id]) if decoration_id else None
                slots_list.append({
                    'decoration_id': decoration_id,
                    'decoration_names': decoration_names,
                    'size': slot['level'],
                    'type': slot['type']
                })

            amulet_details = None
            if group == 'amulet' and item_id.startswith('generated:'):
                amulet_details = {
                    'rarity': item_data.get('rarity'),
                    'groups': item_data.get('groups', []),
                    'skills': [
                        {
                            'id': skill_id,
                            'names': data['skill_catalog'].get(skill_id, {}).get('names', {lang: skill_id for lang in SUPPORTED_LANGUAGES}),
                            'icon': data['skill_catalog'].get(skill_id, {}).get('icon'),
                            'value': value,
                        }
                        for skill_id, value in item_data.get('skills', {}).items()
                    ]
                }

            for bonus_id in item_data.get('sets', []):
                str_bonus_id = str(bonus_id)
                if str_bonus_id in set_lookup:
                    set_bonus_counts[str_bonus_id] = set_bonus_counts.get(str_bonus_id, 0) + 1
                elif str_bonus_id in group_lookup:
                    group_bonus_counts[str_bonus_id] = group_bonus_counts.get(str_bonus_id, 0) + 1

            items.append({
                'slot': group,
                'id': item_id,
                'names': _get_names(item_data),
                'gear_key': str(item_id).split(':', 1)[0] if group == 'weapon' else group,
                'decorations': slots_list,
                'amulet_details': amulet_details,
            })

        skills = []
        for skill_id, effective in build['skills'].items():
            skill_info = skills_info.get(skill_id, {'id': skill_id, 'names': {'en': skill_id, 'fr': skill_id}})
            skills.append({
                'id': skill_id,
                'names': _get_names(skill_info),
                'icon': skill_info.get('icon'),
                'current': int(effective),
                'max': skill_info.get('max_points', 5),
                'weight': skill_info.get('weight', 10)
            })

        active_set_bonuses = [
            {
                'id': set_id,
                'names': set_lookup[set_id]['names'],
                'icon': set_lookup[set_id].get('icon'),
                'count': count,
            }
            for set_id, count in sorted(set_bonus_counts.items())
            if count >= 2
        ]
        active_group_bonuses = [
            {
                'id': group_id,
                'names': group_lookup[group_id]['names'],
                'icon': group_lookup[group_id].get('icon'),
                'count': count,
            }
            for group_id, count in sorted(group_bonus_counts.items())
            if count >= 3
        ]

        output.append({
            'id': idx,
            'score': build['score'],
            'items': items,
            'skills': skills,
            'set_bonuses': active_set_bonuses,
            'group_bonuses': active_group_bonuses,
        })

    return output


def run_optimizer(data, N, return_status=False):
    prob, item_vars, deco_vars, deco_size, effective_vars, skills = setup_problem(data)

    builds = []
    seen_skill_configs = []
    k = 0
    last_status = 'Optimal'

    with tqdm(total=N) as pbar:
        while len(builds) < N:
            prob.solve(pulp.PULP_CBC_CMD(msg=False))

            current_status = pulp.LpStatus[prob.status]
            if current_status != 'Optimal':
                last_status = current_status
                print(f"No more optimal solutions found. (status = {current_status})")
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

    if return_status:
        return builds, last_status
    return builds


def main():
    """
    Main function to run the optimizer.
    """
    # Define the desired skills with max points and weights
    desired_skills = json.load(open('../db/loadouts.json', encoding='utf-8'))['ig']

    # User-defined set restrictions
    desired_sets = [
        {'set': "Rey Dau's Voltage", 'min_pieces': 2},
        {'set': "Lord's Soul", 'min_pieces': 3},
    ]  # or [] for no restrictions
    items_data_default, decorations_default, available_skills, available_sets = load_data_files()

    # items filter
    items_data_default['weapon'] = [
        item for item in items_data_default['weapon']
        if _get_names(item)['en'] == 'Levin Acrus'
    ]
    #
    # items_data_default['head'] = [item for item in items_data_default['head'] if _get_names(item)['en'] != 'Rey Sandhelm γ']

    data = define_data(desired_skills, desired_sets, items_data_default, decorations_default)
    builds = run_optimizer(data, N=10)

    print(*output_builds(builds, data), sep="\n" + "-" * 40 + "\n\n")


if __name__ == "__main__":
    main()
