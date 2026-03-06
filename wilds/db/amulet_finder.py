import itertools

# Define the skill groups
groups = {
    1: [
        ("Artillery", 1),
        ("Attack Boost", 1),
        ("Ballistics", 1),
        ("Blast Attack", 1),
        ("Bludgeoner", 1),
        ("Charge Master", 1),
        ("Critical Draw", 1),
        ("Critical Element", 1),
        ("Critical Eye", 1),
        ("Dragon Attack", 1),
        ("Fire Attack", 1),
        ("Focus", 1),
        ("Guard", 1),
        ("Guard Up", 1),
        ("Horn Maestro", 1),
        ("Ice Attack", 1),
        ("Load Shells", 1),
        ("Mind's Eye", 1),
        ("Offensive Guard", 1),
        ("Opening Shot", 1),
        ("Paralysis Attack", 1),
        ("Poison Attack", 1),
        ("Power Prolonger", 1),
        ("Punishing Draw", 1),
        ("Rapid Morph", 1),
        ("Razor Sharp", 1),
        ("Sleep Attack", 1),
        ("Slugger", 1),
        ("Special Ammo Boost", 1),
        ("Speed Sharpening", 1),
        ("Stamina Thief", 1),
        ("Tetrad Shot", 1),
        ("Thunder Attack", 1),
        ("Water Attack", 1)
    ],
    2: [
        ("Airborne", 3),
        ("Artillery", 2),
        ("Attack Boost", 2),
        ("Ballistics", 2),
        ("Blast Attack", 2),
        ("Bludgeoner", 2),
        ("Blast Functionality", 1),
        ("Charge Master", 2),
        ("Critical Draw", 2),
        ("Charge Up", 2),
        ("Critical Element", 2),
        ("Critical Eye", 2),
        ("Dragon Attack", 2),
        ("Fire Attack", 2),
        ("Guard", 2),
        ("Handicraft", 2),
        ("Horn Maestro", 2),
        ("Ice Attack", 2),
        ("Mind's Eye", 2),
        ("Offensive Guard", 2),
        ("Paralysis Attack", 2),
        ("Poison Attack", 2),
        ("Power Prolonger", 2),
        ("Protective Polish", 2),
        ("Punishing Draw", 2),
        ("Rapid Fire Up", 1),
        ("Rapid Morph", 2),
        ("Razor Sharp", 2),
        ("Sleep Attack", 2),
        ("Slugger", 2),
        ("Special Ammo Boost", 2),
        ("Speed Sharpening", 2),
        ("Stamina Thief", 2),
        ("Tetrad Shot", 2),
        ("Thunder Attack", 2),
        ("Water Attack", 2)
    ],
    3: [
        ("Artillery", 3),
        ("Attack Boost", 3),
        ("Ballistics", 3),
        ("Blast Attack", 3),
        ("Bludgeoner", 3),
        ("Charge Master", 3),
        ("Critical Draw", 3),
        ("Critical Element", 3),
        ("Critical Eye", 3),
        ("Dragon Attack", 3),
        ("Fire Attack", 3),
        ("Focus", 3),
        ("Guard", 3),
        ("Handicraft", 3),
        ("Ice Attack", 3),
        ("Master's Touch", 1),
        ("Normal Shots", 1),
        ("Offensive Guard", 3),
        ("Paralysis Attack", 3),
        ("Piercing Shots", 1),
        ("Poison Attack", 3),
        ("Power Prolonger", 3),
        ("Protective Polish", 3),
        ("Punishing Draw", 3),
        ("Rapid Fire Up", 1),
        ("Rapid Morph", 3),
        ("Razor Sharp", 3),
        ("Sleep Attack", 3),
        ("Slugger", 3),
        ("Spread/Power Shot", 1),
        ("Stamina Thief", 3),
        ("Tetrad Shot", 3),
        ("Thunder Attack", 3),
        ("Water Attack", 3)
    ],
    4: [
        ("Attack Boost", 2),
        ("Ballistics", 2),
        ("Blast Attack", 3),
        ("Critical Boost", 1),
        ("Critical Element", 2),
        ("Critical Eye", 2),
        ("Dragon Attack", 2),
        ("Fire Attack", 2),
        ("Guard Up", 2),
        ("Handicraft", 2),
        ("Opening Shot", 2),
        ("Paralysis Attack", 2),
        ("Poison Attack", 2),
        ("Razor Sharp", 2),
        ("Sleep Attack", 2),
        ("Tetrad Shot", 2),
        ("Thunder Attack", 2),
        ("Water Attack", 2)
    ],
    5: [
        ("Adaptability", 1),
        ("Antivirus", 1),
        ("Aquatic/Oilsit Mobility", 1),
        ("Bind Resistance", 1),
        ("Blast Resistance", 1),
        ("Bleeding Resistance", 1),
        ("Bombardier", 1),
        ("Botanist", 2),
        ("Constitution", 2),
        ("Defense Boost", 2),
        ("Divine Blessing", 1),
        ("Dragon Resistance", 1),
        ("Fire Resistance", 1),
        ("Flinch Free", 1),
        ("Free Meal", 1),
        ("Geologist", 1),
        ("Hunger Resistance", 1),
        ("Ice Resistance", 1),
        ("Intimidator", 1),
        ("Iron Skin", 1),
        ("Item Prolonger", 1),
        ("Marathon Runner", 1),
        ("Paralysis Resistance", 1),
        ("Poison Resistance", 1),
        ("Quick Sheathe", 1),
        ("Recovery Speed", 1),
        ("Recovery Up", 1),
        ("Sleep Resistance", 1),
        ("Speed Eating", 1),
        ("Stench Resistance", 1),
        ("Stun Resistance", 1),
        ("Survival Expert", 1),
        ("Thunder Resistance", 1),
        ("Tremor Resistance", 1),
        ("Water Resistance", 1),
        ("Wide-Range", 2),
        ("Windproof", 1)
    ],
    6: [
        ("Adaptability", 2),
        ("Antivirus", 2),
        ("Aquatic/Oilsit Mobility", 2),
        ("Bind Resistance", 2),
        ("Blast Resistance", 2),
        ("Bleeding Resistance", 2),
        ("Bombardier", 2),
        ("Botanist", 3),
        ("Constitution", 3),
        ("Defense Boost", 3),
        ("Divine Blessing", 2),
        ("Dragon Resistance", 2),
        ("Fire Resistance", 2),
        ("Flinch Free", 2),
        ("Free Meal", 2),
        ("Geologist", 2),
        ("Hunger Resistance", 2),
        ("Ice Resistance", 2),
        ("Intimidator", 2),
        ("Iron Skin", 2),
        ("Item Prolonger", 2),
        ("Marathon Runner", 2),
        ("Paralysis Resistance", 2),
        ("Poison Resistance", 2),
        ("Quick Sheathe", 2),
        ("Recovery Speed", 2),
        ("Recovery Up", 2),
        ("Sleep Resistance", 2),
        ("Speed Eating", 2),
        ("Stench Resistance", 2),
        ("Stun Resistance", 2),
        ("Survival Expert", 2),
        ("Thunder Resistance", 2),
        ("Tremor Resistance", 2),
        ("Water Resistance", 2),
        ("Wide-Range", 3),
        ("Windproof", 2)
    ],
    7: [
        ("Antivirus", 3),
        ("Bind Resistance", 3),
        ("Blast Resistance", 3),
        ("Bombardier", 3),
        ("Botanist", 4),
        ("Constitution", 4),
        ("Defense Boost", 4),
        ("Divine Blessing", 3),
        ("Dragon Resistance", 3),
        ("Fire Resistance", 3),
        ("Flinch Free", 3),
        ("Free Meal", 3),
        ("Geologist", 3),
        ("Hunger Resistance", 3),
        ("Ice Resistance", 3),
        ("Intimidator", 3),
        ("Iron Skin", 3),
        ("Item Prolonger", 3),
        ("Marathon Runner", 3),
        ("Paralysis Resistance", 3),
        ("Poison Resistance", 3),
        ("Quick Sheathe", 3),
        ("Recovery Up", 3),
        ("Sleep Resistance", 3),
        ("Speed Eating", 3),
        ("Stun Resistance", 3),
        ("Survival Expert", 3),
        ("Thunder Resistance", 3),
        ("Tremor Resistance", 3),
        ("Water Resistance", 3),
        ("Wide-Range", 4),
        ("Windproof", 3)
    ],
    8: [
        ("Ambush", 1),
        ("Blight Resistance", 1),
        ("Coalescence", 1),
        ("Counterstrike", 1),
        ("Earplugs", 1),
        ("Evade Extender", 1),
        ("Heroics", 2),
        ("Maximum Might", 1),
        ("Mushroomancer", 1),
        ("Partbreaker", 1),
        ("Peak Performance", 1),
        ("Resentment", 1),
        ("Stamina Surge", 1),
        ("Tool Specialist", 2)
    ],
    9: [
        ("Ambush", 2),
        ("Blight Resistance", 2),
        ("Coalescence", 2),
        ("Counterstrike", 2),
        ("Earplugs", 2),
        ("Evade Extender", 2),
        ("Heroics", 3),
        ("Maximum Might", 2),
        ("Mushroomancer", 2),
        ("Partbreaker", 2),
        ("Peak Performance", 2),
        ("Resentment", 2),
        ("Stamina Surge", 2),
        ("Tool Specialist", 3)
    ],
    10: [
        ("Adrenaline Rush", 1),
        ("Agitator", 1),
        ("Burst", 1),
        ("Convert Element", 1),
        ("Elemental Absorption", 1),
        ("Foray", 1),
        ("Latent Power", 1),
        ("Weakness Exploit", 1)
    ]
}

# Define the rarity to group lists
rarity_to_group_lists = {
    5: [
        [1, 6, 6],
        [1, 7, None],
        [1, 8, 6],
        [1, 8, 8],
        [1, 9, None],
        [1, 10, None]
    ],
    6: [
        [1, 1, 7],
        [1, 1, 10],
        [2, 6, 6],
        [2, 8, 6],
        [2, 8, 8],
        [2, 9, None],
        [2, 10, None]
    ],
    7: [
        [2, 1, 7],
        [2, 1, 10],
        [3, 6, 5],
        [3, 7, None],
        [3, 8, 5],
        [3, 10, None],
        [4, 1, 1]
    ],
    70: [
        [2, 1, 8],
    ],
    8: [
        [2, 1, 7],
        [2, 1, 8],
        [2, 1, 10],
        [3, 6, 5],
        [3, 7, None],
        [3, 8, 5],
        [3, 10, None],
        [4, 1, 1]
    ]
}

# Define the rarity to slot lists (list of possible slot configurations, each config is a list of strings like 'A1', 'W3')
rarity_to_slots = {
    5: [
        ['A1', 'A1'],
        ['A2'],
        ['A2', 'A1'],
        ['A3']
    ],
    6: [
        ['A1'],
        ['A1', 'A1'],
        ['A2'],
        ['A2', 'A1']
    ],
    7: [
        ['A1'],
        ['A1', 'A1'],
        ['A2'],
    ],
    70: [ # specific case of group 2 1 8 rarity 7
        ['A1', 'A1'],
        ['A2'],
        ['A3'],
    ],
    8: [
        ['W1'],
        ['W1', 'A1'],
        ['W1', 'A1', 'A1']
    ]
}

better_slots = {
    5: [2, 3],
    6: [3],
    7: [1, 2],
    70: [0, 2],
    8: [2]
}


def generate_amulets(allowed_skills, only_better_slots=False):
    """
    Given a list of allowed skill names, generate all amulets that have only skills from this list (subsets, no extras).
    Prints them grouped by slot configuration, with each amulet in the specified structure.
    """
    allowed_set = set(allowed_skills)
    amulet_id = 0
    amulets = []

    for rarity in sorted(rarity_to_group_lists.keys()):
        for group_config in rarity_to_group_lists[rarity]:
            effective_groups = [g for g in group_config if g is not None]
            if not effective_groups:
                continue

            # Filter allowed tuples for each position
            position_tuples = []
            for g in effective_groups:
                allowed_t = [t for t in groups[g] if t[0] in allowed_set]
                if not allowed_t:
                    position_tuples = []
                    break
                position_tuples.append(allowed_t)

            if not position_tuples:
                continue

            # Generate combinations
            for combo in itertools.product(*position_tuples):
                names = [name for name, _ in combo]
                if len(set(names)) != len(names):
                    continue  # Skip if duplicate skills

                skills_dict = {name: level for name, level in combo}

                # For each slot config
                for k, slot_conf in enumerate(rarity_to_slots[rarity]):
                    if only_better_slots and k not in better_slots[rarity]:
                        continue
                    slots = [{'value': int(s[1:]), 'type': s[0]} for s in slot_conf]

                    amulets.append({
                        'name': f"Amulet_R{7 if rarity == 70 else rarity}_{amulet_id}",
                        'skills': skills_dict,
                        'slots': slots,
                        'rarity': 7 if rarity == 70 else rarity,
                        'groups': effective_groups
                    })
                    amulet_id += 1

    return amulets


# Example usage
if __name__ == "__main__":
    # Example list of allowed skills
    allowed_list = ["Critical Eye", "Weakness Exploit", "Attack Boost"]
    amulets = generate_amulets(allowed_list)
    better_slots_amulets = generate_amulets(allowed_list, only_better_slots=True)
    print(amulets)
