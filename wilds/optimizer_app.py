from flask import Flask, request, render_template, send_from_directory

from opti_wilds import load_data_files, define_data, run_optimizer, output_builds

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    items_data_default, decorations_default, available_skills, available_sets = load_data_files()

    if request.method == 'POST':
        try:
            desired_skills = []
            traversed_skills_idx = []
            desired_sets = []
            traversed_sets_idx = []
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


            # Filter items_data
            filter_items = request.form.get('filter_items', '')
            items_data_input = {k: v for k, v in items_data_default.items() if not filter_items or filter_items.lower() in k.lower()}

            # todo : change with selected weapon
            items_data_input['weapon'] = [item for item in items_data_input['weapon'] if 'Dimensius' == item['name']]

            # Filter decorations
            filter_decos = request.form.get('filter_decos', '')
            decorations_filtered = [d for d in decorations_default if not filter_decos or filter_decos.lower() in d['name'].lower()]

            N = int(request.form['N'])

            data = define_data(desired_skills, desired_sets, items_data_input, decorations_filtered, include_all_amulets=request.form.get('include_all_amulets', ''))

            builds = run_optimizer(data, N)

            # Format builds
            output = output_builds(builds, data, next_line="<br>")

            return render_template('result.html', output=output)

        except Exception as e:
            return f"Error: {str(e)}"

    return render_template('form.html', available_skills=available_skills, available_sets=available_sets)

@app.route('/static/<path:path>', methods=['GET'])
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    # app.run(host='127.0.0.1', debug=True)
    app.run(host='0.0.0.0')
