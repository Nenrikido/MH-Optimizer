import { Skill } from './Skill';
import { Set as ArmorSet } from './Set';
import { Weapon } from './Weapon';
import { Translations } from '../lib/i18n';

export interface TemplateData {
  id: string;
  name: string;
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
}

/** Returns a translated name for a default template if available, otherwise falls back to template.name. */
export function getTemplateName(template: TemplateData, t: Translations): string {
  const names = t.templates.names as Record<string, string | undefined>;
  return names[template.id] ?? template.name;
}

