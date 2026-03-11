import { LocalizedNames } from './Localized';

export interface BuildItem {
  slot: string;
  id: string;
  names: LocalizedNames;
  gear_key?: string | null;
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
      icon?: string | null;
      value: number;
    }>;
  } | null;
  set_bonuses?: Array<{
    id: string;
    names: LocalizedNames;
    icon?: string | null;
  }>;
  group_bonuses?: Array<{
    id: string;
    names: LocalizedNames;
    icon?: string | null;
  }>;
}

export interface BuildSkill {
  id: string;
  names: LocalizedNames;
  icon?: string | null;
  current: number;
  max: number;
  weight: number;
}

export interface Result {
  id: number;
  score: number;
  items: BuildItem[];
  skills: BuildSkill[];
  set_bonuses?: Array<{
    id: string;
    names: LocalizedNames;
    icon?: string | null;
    count: number;
  }>;
  group_bonuses?: Array<{
    id: string;
    names: LocalizedNames;
    icon?: string | null;
    count: number;
  }>;
}
