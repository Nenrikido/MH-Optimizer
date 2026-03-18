/**
 * Default application data and starter templates.
 * Provides initial configuration values, default templates, and starter presets.
 */

import { Skill } from "../model/Skill";
import { Set as ArmorSet } from "../model/Set";
import { Weapon } from "../model/Weapon";
import { Amulet } from "../model/Amulet";
import { Options } from "../model/Options";
import { TemplateData } from "../model/Template";

// Local seed shape: ids + tuning only. Names are hydrated from /api/available_items.
type SeedSkill = Omit<Skill, "names">;
type SeedSet = Omit<ArmorSet, "names">;
type SeedWeapon = Omit<Weapon, "names">;
type SeedTemplateData = Omit<TemplateData, "skills" | "sets" | "weapons"> & {
  skills: SeedSkill[];
  sets: SeedSet[];
  weapons: SeedWeapon[];
};

export interface DefaultData {
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
  amulets: Amulet[];
  options: Options;
  defaultTemplates: TemplateData[];
}

const DEFAULT_TEMPLATES: SeedTemplateData[] = [
  {
    id: "default-great-sword",
    name: "Great Sword",
    skills: [
      { id: "-283334048", max_points: 3, weight: 25, icon: "offense" },
      { id: "-1607763456", max_points: 5, weight: 20, icon: "affinity" },
      { id: "-397570464", max_points: 5, weight: 17, icon: "attack" },
      { id: "1", max_points: 5, weight: 20, icon: "attack" },
      { id: "632127488", max_points: 3, weight: 17, icon: "attack" },
      { id: "1865909632", max_points: 5, weight: 9, icon: "offense" },
      { id: "280489184", max_points: 3, weight: 12, icon: "attack" },
      { id: "1359821952", max_points: 5, weight: 8, icon: "attack" },
      { id: "2083363072", max_points: 3, weight: 10, icon: "attack" },
      { id: "1763191040", max_points: 5, weight: 8, icon: "offense" },
      { id: "565867136", max_points: 5, weight: 9, icon: "offense" },
      { id: "-2096489472", max_points: 5, weight: 9, icon: "affinity" },
      { id: "1160639488", max_points: 5, weight: 7, icon: "handicraft" },
      { id: "-856322816", max_points: 5, weight: 9, icon: "offense" },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "-964369920", min_pieces: 2, icon: "set" },
      { id: "-62248528", min_pieces: 2, icon: "set" },
      { id: "24531", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "great-sword:87", gear_key: "great-sword" }],
  },
  {
    id: "default-long-sword",
    name: "Long Sword",
    skills: [
      { id: "-1073401280", max_points: 3, weight: 25, icon: "utility" },
      { id: "-1607763456", max_points: 5, weight: 19, icon: "affinity" },
      { id: "-397570464", max_points: 5, weight: 19, icon: "attack" },
      { id: "1865909632", max_points: 5, weight: 16, icon: "offense" },
      { id: "280489184", max_points: 3, weight: 16, icon: "attack" },
      { id: "632127488", max_points: 3, weight: 17, icon: "attack" },
      { id: "1160639488", max_points: 5, weight: 7, icon: "handicraft" },
      { id: "565867136", max_points: 5, weight: 10, icon: "offense" },
      { id: "1763191040", max_points: 5, weight: 5, icon: "offense" },
      { id: "1389859584", max_points: 1, weight: 30, icon: "handicraft" },
      { id: "-856322816", max_points: 5, weight: 8, icon: "offense" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
    ],
    sets: [
      { id: "722735744", min_pieces: 2, icon: "set" },
      { id: "1484575872", min_pieces: 3, icon: "group" },
    ],
    weapons: [{ id: "long-sword:91", gear_key: "long-sword" }],
  },
  {
    id: "default-sword-and-shield",
    name: "Sword and Shield",
    skills: [
      { id: "-181127504", max_points: 3, weight: 25, icon: "attack" },
      { id: "632127488", max_points: 3, weight: 19, icon: "attack" },
      { id: "-1607763456", max_points: 5, weight: 17, icon: "affinity" },
      { id: "-397570464", max_points: 5, weight: 17, icon: "attack" },
      { id: "1865909632", max_points: 5, weight: 20, icon: "offense" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
      { id: "144660544", max_points: 3, weight: 9, icon: "utility" },
      { id: "1763191040", max_points: 5, weight: 10, icon: "offense" },
      { id: "565867136", max_points: 5, weight: 9, icon: "offense" },
      { id: "-856322816", max_points: 5, weight: 8, icon: "offense" },
      { id: "1389859584", max_points: 1, weight: 30, icon: "handicraft" },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "722735744", min_pieces: 2, icon: "set" },
      { id: "-215826112", min_pieces: 2, icon: "set" },
      { id: "-3666104", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "sword-shield:95", gear_key: "sword-shield" }],
  },
  {
    id: "default-dual-blades",
    name: "Dual Blades",
    skills: [
      { id: "-397570464", max_points: 5, weight: 25, icon: "attack" },
      { id: "565867136", max_points: 5, weight: 23, icon: "offense" },
      { id: "280489184", max_points: 3, weight: 21, icon: "attack" },
      { id: "1160639488", max_points: 5, weight: 8, icon: "handicraft" },
      { id: "-1607763456", max_points: 5, weight: 17, icon: "affinity" },
      { id: "-562534336", max_points: 3, weight: 15, icon: "element" },
      { id: "1389859584", max_points: 1, weight: 30, icon: "handicraft" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
      { id: "-2096489472", max_points: 5, weight: 10, icon: "affinity" },
      { id: "1174975744", max_points: 5, weight: 10, icon: "attack" },
      { id: "673822976", max_points: 3, weight: 10, icon: "utility" },
      { id: "-856322816", max_points: 5, weight: 10, icon: "offense" },
      { id: "2106877312", max_points: 5, weight: 10, icon: "attack" },
      { id: "1865909632", max_points: 5, weight: 8, icon: "offense" },
      { id: "1763191040", max_points: 5, weight: 8, icon: "offense" },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "-964369920", min_pieces: 2, icon: "set" },
      { id: "5590", min_pieces: 2, icon: "set" },
      { id: "722735744", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "dual-blades:90", gear_key: "dual-blades" }],
  },
  {
    id: "default-hammer",
    name: "Hammer",
    skills: [
      { id: "-893407296", max_points: 3, weight: 21, icon: "offense" },
      { id: "1865909632", max_points: 5, weight: 20, icon: "offense" },
      { id: "-397570464", max_points: 5, weight: 17, icon: "attack" },
      { id: "-1607763456", max_points: 5, weight: 15, icon: "affinity" },
      { id: "565867136", max_points: 5, weight: 13, icon: "offense" },
      { id: "280489184", max_points: 3, weight: 10, icon: "attack" },
      { id: "632127488", max_points: 3, weight: 8, icon: "attack" },
      { id: "1160639488", max_points: 5, weight: 9, icon: "handicraft" },
      { id: "1470960256", max_points: 3, weight: 5, icon: "offense" },
      { id: "-562534336", max_points: 3, weight: 10, icon: "element" },
      { id: "1763191040", max_points: 5, weight: 12, icon: "offense" },
      { id: "-283334048", max_points: 3, weight: 10, icon: "offense" },
      { id: "2106877312", max_points: 5, weight: 9, icon: "attack" },
      { id: "192746944", max_points: 3, weight: 10, icon: "utility" },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "539707072", min_pieces: 2, icon: "set" },
      { id: "5590", min_pieces: 2, icon: "set" },
      { id: "-62248528", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "hammer:86", gear_key: "hammer" }],
  },
  {
    id: "default-hunting-horn",
    name: "Hunting Horn",
    skills: [
      { id: "1865909632", max_points: 5, weight: 10 },
      { id: "632127488", max_points: 3, weight: 10 },
      { id: "280489184", max_points: 3, weight: 10 },
      { id: "565867136", max_points: 5, weight: 10 },
      { id: "1", max_points: 4, weight: 10 },
      { id: "1174975744", max_points: 5, weight: 7 },
      { id: "1359821952", max_points: 5, weight: 7 },
      { id: "2106877312", max_points: 5, weight: 5 },
      { id: "-1237438336", max_points: 2, weight: 10 },
      { id: "-562534336", max_points: 3, weight: 10 },
      { id: "1160639488", max_points: 5, weight: 5 },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3 },
      { id: "1980404096", min_pieces: 2 },
      { id: "918165056", min_pieces: 4 },
    ],
    weapons: [{ id: "hunting-horn:86", gear_key: "hunting-horn" }],
  },
  {
    id: "default-lance",
    name: "Lance",
    skills: [
      { id: "-181127504", max_points: 3, weight: 21, icon: "attack" },
      { id: "-307644128", max_points: 3, weight: 10, icon: "utility" },
      { id: "-1607763456", max_points: 5, weight: 15, icon: "affinity" },
      { id: "1346775424", max_points: 3, weight: 8, icon: "defense" },
      { id: "632127488", max_points: 3, weight: 10, icon: "attack" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
      { id: "-2096489472", max_points: 3, weight: 15, icon: "affinity" },
      { id: "1389859584", max_points: 1, weight: 30, icon: "handicraft" },
      { id: "1865909632", max_points: 5, weight: 12, icon: "offense" },
      { id: "-397570464", max_points: 5, weight: 15, icon: "attack" },
      { id: "565867136", max_points: 5, weight: 12, icon: "offense" },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "722735744", min_pieces: 2, icon: "set" },
      { id: "-215826112", min_pieces: 2, icon: "set" },
      { id: "-3666104", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "lance:85", gear_key: "lance" }],
  },
  {
    id: "default-gunlance",
    name: "Gunlance",
    skills: [
      { id: "-181127504", max_points: 3, weight: 19, icon: "attack" },
      { id: "-596764096", max_points: 3, weight: 18, icon: "offense" },
      { id: "802725120", max_points: 2, weight: 15, icon: "utility" },
      { id: "-1674114176", max_points: 3, weight: 8, icon: "utility" },
      { id: "280489184", max_points: 3, weight: 11, icon: "attack" },
      { id: "1865909632", max_points: 5, weight: 15, icon: "offense" },
      { id: "565867136", max_points: 5, weight: 15, icon: "offense" },
      { id: "-307644128", max_points: 3, weight: 8, icon: "utility" },
      { id: "1", max_points: 5, weight: 12, icon: "attack" },
      { id: "192746944", max_points: 3, weight: 8, icon: "utility" },
      { id: "1346775424", max_points: 3, weight: 10, icon: "defense" },
      { id: "-856322816", max_points: 5, weight: 8, icon: "offense" },
      { id: "632127488", max_points: 3, weight: 9, icon: "attack" },
    ],
    sets: [
      { id: "918165056", min_pieces: 4, icon: "set" },
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "-215826112", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "gunlance:84", gear_key: "gunlance" }],
  },
  {
    id: "default-switch-axe",
    name: "Switch Axe",
    skills: [
      { id: "1865909632", max_points: 5, weight: 10 },
      { id: "632127488", max_points: 3, weight: 10 },
      { id: "280489184", max_points: 3, weight: 10 },
      { id: "565867136", max_points: 1, weight: 10 },
      { id: "1", max_points: 4, weight: 10 },
      { id: "1359821952", max_points: 2, weight: 8 },
      { id: "-562534336", max_points: 1, weight: 10 },
      { id: "1763191040", max_points: 4, weight: 10 },
      { id: "2083363072", max_points: 3, weight: 10 },
      { id: "691199232", max_points: 3, weight: 10 },
      { id: "-2096489472", max_points: 1, weight: 10 },
      { id: "-1607763456", max_points: 4, weight: 10 },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3 },
      { id: "722735744", min_pieces: 2 },
      { id: "539707072", min_pieces: 2 },
    ],
    weapons: [{ id: "switch-axe:80", gear_key: "switch-axe" }],
  },
  {
    id: "default-charge-blade",
    name: "Charge Blade",
    skills: [
      { id: "1865909632", max_points: 5, weight: 10 },
      { id: "632127488", max_points: 3, weight: 10 },
      { id: "565867136", max_points: 5, weight: 10 },
      { id: "1359821952", max_points: 2, weight: 8 },
      { id: "802725120", max_points: 2, weight: 10 },
      { id: "-283334048", max_points: 3, weight: 10 },
      { id: "2106877312", max_points: 4, weight: 10 },
      { id: "-1700743296", max_points: 3, weight: 10 },
      { id: "1160639488", max_points: 2, weight: 10 },
      { id: "1174975744", max_points: 2, weight: 10 },
      { id: "-562534336", max_points: 3, weight: 10 },
      { id: "192746944", max_points: 2, weight: 10 },
    ],
    sets: [
      { id: "5590", min_pieces: 4 },
      { id: "-403054144", min_pieces: 2 },
      { id: "-3666104", min_pieces: 2 },
    ],
    weapons: [{ id: "charge-blade:85", gear_key: "charge-blade" }],
  },
  {
    id: "default-insect-glaive",
    name: "Insect Glaive",
    skills: [
      { id: "-856322816", max_points: 5, weight: 12, icon: "offense" },
      { id: "1865909632", max_points: 5, weight: 21, icon: "offense" },
      { id: "280489184", max_points: 3, weight: 19, icon: "attack" },
      { id: "-397570464", max_points: 5, weight: 17, icon: "attack" },
      { id: "1", max_points: 5, weight: 16, icon: "attack" },
      { id: "632127488", max_points: 3, weight: 13, icon: "attack" },
      { id: "565867136", max_points: 5, weight: 8, icon: "offense" },
      { id: "-1607763456", max_points: 5, weight: 15, icon: "affinity" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
      { id: "2106877312", max_points: 5, weight: 9, icon: "attack" },
      { id: "402237312", max_points: 1, weight: 30, icon: "offense" },
      { id: "192746944", max_points: 3, weight: 8, icon: "utility" },
      { id: "634068352", max_points: 3, weight: 10, icon: "utility" },
    ],
    sets: [
      { id: "1484575872", min_pieces: 3, icon: "group" },
      { id: "722735744", min_pieces: 2, icon: "set" },
      { id: "-964369920", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "insect-glaive:86", gear_key: "insect-glaive" }],
  },
  {
    id: "default-light-bowgun",
    name: "Light Bowgun",
    skills: [
      { id: "-1507579776", max_points: 1, weight: 25, icon: "ranged" },
      { id: "-420608864", max_points: 3, weight: 8, icon: "ranged" },
      { id: "1711950720", max_points: 3, weight: 8, icon: "ranged" },
      { id: "1865909632", max_points: 5, weight: 13, icon: "offense" },
      { id: "-397570464", max_points: 5, weight: 8, icon: "attack" },
      { id: "565867136", max_points: 5, weight: 9, icon: "offense" },
      { id: "-1700743296", max_points: 3, weight: 12, icon: "offense" },
      { id: "2106877312", max_points: 5, weight: 15, icon: "attack" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
      { id: "-562534336", max_points: 3, weight: 14, icon: "element" },
      { id: "313598432", max_points: 3, weight: 14, icon: "element" },
      { id: "632127488", max_points: 3, weight: 12, icon: "attack" },
      { id: "192746944", max_points: 3, weight: 9, icon: "utility" },
      { id: "144660544", max_points: 3, weight: 9, icon: "utility" },
    ],
    sets: [
      { id: "5590", min_pieces: 4, icon: "set" },
      { id: "722735744", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "light-bowgun:86", gear_key: "light-bowgun" }],
  },
  {
    id: "default-heavy-bowgun",
    name: "Heavy Bowgun",
    skills: [
      { id: "-420608864", max_points: 3, weight: 8, icon: "ranged" },
      { id: "1711950720", max_points: 3, weight: 8, icon: "ranged" },
      { id: "1865909632", max_points: 5, weight: 13, icon: "offense" },
      { id: "565867136", max_points: 5, weight: 9, icon: "offense" },
      { id: "-1700743296", max_points: 3, weight: 12, icon: "offense" },
      { id: "2106877312", max_points: 5, weight: 15, icon: "attack" },
      { id: "-1662120192", max_points: 3, weight: 10, icon: "offense" },
      { id: "-562534336", max_points: 3, weight: 14, icon: "element" },
      { id: "313598432", max_points: 3, weight: 14, icon: "element" },
      { id: "632127488", max_points: 3, weight: 12, icon: "attack" },
      { id: "-596764096", max_points: 3, weight: 15, icon: "offense" },
      { id: "1174975744", max_points: 5, weight: 8, icon: "attack" },
      { id: "634068352", max_points: 3, weight: 10, icon: "utility" },
    ],
    sets: [
      { id: "5590", min_pieces: 4, icon: "set" },
      { id: "722735744", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "heavy-bowgun:80", gear_key: "heavy-bowgun" }],
  },
  {
    id: "default-bow",
    name: "Bow",
    skills: [
      { id: "-1689391744", max_points: 5, weight: 25, icon: "stamina" },
      { id: "-315492576", max_points: 3, weight: 20, icon: "stamina" },
      { id: "-1475134080", max_points: 3, weight: 20, icon: "element" },
      { id: "1613139840", max_points: 3, weight: 8, icon: "ranged" },
      { id: "-420608864", max_points: 3, weight: 8, icon: "ranged" },
      { id: "565867136", max_points: 5, weight: 12, icon: "offense" },
      { id: "-397570464", max_points: 5, weight: 20, icon: "attack" },
      { id: "-562534336", max_points: 3, weight: 15, icon: "element" },
      { id: "-2123993856", max_points: 1, weight: 30, icon: "ranged" },
      { id: "1865909632", max_points: 5, weight: 13, icon: "offense" },
      { id: "2106877312", max_points: 5, weight: 13, icon: "attack" },
      { id: "634068352", max_points: 3, weight: 10, icon: "utility" },
      { id: "1174975744", max_points: 5, weight: 9, icon: "attack" },
    ],
    sets: [
      { id: "5590", min_pieces: 4, icon: "set" },
      { id: "918165056", min_pieces: 2, icon: "set" },
      { id: "-3666104", min_pieces: 2, icon: "set" },
    ],
    weapons: [{ id: "bow:91", gear_key: "bow" }],
  },
];

export const DEFAULT_DATA: DefaultData = {
  skills: DEFAULT_TEMPLATES[1].skills as Skill[],
  sets: DEFAULT_TEMPLATES[1].sets as ArmorSet[],
  weapons: DEFAULT_TEMPLATES[1].weapons as Weapon[],
  amulets: [],
  options: { include_all_amulets: true, transcend: true, include_gog_sets: true },
  defaultTemplates: DEFAULT_TEMPLATES as TemplateData[]
};
