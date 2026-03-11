import { LocalizedNames } from './Localized';

export interface Weapon {
  id: string;
  names: LocalizedNames;
  name?: string;
  gear_key?: string | null;
  type?: string;
}
