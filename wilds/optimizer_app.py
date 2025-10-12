from flask import Flask, request, render_template, send_from_directory

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
            if name:
                desired_sets.append({'set': name, 'min_pieces': min_pieces})
        elif key.startswith('weapons_') and (i := int(key.split('_')[-1])) not in traversed_weapons_idx:
            name = request.form[f'weapons_name_{i}']
            traversed_weapons_idx.append(i)
            if name:
                desired_weapons.append(name)


    # Filter items_data
    filter_items = request.form.get('filter_items', '')
    filtered_items_data = {k: v for k, v in items_data_default.items() if not filter_items or filter_items.lower() in k.lower()}

    # Filter weapons
    filtered_items_data['weapon'] = [item for item in filtered_items_data['weapon'] if item['name'] in desired_weapons]

    # Filter decorations
    filter_decos = request.form.get('filter_decos', '')
    filtered_decorations = [d for d in decorations_default if not filter_decos or filter_decos.lower() in d['name'].lower()]

    N = min(int(request.form['N']), 20)

    data = define_data(desired_skills, desired_sets, filtered_items_data, filtered_decorations, include_all_amulets=request.form.get('include_all_amulets', ''))

    builds = run_optimizer(data, N)

    return output_builds(builds, data, next_line="<br>")

@app.route('/', methods=['GET'])
def index():
    items_data_default, _, available_skills, available_sets = load_data_files()

    available_weapons = list(map(lambda x: x['name'], items_data_default['weapon']))

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
