from flask import Flask, request, render_template, send_from_directory, jsonify

from opti_wilds import load_data_files, define_data, run_optimizer, output_builds

app = Flask(__name__)


@app.route('/run', methods=['POST'])
def run_optimization():
    items_data_default, decorations_default, available_skills, available_sets = load_data_files()

    desired_skills = []
    traversed_skills_idx = []
    desired_sets = []
    traversed_sets_idx = []
    desired_weapons = []
    traversed_weapons_idx = []

    custom_amulets = {}

    for key, value in request.form.items():
        if key.startswith('skills_') and (i := int(key.split('_')[-1])) not in traversed_skills_idx:
            name = request.form[f'skills_name_{i}']
            max_points = int(request.form.get(f'skills_max_{i}', 5))
            weight = int(request.form.get(f'skills_weight_{i}', 10))
            traversed_skills_idx.append(i)
            if name:
                desired_skills.append({'name': name, 'max_points': max_points, 'weight': weight})
        elif key.startswith('sets_') and (i := int(key.split('_')[-1])) not in traversed_sets_idx:
            name = request.form[f'sets_name_{i}']
            min_pieces = int(request.form.get(f'sets_min_{i}', 2))
            traversed_sets_idx.append(i)
            if name and ((is_group := name in available_sets["groups"]) or name in available_sets["sets"]):
                desired_sets.append({'set': name, 'min_pieces': min_pieces, 'is_group': is_group})
        elif key.startswith('weapons_') and (i := int(key.split('_')[-1])) not in traversed_weapons_idx:
            name = request.form[f'weapons_name_{i}']
            traversed_weapons_idx.append(i)
            if name:
                desired_weapons.append(name)
        elif '_amulet_' in key:
            amulet_idx = key.split('_')[-1]
            if amulet_idx not in custom_amulets:
                custom_amulets[amulet_idx] = {
                    "name": f"Custom Amulet {amulet_idx}",
                    "skills": {"1": {}, "2": {}, "3": {}}
                }
            if key.startswith('skill_name_'):
                custom_amulets[amulet_idx]['skills'][key.split('_')[2]]['name'] = value
            elif key.startswith('skill_value_'):
                custom_amulets[amulet_idx]['skills'][key.split('_')[2]]['value'] = value
            elif key.startswith('slots_'):
                custom_amulets[amulet_idx]['slots'] = list(map(
                    lambda x: {
                        "value": int(x[-1]),
                        "type": "W" if x[0] == "W" else "A"
                    },
                    value.split('-0')[0].split('-')
                ))

    custom_amulets_list = []
    for amulet in custom_amulets.values():
        amulet["skills"] = {skill["name"]: skill["value"] for skill in amulet["skills"].values()}
        custom_amulets_list.append(amulet)

    # Filter items_data
    filter_items = request.form.get('filter_items', '')
    filtered_items_data = {k: v for k, v in items_data_default.items() if
                           not filter_items or filter_items.lower() in k.lower()}

    # Filter weapons
    filtered_items_data['weapon'] = [item for item in filtered_items_data['weapon'] if item['name'] in desired_weapons]

    # Add custom amulets
    filtered_items_data['amulet'] += custom_amulets_list

    # Filter decorations
    filter_decos = request.form.get('filter_decos', '')
    filtered_decorations = [d for d in decorations_default if
                            not filter_decos or filter_decos.lower() in d['name'].lower()]

    N = min(int(request.form['N']), 20)

    data = define_data(
        desired_skills,
        desired_sets,
        filtered_items_data,
        filtered_decorations,
        include_all_amulets=request.form.get('include_all_amulets', False),
        transcend=request.form.get('transcend', False),
        include_gog_sets=request.form.get('include_gog_sets', False)
    )

    builds = run_optimizer(data, N)

    return output_builds(builds, data, next_line="<br>")


@app.route('/available_items', methods=['GET'])
def available_items():
    items_data_default, _, available_skills, available_sets = load_data_files()
    available_weapons = list(map(lambda x: x['name'], items_data_default['weapon']))
    available_sets = available_sets["sets"] + available_sets["groups"]
    return jsonify({
        "available_skills": available_skills,
        "available_sets": available_sets,
        "available_weapons": available_weapons
    })

@app.route('/', methods=['GET'])
def index():
    items_data_default, _, available_skills, available_sets = load_data_files()

    available_weapons = list(map(lambda x: x['name'], items_data_default['weapon']))

    available_sets = available_sets["sets"] + available_sets["groups"]

    return render_template(
        'form.html',
        available_skills=available_skills,
        available_sets=available_sets,
        available_weapons=available_weapons
    )


@app.route('/static/<path:path>', methods=['GET'])
def send_static(path):
    return send_from_directory('static', path)




if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
