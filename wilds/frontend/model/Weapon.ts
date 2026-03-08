import { LocalizedNames } from './Localized';

export interface Weapon {
  id: string;
  names: LocalizedNames;
  name?: string;
  type?: string;
}
