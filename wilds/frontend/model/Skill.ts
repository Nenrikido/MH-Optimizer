import { LocalizedNames } from './Localized';

export interface Skill {
  id: string;
  names: LocalizedNames;
  name?: string;
  icon?: string | null;
  max_points?: number;
  weight?: number;
}
