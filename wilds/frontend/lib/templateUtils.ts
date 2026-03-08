/**
 * Template manipulation utilities.
 * Provides functions for cloning and creating template configurations.
 */

import { TemplateData } from '../model/Template';
import { Skill } from '../model/Skill';
import { Set as ArmorSet } from '../model/Set';
import { Weapon } from '../model/Weapon';
import { Amulet } from '../model/Amulet';
import { Options } from '../model/Options';

export interface TemplateConfig {
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
  amulets: Amulet[];
  options: Options;
}

/**
 * Deep clones a template into a mutable configuration object.
 * Creates independent copies of all nested objects and arrays.
 * @param template - The template to clone
 * @returns A new configuration object with all data deep-copied
 */
export function cloneTemplate(template: TemplateData): TemplateConfig {
  return {
    skills: template.skills.map((s) => ({ ...s, names: { ...s.names } })),
    sets: template.sets.map((s) => ({ ...s, names: { ...s.names } })),
    weapons: template.weapons.map((w) => ({ ...w, names: { ...w.names } })),
    amulets: template.amulets.map((a) => ({ ...a, skills: a.skills.map((s) => ({ ...s })) })),
    options: { ...template.options },
  };
}

/**
 * Creates a new custom template from the current configuration.
 * Generates a unique ID and deep-copies all configuration data.
 * @param name - The name for the new template
 * @param config - The current configuration to save as a template
 * @returns A new template data object with unique ID
 */
export function createTemplate(
  name: string,
  config: TemplateConfig
): TemplateData {
  return {
    id: `custom-${Date.now()}`,
    name: name.trim(),
    skills: config.skills.map((s) => ({ ...s, names: { ...s.names } })),
    sets: config.sets.map((s) => ({ ...s, names: { ...s.names } })),
    weapons: config.weapons.map((w) => ({ ...w, names: { ...w.names } })),
    amulets: config.amulets.map((a) => ({ ...a, skills: a.skills.map((skill) => ({ ...skill })) })),
    options: { ...config.options },
  };
}
