# we can use https://download-directory.github.io to download the directory
# https://github.com/LartTyler/mhdb-wilds-data/tree/main/output/merged from github in ./full_db
# full link : https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FLartTyler%2Fmhdb-wilds-data%2Ftree%2Fmain%2Foutput%2Fmerged

from glob import glob
import json

weapon_files = [*filter(
    lambda f: 'HuntingHorn' not in f or 'HuntingHorn.' in f,
    glob('./full_db/weapons/*.json')
)]

skills = {}
sets = {}
for skill in json.load(open('./full_db/Skill.json', encoding='utf-8')):
    if skill['kind'] == 'armor' or skill['kind'] == 'weapon':
        skills[str(skill['game_id'])] = skill['names']['en']
    else:
        sets[str(skill['game_id'])] = skill['names']['en']

# build skills db
skills_db = sorted(set(skills.values()))
json.dump(skills_db, open('db/skills.json', 'w', encoding='utf-8'), indent=2)

# build sets db
sets_db = sorted(set(sets.values()))
json.dump(sets_db, open('db/sets.json', 'w', encoding='utf-8'), indent=2)

# build decorations db
decorations = [{
    "name": decoration['names']['en'],
    "skills": {skills[skill_id]: skill_points for skill_id, skill_points in decoration['skills'].items()},
    "size": decoration['level'],
    "type": 'A' if decoration['allowed_on'] == 'armor' else 'W'
} for decoration in json.load(open('./full_db/Accessory.json', encoding='utf-8'))]
json.dump(decorations, open('db/decorations.json', 'w', encoding='utf-8'), indent=2)

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
for weapon_file in weapon_files:
    weapons = json.load(open(weapon_file, encoding='utf-8'))
    for weapon in weapons:
        items['weapon'].append({
            'name': weapon['names']['en'],
            'skills': {skills[skill_id]: skill_points for skill_id, skill_points in weapon['skills'].items()},
            'slots': [{'value': slot, 'type': 'W'} for slot in weapon['slots']]
        })

armors = json.load(open('./full_db/Armor.json', encoding='utf-8'))
for armor in armors:
    for armor_piece in armor['pieces']:
        armor_sets = []
        if armor['set_bonus']:
            armor_sets.append(sets[str(armor['set_bonus']['skill_id'])])
        if armor['group_bonus']:
            armor_sets.append(sets[str(armor['group_bonus']['skill_id'])])
        items[armor_piece['kind']].append({
            'name': armor_piece['names']['en'],
            'sets': armor_sets,
            'skills': {skills[skill_id]: skill_points for skill_id, skill_points in armor_piece['skills'].items()},
            'slots': [{'value': slot, 'type': 'A'} for slot in armor_piece['slots']]
        })

amulets = json.load(open('./full_db/Amulet.json', encoding='utf-8'))
for amulet in amulets:
    for amulet_rank in amulet['ranks']:
        items['amulet'].append({
            'name': amulet_rank['names']['en'],
            'skills': {skills[skill_id]: skill_points for skill_id, skill_points in amulet_rank['skills'].items()},
            'slots': []
        })

json.dump(items, open('db/items.json', 'w', encoding='utf-8'), indent=2)

