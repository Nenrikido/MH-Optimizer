export interface BuildItem {
  slot: string;
  name: string;
  decorations: Array<{
    decoration: string | null;
    size: number;
    type: string;
  }>;
  amulet_details?: {
    rarity: number;
    groups: number[];
    skills: Record<string, number>;
  } | null;
}

export interface BuildSkill {
  name: string;
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


