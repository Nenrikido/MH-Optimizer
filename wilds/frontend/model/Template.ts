import { Skill } from './Skill';
import { Set as ArmorSet } from './Set';
import { Weapon } from './Weapon';
import { Amulet } from './Amulet';
import { Options } from './Options';

export interface TemplateData {
  id: string;
  name: string;
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
}

