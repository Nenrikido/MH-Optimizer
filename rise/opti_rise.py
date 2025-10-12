import itertools
import json
import pandas as pd
import numpy as np
import math
from collections import defaultdict

df = pd.DataFrame(json.load(open("rise_armor_pieces_db.json", "r")), columns=[
    "name",
    "gender",
    2,
    "position",
    4,
    5,
    6,
    7,
    8,
    9,
    "slots",
    "skills",
    "defense",
    "resistances"
])

df = df[df.gender != 1][["name", "position", "slots", "skills"]]
df.to_json("rise_armor_pieces_filtered.json", orient="index")

# LS
# skills_values = {
#     "Quick Sheathe": (3, 1),
#     "Weakness Exploit": (3, 1),
#     "Attack Boost": (7, 1),
#     # "Wirebug Whisperer": (3, 1),
#     "Wind Mantle": (1, 1),
#     "Critical Boost": (3, 1),
#     "Frostcraft": (3, 1),
#     "Mail of Hellfire": (3, 1),
#     "Critical Eye": (7, 1),
#     "Maximum Might": (3, 1),
#     "Buildup Boost": (3, 1),
#     "Powder Mantle": (1, 1),
#     "Protective Polish": (3, 1),
#     "Bloodlust": (1, 2),
#     "Frenzied Bloodlust": (1, 1),
#     "Burst": (3, 1),
#     "Chameleos Blessing": (3, 0.5),
#     "Foray": (1, 1),
# }

# Bow
# skills_values = {
#     # "Fire Attack": (5, 0.5),
#     # "Ice Attack": (5, 0.5),
#     # "Water Attack": (5, 0.5),
#     # "Thunder Attack": (5, 0.5),
#     "Dragon Attack": (5, 0.5),
#     "Weakness Exploit": (3, 1),
#     # "Attack Boost": (7, 1),
#     "Wind Mantle": (3, 1),
#     "Critical Boost": (3, 1),
#     "Mail of Hellfire": (3, 1),
#     "Powder Mantle": (1, 1),
#     "Bloodlust": (1, 2),
#     "Frenzied Bloodlust": (1, 1),
#     "Strife": (3, 1),
#     "Burst": (3, 1),
#     "Charge Master": (3, 1),
#     "Reload Speed": (2, 0.5),
#     "Kushala Blessing": (3, 0.5),
#     # "Teostra Blessing": (2, 0.5),
#     "Critical Element": (3, 1),
#     "Latent Power": (2, 1),
#     "Element Exploit": (3, 1),
#     "Berserk": (3, 1),
#     "Bow Charge Plus": (1, 2),
#     "Coalescence": (1, 1),
#     # "Resentment": (5, 1),
#     "Blood Rite": (2, 1.33),
#     "Pierce Up": (3, 1.33)
# }

skills_values = {
    # "Fire Attack": (5, 0.5),
    # "Ice Attack": (5, 0.5),
    "Water Attack": (5, 0.5),
    # "Thunder Attack": (5, 0.5),
    # "Dragon Attack": (5, 0.5),
    "Weakness Exploit": (3, 1),
    "Attack Boost": (7, 1),
    "Hellfire Cloak": (4, 1),
    "Wind Mantle": (3, 1),
    "Critical Boost": (3, 1),
    "Mail of Hellfire": (3, 1),
    "Powder Mantle": (1, 1),
    "Blood Awakening": (3, 1),
    "Bloodlust": (1, 2),
    "Blood Rite": (1, 1.33),
    "Frenzied Bloodlust": (1, 1),
    "Strife": (3, 1),
    "Burst": (3, 1),
    "Kushala Blessing": (3, 0.5),
    # "Teostra Blessing": (2, 0.5),
    "Critical Element": (3, 1),
    "Element Exploit": (3, 1),
    "Berserk": (3, 1),
    "Bow Charge Plus": (1, 2),
    "Coalescence": (1, 1),
    "Handicraft": (5, 1),
    "Speed Sharpening": (3, 0.5),
    "Protective Polish": (3, 1),
}

# IG
# skills_values = {
#     "Critical Eye": (7, 1),
#     "Attack Boost": (7, 1),
#     "Mail of Hellfire": (3, 1),
#     "Weakness Exploit": (3, 1),
#     "Critical Boost": (3, 1),
#     "Wirebug Whisperer": (3, 1),
#     "Wind Mantle": (1, 1),
#     "Frostcraft": (3, 1),
#     "Master's Touch": (3, 1),
#     "Hellfire Cloak": (3, 1),
#     "Buildup Boost": (3, 1),
#     "Powder Mantle": (3, 1),
#     "Resuscitate": (3, 1),
#     "Bloodlust": (1, 2),
#     "Frenzied Bloodlust": (1, 1),
#     "Burst": (3, 1),
#     "Chameleos Blessing": (3, 0.5),
#     "Foray": (1, 1),
# }



slots_values = [0, 0.5, 1, 1, 2]
# slots_values = [0] * 5

dfs = [df[df["position"] == i].drop(columns="position") for i in range(5)]

df["value"] = df["slots"].apply(lambda slots: sum(map(slots_values.__getitem__, slots)))

for skill, (max_value, weight) in skills_values.items():
    df.loc[df.skills.str[skill].notna(), "value"] += np.minimum(
        df[df.skills.str[skill].notna()].skills.str[skill],
        max_value
    ) * weight

    df["value"] += df.skills.apply(
        lambda skills: min(sum([
            value for key, value in skills.items() if key not in skills_values
        ]), 3)
    )

df = df.sort_values(by="value", ascending=False)


def get_pseudoordered_combinations(*ls):
    compare_head = [0] * len(ls)
    yield tuple(compare_head)
    while compare_head != [len(l) - 1 for l in ls]:
        min_diff = math.inf
        min_diff_index = 0
        value_sum = sum([
            ls[head_index][head] for head_index, head in enumerate(compare_head)
        ])
        for i, l in enumerate(ls):
            try:
                value_sum_after_change = sum([
                    ls[head_index][head + 1] if head_index == i else ls[head_index][head] for head_index, head in
                    enumerate(compare_head)
                ])
                diff = value_sum - value_sum_after_change
            except IndexError:
                continue

            if diff < min_diff:
                min_diff = diff
                min_diff_index = i

        compare_head[min_diff_index] += 1

        for i in itertools.product(*[
            [compare_head[head_index]]
            if head_index == min_diff_index
            else range(compare_head[head_index] + 1)
            for head_index, head in enumerate(compare_head)
        ]):
            yield i


best_sets = []

from time import time

t0 = time()
g = get_pseudoordered_combinations(*[df.loc[df.position == i, "value"].tolist() for i in range(5)])


while len(best_sets) < 50:
    set_indices = next(g)
    armor_set = []
    skills = defaultdict(int)
    for i, item_index in enumerate(set_indices):
        item = df.loc[df.position == i].reset_index(drop=True).iloc[item_index]
        for skill, value in item.skills.items():
            skills[skill] += value
        armor_set.append(item)

    for skill, skill_value in skills.items():
        if skill in skills_values and skill_value > skills_values[skill][0]:
            break
    else:
        set_df = pd.DataFrame.from_records(armor_set)
        best_sets.append(set_df)

best_sets = sorted(best_sets, key=lambda x: -x.value.sum())
print(time() - t0)
for s in best_sets:
    print(f"{', '.join(s.name.tolist())} (value : {s.value.sum()})")

