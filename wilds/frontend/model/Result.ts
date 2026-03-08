import { LocalizedNames } from './Localized';

export interface BuildItem {
  slot: string;
  id: string;
  names: LocalizedNames;
  decorations: Array<{
    decoration_id: string | null;
    decoration_names: LocalizedNames | null;
    size: number;
    type: string;
  }>;
  amulet_details?: {
    rarity: number;
    groups: number[];
    skills: Array<{
      id: string;
      names: LocalizedNames;
      value: number;
    }>;
  } | null;
}

export interface BuildSkill {
  id: string;
  names: LocalizedNames;
  current: number;
  max: number;
  weight: number;
}

export interface Result {
  id: number;
  score: number;
  items: BuildItem[];
  skills: BuildSkill[];
}
