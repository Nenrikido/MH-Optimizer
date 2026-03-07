from flask import Flask, request, send_from_directory, jsonify
import os

from opti_wilds import load_data_files, define_data, run_optimizer, output_builds_json

app = Flask(__name__)


@app.route('/api/run', methods=['POST'])
def run_optimization():
    items_data_default, decorations_default, available_skills, available_sets = load_data_files()

    data_json = request.get_json()

    # Extraire les skills
    desired_skills = []
    for skill in data_json.get('skills', []):
        desired_skills.append({
            'name': skill.get('name'),
            'max_points': skill.get('max_points', 5),
            'weight': skill.get('weight', 10)
        })

    # Extraire les sets
    desired_sets = []
    for armor_set in data_json.get('sets', []):
        name = armor_set.get('name')
        if name and ((is_group := name in available_sets["groups"]) or name in available_sets["sets"]):
            desired_sets.append({
                'set': name,
                'min_pieces': armor_set.get('min_pieces', 2),
                'is_group': is_group
            })

    # Extraire les weapons
    desired_weapons = [weapon.get('name') for weapon in data_json.get('weapons', [])]

    # Extraire les amulets
    custom_amulets_list = []
    for amulet in data_json.get('amulets', []):
        amulet_data = {
            "name": amulet.get('name', 'Custom Amulet'),
            "skills": {}
        }
        for skill in amulet.get('skills', []):
            if skill.get('name'):
                amulet_data['skills'][skill['name']] = skill.get('value', 1)

        # Parse slots
        slots_str = amulet.get('slots', '')
        if slots_str:
            amulet_data['slots'] = list(map(
                lambda x: {
                    "value": int(x[-1]),
                    "type": "W" if x[0] == "W" else "A"
                },
                slots_str.split('-0')[0].split('-')
            ))

        custom_amulets_list.append(amulet_data)

    # Filter items_data
    filtered_items_data = {k: v for k, v in items_data_default.items()}

    # Filter weapons
    filtered_items_data['weapon'] = [item for item in filtered_items_data['weapon'] if item['name'] in desired_weapons]

    # Add custom amulets
    filtered_items_data['amulet'] += custom_amulets_list

    # Filter decorations
    filtered_decorations = decorations_default

    # Extraire les options
    options = data_json.get('options', {})
    N = min(options.get('N', 1), 5)

    data = define_data(
        desired_skills,
        desired_sets,
        filtered_items_data,
        filtered_decorations,
        include_all_amulets=options.get('include_all_amulets', False),
        transcend=options.get('transcend', False),
        include_gog_sets=options.get('include_gog_sets', False)
    )

    builds = run_optimizer(data, N)

    return jsonify(output_builds_json(builds, data))


@app.route('/api/available_items', methods=['GET'])
def available_items():
    items_data_default, _, available_skills, available_sets = load_data_files()
    available_weapons = list(map(lambda x: x['name'], items_data_default['weapon']))
    available_sets = available_sets["sets"] + available_sets["groups"]
    return jsonify({
        "available_skills": available_skills,
        "available_sets": available_sets,
        "available_weapons": available_weapons
    })


@app.route('/assets/<path:path>')
def send_assets(path):
    """Serve React build assets (JS, CSS, etc.)"""
    dist_folder = os.path.join(app.root_path, '..', 'frontend', 'dist', 'assets')
    return send_from_directory(dist_folder, path)


@app.route('/favicon.png')
def serve_favicon():
    """Serve favicon"""
    # Try dist first (production build)
    dist_folder = os.path.join(app.root_path, '..', 'frontend', 'dist')
    favicon_dist = os.path.join(dist_folder, 'favicon.png')
    if os.path.exists(favicon_dist):
        return send_from_directory(dist_folder, 'favicon.png')

    # Fallback to public folder (development)
    public_folder = os.path.join(app.root_path, '..', 'frontend', 'public')
    return send_from_directory(public_folder, 'favicon.png')


@app.route('/')
def serve_index():
    """Serve index.html for root path"""
    dist_folder = os.path.join(app.root_path, '..', 'frontend', 'dist')
    return send_from_directory(dist_folder, 'index.html')


@app.route('/<path:path>')
def serve_react_app(path):
    """Serve React app with fallback to index.html for client-side routing"""
    dist_folder = os.path.join(app.root_path, '..', 'frontend', 'dist')
    dist_file = os.path.join(dist_folder, path)

    # Serve file if it exists in dist folder
    if os.path.exists(dist_file) and os.path.isfile(dist_file):
        return send_from_directory(dist_folder, path)

    # For development: serve .tsx, .ts files from frontend root
    if path.endswith(('.tsx', '.ts', '.js', '.jsx', '.css')):
        frontend_folder = os.path.join(app.root_path, '..', 'frontend')
        frontend_file = os.path.join(frontend_folder, path)
        if os.path.exists(frontend_file) and os.path.isfile(frontend_file):
            return send_from_directory(frontend_folder, path)

    # Fallback to index.html for client-side routing
    return send_from_directory(dist_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)

