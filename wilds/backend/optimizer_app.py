from flask import Flask, request, send_from_directory, jsonify
import os

from i18n_utils import (
    DEFAULT_LANGUAGE,
    SUPPORTED_LANGUAGES,
    build_name_to_id,
    extract_request_language,
    localize_names,
)
from opti_wilds import load_data_files, define_data, run_optimizer, output_builds_json

app = Flask(__name__)


def _names(entry):
    return localize_names(entry)


def _derive_custom_amulet_name(input_name, skill_items, skill_by_id, slots_str):
    if input_name and str(input_name).strip():
        return str(input_name).strip()

    parts = []
    for skill_id, value in skill_items.items():
        names = _names(skill_by_id.get(str(skill_id), {'name': str(skill_id)}))
        parts.append(f"{names.get(DEFAULT_LANGUAGE, str(skill_id))} Lv{value}")

    suffix = f" [{slots_str}]" if slots_str else ''
    if not parts:
        return f"Custom Amulet{suffix}" if suffix else 'Custom Amulet'
    return f"{' + '.join(parts)}{suffix}"


def _weapon_gear_key(item_id):
    return str(item_id).split(':', 1)[0] if item_id else 'weapon'


@app.route('/api/run', methods=['POST'])
def run_optimization():
    items_data_default, decorations_default, available_skills, available_sets = load_data_files()

    data_json = request.get_json(silent=True) or {}
    request_language = extract_request_language(request, data_json)

    skill_by_id = {str(skill['id']): skill for skill in available_skills}
    skill_name_to_id = build_name_to_id(available_skills)

    set_entries = available_sets.get('sets', []) + available_sets.get('groups', [])
    set_by_id = {str(s['id']): s for s in set_entries}
    set_name_to_id = build_name_to_id(set_entries)
    group_ids = set(str(s['id']) for s in available_sets.get('groups', []))

    desired_skills = []
    for skill in data_json.get('skills', []):
        skill_id = skill.get('id')
        if not skill_id:
            skill_id = skill_name_to_id.get(skill.get('name'))
        if not skill_id or skill_id not in skill_by_id:
            continue
        desired_skills.append({
            'id': str(skill_id),
            'names': _names(skill_by_id[str(skill_id)]),
            'icon': skill_by_id[str(skill_id)].get('icon'),
            'max_points': skill.get('max_points', 5),
            'weight': skill.get('weight', 10)
        })

    desired_sets = []
    for armor_set in data_json.get('sets', []):
        set_id = armor_set.get('id')
        if not set_id:
            set_id = set_name_to_id.get(armor_set.get('name'))
        if not set_id or set_id not in set_by_id:
            continue
        set_names = _names(set_by_id[str(set_id)])
        desired_sets.append({
            'set_id': str(set_id),
            'set_name': set_names.get(DEFAULT_LANGUAGE, str(set_id)),
            'set_names': set_names,
            'min_pieces': armor_set.get('min_pieces', 2),
            'is_group': str(set_id) in group_ids,
        })

    desired_weapon_ids = []
    weapon_name_to_id = build_name_to_id(items_data_default['weapon'])

    for weapon in data_json.get('weapons', []):
        weapon_id = weapon.get('id')
        if not weapon_id:
            weapon_id = weapon_name_to_id.get(weapon.get('name'))
        if weapon_id:
            desired_weapon_ids.append(str(weapon_id))

    custom_amulets_list = []
    for idx, amulet in enumerate(data_json.get('amulets', [])):
        custom_skills = {}
        for skill in amulet.get('skills', []):
            skill_id = skill.get('id')
            if not skill_id:
                skill_id = skill_name_to_id.get(skill.get('name'))
            if skill_id:
                custom_skills[str(skill_id)] = int(skill.get('value', 1) or 1)

        slots_str = amulet.get('slots', '')
        slots = []
        if slots_str:
            slots = list(map(
                lambda x: {
                    'value': int(x[-1]),
                    'type': 'W' if x[0] == 'W' else 'A'
                },
                slots_str.split('-0')[0].split('-')
            ))

        # Skip fully empty custom amulets.
        if not custom_skills and not slots:
            continue

        amulet_name = _derive_custom_amulet_name(
            amulet.get('name', ''),
            custom_skills,
            skill_by_id,
            slots_str,
        )

        amulet_data = {
            'id': f"custom:{idx}",
            'names': {lang: amulet_name for lang in SUPPORTED_LANGUAGES},
            'skills': custom_skills,
            'slots': slots,
        }

        custom_amulets_list.append(amulet_data)

    filtered_items_data = {k: v[:] for k, v in items_data_default.items()}

    options = data_json.get('options', {})

    # Filter by excluded armor items (by item ID)
    excluded_items = options.get('excluded_armor_items', [])
    if excluded_items:
        excluded_items_set = set(excluded_items)
        for armor_type in ['head', 'chest', 'arms', 'waist', 'legs']:
            if armor_type in filtered_items_data:
                filtered_items_data[armor_type] = [
                    item for item in filtered_items_data[armor_type]
                    if item['id'] not in excluded_items_set
                ]

    # Filter weapons by selection only.
    if desired_weapon_ids:
        desired_weapon_ids_set = set(desired_weapon_ids)
        filtered_items_data['weapon'] = [
            item for item in filtered_items_data['weapon']
            if str(item['id']) in desired_weapon_ids_set
        ]

    # GOG set/group filters are applied in define_data (variant generation), not here.
    gog_set_filter = options.get('gog_set_filter', '')
    gog_group_filter = options.get('gog_group_filter', '')

    filtered_items_data['amulet'] += custom_amulets_list

    N = min(options.get('N', 1), 5)

    data = define_data(
        desired_skills,
        desired_sets,
        filtered_items_data,
        decorations_default,
        include_all_amulets=options.get('include_all_amulets', False),
        transcend=options.get('transcend', False),
        include_gog_sets=options.get('include_gog_sets', False),
        gog_set_filter=gog_set_filter,
        gog_group_filter=gog_group_filter,
    )

    builds, status = run_optimizer(data, N, return_status=True)

    if not builds:
        if status == 'Infeasible':
            return jsonify({
                'results': [
                    "No feasible build found with the current constraints.\n"
                    "Try reducing required set pieces, lowering skill caps/weights, "
                    "or widening weapon/armor filters."
                ],
                'meta': {
                    'language': request_language,
                    'default_language': DEFAULT_LANGUAGE,
                    'supported_languages': SUPPORTED_LANGUAGES,
                    'status': status,
                },
            })
        return jsonify({
            'results': [f"Optimization ended with status: {status}"],
            'meta': {
                'language': request_language,
                'default_language': DEFAULT_LANGUAGE,
                'supported_languages': SUPPORTED_LANGUAGES,
                'status': status,
            },
        })

    return jsonify({
        'results': output_builds_json(builds, data),
        'meta': {
            'language': request_language,
            'default_language': DEFAULT_LANGUAGE,
            'supported_languages': SUPPORTED_LANGUAGES,
            'status': status,
        },
    })


@app.route('/api/available_items', methods=['GET'])
def available_items():
    items_data_default, _, available_skills, available_sets = load_data_files()
    request_language = extract_request_language(request)

    available_weapons = [
        {
            'id': weapon['id'],
            'names': _names(weapon),
            'gear_key': _weapon_gear_key(weapon['id']),
        }
        for weapon in items_data_default['weapon']
    ]

    # Collect all armor items from all armor types (exclude weapons)
    available_armor_items = []
    for armor_type in ['head', 'chest', 'arms', 'waist', 'legs']:
        for armor_item in items_data_default.get(armor_type, []):
            available_armor_items.append({
                'id': armor_item['id'],
                'names': _names(armor_item),
                'gear_key': armor_type,
            })

    # Separate sets and groups
    available_sets_list = [
        {'id': s['id'], 'names': _names(s), 'icon': s.get('icon')}
        for s in available_sets.get('sets', [])
    ]
    available_groups_list = [
        {'id': g['id'], 'names': _names(g), 'icon': g.get('icon')}
        for g in available_sets.get('groups', [])
    ]

    return jsonify({
        'available_skills': available_skills,
        'available_armor_items': available_armor_items,
        'available_sets': available_sets_list,
        'available_groups': available_groups_list,
        'available_weapons': available_weapons,
        'meta': {
            'language': request_language,
            'default_language': DEFAULT_LANGUAGE,
            'supported_languages': SUPPORTED_LANGUAGES,
        },
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


@app.route('/gear.png')
def serve_gear_icon():
    """Serve gear spritesheet"""
    # Try dist first (production build)
    dist_folder = os.path.join(app.root_path, '..', 'frontend', 'dist')
    gear_dist = os.path.join(dist_folder, 'gear.png')
    if os.path.exists(gear_dist):
        response = send_from_directory(dist_folder, 'gear.png')
        response.cache_control.max_age = 31536000  # 1 year
        return response

    # Fallback to public folder (development)
    public_folder = os.path.join(app.root_path, '..', 'frontend', 'public')
    response = send_from_directory(public_folder, 'gear.png')
    response.cache_control.max_age = 3600  # 1 hour for dev
    return response


@app.route('/skills.png')
def serve_skills_icon():
    """Serve skills spritesheet"""
    # Try dist first (production build)
    dist_folder = os.path.join(app.root_path, '..', 'frontend', 'dist')
    skills_dist = os.path.join(dist_folder, 'skills.png')
    if os.path.exists(skills_dist):
        response = send_from_directory(dist_folder, 'skills.png')
        response.cache_control.max_age = 31536000  # 1 year
        return response

    # Fallback to public folder (development)
    public_folder = os.path.join(app.root_path, '..', 'frontend', 'public')
    response = send_from_directory(public_folder, 'skills.png')
    response.cache_control.max_age = 3600  # 1 hour for dev
    return response


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
