# we can use https://download-directory.github.io to download the directory
# https://github.com/LartTyler/mhdb-wilds-data/tree/main/output/merged from github in ./full_db
# full link : https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FLartTyler%2Fmhdb-wilds-data%2Ftree%2Fmain%2Foutput%2Fmerged

from glob import glob
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
FULL_DB_DIR = ROOT_DIR / 'full_db'
OUT_DIR = ROOT_DIR / 'db'

weapon_files = [
    *filter(
        lambda f: 'HuntingHorn' not in f or 'HuntingHorn.' in f,
        glob(str(FULL_DB_DIR / 'weapons' / '*.json'))
    )
]


def get_names(entry):
    names = entry.get('names', {})
    en = names.get('en', '')
    fr = names.get('fr', en)
    return {'en': en, 'fr': fr}


skill_name_by_id = {}
skills = []
sets = []
groups = []
for skill in json.load(open(FULL_DB_DIR / 'Skill.json', encoding='utf-8')):
    skill_id = str(skill['game_id'])
    names = get_names(skill)
    skill_name_by_id[skill_id] = names['en']

    entry = {'id': skill_id, 'names': names}
    if skill['kind'] in ('armor', 'weapon'):
        skills.append(entry)
    elif skill['kind'] == 'set':
        sets.append(entry)
    else:
        groups.append(entry)

skills.sort(key=lambda s: s['names']['en'])
sets.sort(key=lambda s: s['names']['en'])
groups.sort(key=lambda s: s['names']['en'])

json.dump(skills, open(OUT_DIR / 'skills.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
json.dump({'sets': sets, 'groups': groups}, open(OUT_DIR / 'sets.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)

# build decorations db
decorations = []
for decoration in json.load(open(FULL_DB_DIR / 'Accessory.json', encoding='utf-8')):
    decorations.append({
        'id': str(decoration['game_id']),
        'names': get_names(decoration),
        'skills': {str(skill_id): skill_points for skill_id, skill_points in decoration['skills'].items()},
        'size': decoration['level'],
        'type': 'A' if decoration['allowed_on'] == 'armor' else 'W'
    })
json.dump(decorations, open(OUT_DIR / 'decorations.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)

# build items db
items = {
    'weapon': [],
    'head': [],
    'chest': [],
    'arms': [],
    'waist': [],
    'legs': [],
    'amulet': []
}
weapon_ids = set()
weapon_names = set()  # Track kind+name to avoid Gogmazios duplicates
for weapon_file in weapon_files:
    weapons = json.load(open(weapon_file, encoding='utf-8'))
    for weapon in weapons:
        weapon_kind = str(weapon.get('kind', 'weapon'))
        weapon_id = f"{weapon_kind}:{weapon['game_id']}"
        if weapon_id in weapon_ids:
            continue
        weapon_ids.add(weapon_id)

        # Check if this is a Gogmazios weapon (multiple variants with same name)
        names = get_names(weapon)
        weapon_name_key = f"{weapon_kind}:{names['en']}"
        is_gog = weapon['series_id'] is None and weapon['crafting']['zenny_cost'] == 300

        # Skip duplicate Gog weapon variants (keep only first encountered)
        if is_gog and weapon_name_key in weapon_names:
            continue
        weapon_names.add(weapon_name_key)

        items['weapon'].append({
            'id': weapon_id,
            'names': names,
            'skills': {str(skill_id): skill_points for skill_id, skill_points in weapon['skills'].items()},
            'slots': [{'value': slot, 'type': 'W'} for slot in weapon['slots']],
            'sets': [],
            'is_gog': is_gog
        })

armors = json.load(open(FULL_DB_DIR / 'Armor.json', encoding='utf-8'))
for armor in armors:
    for idx, armor_piece in enumerate(armor['pieces']):
        armor_set_ids = []
        if armor['set_bonus']:
            armor_set_ids.append(str(armor['set_bonus']['skill_id']))
        if armor['group_bonus']:
            armor_set_ids.append(str(armor['group_bonus']['skill_id']))

        slots = []
        transcended_slots = []
        upgraded_slots = 0
        for slot_index in range(3):
            try:
                slot_value = armor_piece['slots'][slot_index]
                slots.append({'value': slot_value, 'type': 'A'})
            except IndexError:
                slot_value = 0
            if armor['rarity'] in (5, 6):
                slot_value += (slot_value < 3 and (upgraded_slots < 2 or armor['rarity'] == 5))
                if slot_value > 0:
                    transcended_slots.append({'value': slot_value, 'type': 'A'})
                upgraded_slots += 1

        armor_skills = {}
        for skill_id, skill_points in armor_piece['skills'].items():
            str_skill_id = str(skill_id)
            if str_skill_id in skill_name_by_id:
                armor_skills[str_skill_id] = skill_points
            else:
                armor_set_ids.append(str_skill_id)

        items[armor_piece['kind']].append({
            'id': f"{armor['game_id']}:{armor_piece['kind']}:{idx}",
            'names': get_names(armor_piece),
            'sets': armor_set_ids,
            'skills': armor_skills,
            'slots': slots,
            'transcended_slots': transcended_slots or slots
        })

amulets = json.load(open(FULL_DB_DIR / 'Amulet.json', encoding='utf-8'))
for amulet in amulets:
    if amulet['is_random']:
        continue
    for rank_index, amulet_rank in enumerate(amulet['ranks']):
        items['amulet'].append({
            'id': f"{amulet['game_id']}:{rank_index}",
            'names': get_names(amulet_rank),
            'skills': {str(skill_id): skill_points for skill_id, skill_points in amulet_rank['skills'].items()},
            'slots': []
        })

json.dump(items, open(OUT_DIR / 'items.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
