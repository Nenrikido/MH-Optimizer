import {Skill} from '../model/Skill';
import {Set as ArmorSet} from '../model/Set';
import {Weapon} from '../model/Weapon';
import {Amulet} from '../model/Amulet';
import {Options} from '../model/Options';

export interface DefaultData {
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
  amulets: Amulet[];
  options: Options;
}

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
    id: 'long-sword:91',
    names: {en: "Headsman's Hamus", fr: "Hamus du bourreau"},
  },
];

export const DEFAULT_DATA: DefaultData = {
  skills: DEFAULT_SKILLS,
  sets: DEFAULT_SETS,
  weapons: DEFAULT_WEAPONS,
  amulets: [],
  options: {
    include_all_amulets: true,
    transcend: false,
    include_gog_sets: false,
  },
};
