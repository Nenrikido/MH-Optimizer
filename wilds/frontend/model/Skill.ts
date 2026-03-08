import { LocalizedNames } from './Localized';

export interface Skill {
  id: string;
  names: LocalizedNames;
  name?: string;
  max_points?: number;
  weight?: number;
}
