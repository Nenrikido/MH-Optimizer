export interface AmuletSkill {
  name: string;
  value: number;
}

export interface Amulet {
  name: string;
  skills: AmuletSkill[];
  slots: string;
}

