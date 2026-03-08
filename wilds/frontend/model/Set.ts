import { LocalizedNames } from './Localized';

export interface Set {
  id: string;
  names: LocalizedNames;
  name?: string;
  min_pieces?: number;
  is_group?: boolean;
}
