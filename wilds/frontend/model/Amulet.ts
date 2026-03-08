import { LocalizedNames } from './Localized';

export interface AmuletSkill {
  id?: string;
  names?: LocalizedNames;
  name?: string;
  value: number;
}

export interface Amulet {
  name: string;
  skills: AmuletSkill[];
  slots: string;
}
