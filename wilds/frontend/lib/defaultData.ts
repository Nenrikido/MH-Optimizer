/**
 * Default application data and starter templates.
 * Provides initial configuration values, default templates, and starter presets.
 */

import {Skill} from '../model/Skill';
import {Set as ArmorSet} from '../model/Set';
import {Weapon} from '../model/Weapon';
import {Amulet} from '../model/Amulet';
import {Options} from '../model/Options';
import {TemplateData} from '../model/Template';

export interface DefaultData {
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
  amulets: Amulet[];
  options: Options;
  defaultTemplates: TemplateData[];
}

const DEFAULT_OPTIONS: Options = {
  include_all_amulets: true,
  transcend: false,
  include_gog_sets: false,
};

const DEFAULT_SKILLS: Skill[] = [
  {
    id: '1389859584',
    names: {en: "Master's Touch", fr: 'Main de maître'},
    max_points: 1,
    weight: 30,
  },
  {id: '-1607763456', names: {en: 'Critical Boost', fr: 'Berserker'}, max_points: 5, weight: 10},
  {id: '1763191040', names: {en: 'Latent Power', fr: 'Force latente'}, max_points: 5, weight: 10},
  {id: '1160639488', names: {en: 'Handicraft', fr: 'Savoir-faire'}, max_points: 5, weight: 3},
  {id: '1865909632', names: {en: 'Agitator', fr: 'Témérité'}, max_points: 5, weight: 10},
  {id: '632127488', names: {en: 'Maximum Might', fr: 'Corps et âme'}, max_points: 3, weight: 10},
  {id: '280489184', names: {en: 'Counterstrike', fr: 'Contre-attaque'}, max_points: 3, weight: 8},
  {id: '-397570464', names: {en: 'Weakness Exploit', fr: 'Mise à mort'}, max_points: 5, weight: 2},
  {id: '1346775424', names: {en: 'Divine Blessing', fr: 'Bénédiction'}, max_points: 3, weight: 5},
  {id: '144660544', names: {en: 'Evade Window', fr: "Fenêtre d'invulnérabilité"}, max_points: 3, weight: 8},
  {id: '-1689391744', names: {en: 'Constitution', fr: 'Athlète'}, max_points: 5, weight: 5},
  {id: '565867136', names: {en: 'Burst', fr: 'Vendetta'}, max_points: 5, weight: 10},
  {id: '402237312', names: {en: 'Airborne', fr: "Mort venue d'en haut"}, max_points: 1, weight: 10},
];

const DEFAULT_SETS: ArmorSet[] = [
  {
    id: '722735744',
    names: {en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala'},
    min_pieces: 2,
  },
  {
    id: '-1768553344',
    names: {en: "Fulgur Anjanath's Will", fr: "Volonté de l'Anjanath tonnerre"},
    min_pieces: 2,
  },
  {
    id: '1484575872',
    names: {en: "Lord's Soul", fr: 'Âme du seigneur'},
    min_pieces: 3,
  },
];

const DEFAULT_WEAPONS: Weapon[] = [
  {
    id: 'long-sword:99', names: {
      en: "Headsman's Hamus",
      fr: "Hamus du bourreau"
    },
  },
];

const DEFAULT_TEMPLATES: TemplateData[] = [
  {
    id: 'default-great-sword',
    name: 'Great Sword',
    skills: [
      { id: '-283334048', names: { en: 'Focus', fr: 'Concentration' }, max_points: 3, weight: 25 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 20 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 17 },
      { id: '1', names: { en: 'Attack Boost', fr: 'Machine de guerre' }, max_points: 5, weight: 19 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 17 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 12 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 9 },
      { id: '1359821952', names: { en: 'Resentment', fr: 'Vengeance' }, max_points: 5, weight: 11 },
    ],
    sets: [
      { id: '722735744', names: { en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala' }, min_pieces: 2 },
      { id: '-1768553344', names: { en: "Fulgur Anjanath's Will", fr: "Volonté de l'Anjanath tonnerre" }, min_pieces: 2 },
    ],
    weapons: [{ id: 'great-sword:87', names: { en: 'Calamitous Greatsword', fr: 'Épée de calamité' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-long-sword',
    name: 'Long Sword',
    skills: [
      { id: '-1073401280', names: { en: 'Quick Sheathe', fr: 'Rengainage éclair' }, max_points: 3, weight: 25 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 19 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 19 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 16 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 16 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 14 },
      { id: '1160639488', names: { en: 'Handicraft', fr: 'Savoir-faire' }, max_points: 5, weight: 9 },
      { id: '1050520384', names: { en: 'Razor Sharp', fr: 'Samouraï' }, max_points: 3, weight: 7 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 9 },
      { id: '1763191040', names: { en: 'Latent Power', fr: 'Force latente' }, max_points: 5, weight: 5 },
    ],
    sets: [
      { id: '722735744', names: { en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala' }, min_pieces: 2 },
      { id: '-1768553344', names: { en: "Fulgur Anjanath's Will", fr: "Volonté de l'Anjanath tonnerre" }, min_pieces: 2 },
    ],
    weapons: [{ id: 'long-sword:91', names: { en: "Headsman's Hamus", fr: 'Hamus du bourreau' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-sword-and-shield',
    name: 'Sword and Shield',
    skills: [
      { id: '-181127504', names: { en: 'Offensive Guard', fr: 'Garde offensive' }, max_points: 3, weight: 25 },
      { id: '-856322816', names: { en: 'Flayer', fr: 'Écorcheur' }, max_points: 5, weight: 23 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 21 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 19 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 17 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 15 },
      { id: '1', names: { en: 'Attack Boost', fr: 'Machine de guerre' }, max_points: 5, weight: 13 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 11 },
      { id: '2083363072', names: { en: 'Convert Element', fr: 'Conversion élémentaire' }, max_points: 3, weight: 9 },
    ],
    sets: [
      { id: '722735744', names: { en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala' }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'sword-shield:95', names: { en: 'Kyrie Verd', fr: 'Kyrie Verd' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-dual-blades',
    name: 'Dual Blades',
    skills: [
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 25 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 23 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 21 },
      { id: '1763191040', names: { en: 'Latent Power', fr: 'Force latente' }, max_points: 5, weight: 19 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 17 },
      { id: '1160639488', names: { en: 'Handicraft', fr: 'Savoir-faire' }, max_points: 5, weight: 15 },
      { id: '1050520384', names: { en: 'Razor Sharp', fr: 'Samouraï' }, max_points: 3, weight: 13 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 10 },
    ],
    sets: [
      { id: '722735744', names: { en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala' }, min_pieces: 2 },
      { id: '-3666104', names: { en: "Rathalos's Flare", fr: 'Éclat du Rathalos' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'dual-blades:84', names: { en: 'Calamitous Twins', fr: 'Jumeaux de calamité' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-hammer',
    name: 'Hammer',
    skills: [
      { id: '-893407296', names: { en: 'Slugger', fr: 'Cogneur' }, max_points: 3, weight: 21 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 20 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 17 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 15 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 13 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 10 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 8 },
      { id: '1160639488', names: { en: 'Handicraft', fr: 'Savoir-faire' }, max_points: 5, weight: 9 },
      { id: '1470960256', names: { en: 'Partbreaker', fr: 'Destructeur' }, max_points: 3, weight: 5 },
    ],
    sets: [
      { id: '-1768553344', names: { en: "Fulgur Anjanath's Will", fr: "Volonté de l'Anjanath tonnerre" }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'hammer:83', names: { en: 'Calamitous Hammer', fr: 'Marteau de calamité' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-hunting-horn',
    name: 'Hunting Horn',
    skills: [
      { id: '-1237438336', names: { en: 'Horn Maestro', fr: 'Maestro' }, max_points: 2, weight: 25 },
      { id: '1', names: { en: 'Attack Boost', fr: 'Machine de guerre' }, max_points: 5, weight: 23 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 21 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 19 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 17 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 15 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 12 },
      { id: '-856322816', names: { en: 'Flayer', fr: 'Écorcheur' }, max_points: 5, weight: 11 },
      { id: '1160639488', names: { en: 'Handicraft', fr: 'Savoir-faire' }, max_points: 5, weight: 8 },
    ],
    sets: [
      { id: '722735744', names: { en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala' }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'hunting-horn:82', names: { en: 'Calamitous Whisper', fr: 'Murmure de calamité' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-lance',
    name: 'Lance',
    skills: [
      { id: '-181127504', names: { en: 'Offensive Guard', fr: 'Garde offensive' }, max_points: 3, weight: 21 },
      { id: '-307644128', names: { en: 'Guard', fr: 'Paladin' }, max_points: 3, weight: 20 },
      { id: '1050520384', names: { en: 'Razor Sharp', fr: 'Samouraï' }, max_points: 3, weight: 19 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 15 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 14 },
      { id: '1346775424', names: { en: 'Divine Blessing', fr: 'Bénédiction' }, max_points: 3, weight: 12 },
      { id: '-1121468544', names: { en: 'Recovery Speed', fr: 'Halo de guérison' }, max_points: 3, weight: 10 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 6 },
    ],
    sets: [
      { id: '-418246240', names: { en: "Gravios's Protection", fr: 'Protection du Gravios' }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'lance:85', names: { en: 'Aether Pike', fr: "Lance de l'ther" } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-gunlance',
    name: 'Gunlance',
    skills: [
      { id: '-307644128', names: { en: 'Guard', fr: 'Paladin' }, max_points: 3, weight: 24 },
      { id: '-181127504', names: { en: 'Offensive Guard', fr: 'Garde offensive' }, max_points: 3, weight: 19 },
      { id: '-596764096', names: { en: 'Artillery', fr: 'BOUM !' }, max_points: 3, weight: 18 },
      { id: '802725120', names: { en: 'Load Shells', fr: 'Recharge chargée' }, max_points: 2, weight: 15 },
      { id: '-1674114176', names: { en: 'Guard Up', fr: 'Ultra garde' }, max_points: 3, weight: 12 },
      { id: '1050520384', names: { en: 'Razor Sharp', fr: 'Samouraï' }, max_points: 3, weight: 10 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 8 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 7 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 5 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 6 },
    ],
    sets: [
      { id: '-418246240', names: { en: "Gravios's Protection", fr: 'Protection du Gravios' }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'gunlance:81', names: { en: 'Calamitous Lance', fr: 'Lance de calamité' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-switch-axe',
    name: 'Switch Axe',
    skills: [
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 20 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 19 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 18 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 15 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 13 },
      { id: '1160639488', names: { en: 'Handicraft', fr: 'Savoir-faire' }, max_points: 5, weight: 10 },
      { id: '1050520384', names: { en: 'Razor Sharp', fr: 'Samouraï' }, max_points: 3, weight: 8 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 7 },
      { id: '691199232', names: { en: 'Power Prolonger', fr: 'Puissance absolue' }, max_points: 3, weight: 4 },
    ],
    sets: [
      { id: '722735744', names: { en: "Gore Magala's Tyranny", fr: 'Tyrannie du Gore Magala' }, min_pieces: 2 },
      { id: '-3666104', names: { en: "Rathalos's Flare", fr: 'Éclat du Rathalos' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'switch-axe:80', names: { en: 'Wicked Regnum', fr: 'Règne malfaisant' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-charge-blade',
    name: 'Charge Blade',
    skills: [
      { id: '-307644128', names: { en: 'Guard', fr: 'Paladin' }, max_points: 3, weight: 25 },
      { id: '-181127504', names: { en: 'Offensive Guard', fr: 'Garde offensive' }, max_points: 3, weight: 21 },
      { id: '802725120', names: { en: 'Load Shells', fr: 'Recharge chargée' }, max_points: 2, weight: 21 },
      { id: '-596764096', names: { en: 'Artillery', fr: 'BOUM !' }, max_points: 3, weight: 18 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 17 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 11 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 13 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 6 },
      { id: '1160639488', names: { en: 'Handicraft', fr: 'Savoir-faire' }, max_points: 5, weight: 7 },
      { id: '1050520384', names: { en: 'Razor Sharp', fr: 'Samouraï' }, max_points: 3, weight: 6 },
    ],
    sets: [
      { id: '-418246240', names: { en: "Gravios's Protection", fr: 'Protection du Gravios' }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'charge-blade:85', names: { en: 'Promised Abyss', fr: 'Abîme promis' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-insect-glaive',
    name: 'Insect Glaive',
    skills: [
      { id: '1359821952', names: { en: 'Resentment', fr: 'Vengeance' }, max_points: 5, weight: 25 },
      { id: '-856322816', names: { en: 'Flayer', fr: 'Écorcheur' }, max_points: 5, weight: 23 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 21 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 19 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 17 },
      { id: '1', names: { en: 'Attack Boost', fr: 'Machine de guerre' }, max_points: 5, weight: 15 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 13 },
      { id: '1763191040', names: { en: 'Latent Power', fr: 'Force latente' }, max_points: 5, weight: 11 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 8 },
    ],
    sets: [
      { id: '-856322816', names: { en: 'Flayer', fr: 'Écorcheur' }, min_pieces: 2 },
      { id: '1484575872', names: { en: "Lord's Soul", fr: 'Âme du seigneur' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'insect-glaive:86', names: { en: 'Limbo Llor', fr: 'Larmes des limbes' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-light-bowgun',
    name: 'Light Bowgun',
    skills: [
      { id: '-1507579776', names: { en: 'Rapid Fire Up', fr: 'Tir super rapide' }, max_points: 1, weight: 25 },
      { id: '-420608864', names: { en: 'Ballistics', fr: 'Balistique' }, max_points: 3, weight: 23 },
      { id: '1711950720', names: { en: 'Opening Shot', fr: 'Premier tir' }, max_points: 3, weight: 18 },
      { id: '313598432', names: { en: 'Critical Element', fr: 'Rage élémentaire' }, max_points: 3, weight: 18 },
      { id: '-1700743296', names: { en: 'Coalescence', fr: 'Union' }, max_points: 3, weight: 17 },
      { id: '1', names: { en: 'Attack Boost', fr: 'Machine de guerre' }, max_points: 5, weight: 15 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 13 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 11 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 7 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 9 },
    ],
    sets: [
      { id: '539707072', names: { en: "Rey Dau's Voltage", fr: 'Tension du Rey Dau' }, min_pieces: 2 },
      { id: '-1768553344', names: { en: "Fulgur Anjanath's Will", fr: "Volonté de l'Anjanath tonnerre" }, min_pieces: 2 },
    ],
    weapons: [{ id: 'light-bowgun:86', names: { en: 'Bethorned Agony', fr: 'Agonie épineuse' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-heavy-bowgun',
    name: 'Heavy Bowgun',
    skills: [
      { id: '-420608864', names: { en: 'Ballistics', fr: 'Balistique' }, max_points: 3, weight: 24 },
      { id: '-160562336', names: { en: 'Special Ammo Boost', fr: 'Salve mortelle' }, max_points: 2, weight: 20 },
      { id: '1711950720', names: { en: 'Opening Shot', fr: 'Premier tir' }, max_points: 3, weight: 19 },
      { id: '-1700743296', names: { en: 'Coalescence', fr: 'Union' }, max_points: 3, weight: 18 },
      { id: '1', names: { en: 'Attack Boost', fr: 'Machine de guerre' }, max_points: 5, weight: 17 },
      { id: '1865909632', names: { en: 'Agitator', fr: 'Témérité' }, max_points: 5, weight: 15 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 12 },
      { id: '-1607763456', names: { en: 'Critical Boost', fr: 'Berserker' }, max_points: 5, weight: 10 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 9 },
      { id: '632127488', names: { en: 'Maximum Might', fr: 'Corps et âme' }, max_points: 3, weight: 7 },
    ],
    sets: [
      { id: '539707072', names: { en: "Rey Dau's Voltage", fr: 'Tension du Rey Dau' }, min_pieces: 2 },
      { id: '-403054144', names: { en: "Mizutsune's Prowess", fr: 'Prouesse du Mizutsune' }, min_pieces: 2 },
    ],
    weapons: [{ id: 'heavy-bowgun:80', names: { en: 'Trembling Hels', fr: 'Tremblement infernal' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
  {
    id: 'default-bow',
    name: 'Bow',
    skills: [
      { id: '-1689391744', names: { en: 'Constitution', fr: 'Athlète' }, max_points: 5, weight: 25 },
      { id: '-315492576', names: { en: 'Stamina Surge', fr: 'Métabolisme' }, max_points: 3, weight: 20 },
      { id: '-1475134080', names: { en: 'Charge Master', fr: 'Maître de la charge' }, max_points: 3, weight: 19 },
      { id: '1613139840', names: { en: 'Tetrad Shot', fr: 'Quatrième tir' }, max_points: 3, weight: 17 },
      { id: '313598432', names: { en: 'Critical Element', fr: 'Rage élémentaire' }, max_points: 3, weight: 14 },
      { id: '-420608864', names: { en: 'Ballistics', fr: 'Balistique' }, max_points: 3, weight: 12 },
      { id: '280489184', names: { en: 'Counterstrike', fr: 'Contre-attaque' }, max_points: 3, weight: 13 },
      { id: '565867136', names: { en: 'Burst', fr: 'Vendetta' }, max_points: 5, weight: 10 },
      { id: '-397570464', names: { en: 'Weakness Exploit', fr: 'Mise à mort' }, max_points: 5, weight: 4 },
    ],
    sets: [
      { id: '539707072', names: { en: "Rey Dau's Voltage", fr: 'Tension du Rey Dau' }, min_pieces: 2 },
      { id: '-1768553344', names: { en: "Fulgur Anjanath's Will", fr: "Volonté de l'Anjanath tonnerre" }, min_pieces: 2 },
    ],
    weapons: [{ id: 'bow:91', names: { en: 'Calamitous Angel', fr: 'Ange de calamité' } }],
    amulets: [],
    options: DEFAULT_OPTIONS,
  },
];

export const DEFAULT_DATA: DefaultData = {
  skills: DEFAULT_SKILLS,
  sets: DEFAULT_SETS,
  weapons: DEFAULT_WEAPONS,
  amulets: [],
  options: DEFAULT_OPTIONS,
  defaultTemplates: DEFAULT_TEMPLATES,
};
