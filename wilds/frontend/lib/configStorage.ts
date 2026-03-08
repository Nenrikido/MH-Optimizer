/**
 * Configuration storage utilities for localStorage management.
 * Handles saving and loading of user configurations and custom templates.
 */

import { Skill } from '../model/Skill';
import { Set as ArmorSet } from '../model/Set';
import { Weapon } from '../model/Weapon';
import { Amulet } from '../model/Amulet';
import { Options } from '../model/Options';
import { TemplateData } from '../model/Template';

const CONFIG_KEY = 'mh_opti_config';
const TEMPLATES_KEY = 'mh_opti_custom_templates';

export interface SavedConfig {
  skills: Skill[];
  sets: ArmorSet[];
  weapons: Weapon[];
  amulets: Amulet[];
  options: Options;
}

/**
 * Saves the current user configuration to localStorage.
 * @param config - The configuration object containing skills, sets, weapons, amulets, and options
 */
export function saveConfig(config: SavedConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

/**
 * Loads the user configuration from localStorage.
 * @returns The saved configuration or null if none exists or parsing fails
 */
export function loadConfig(): SavedConfig | null {
  const raw = localStorage.getItem(CONFIG_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Saves custom templates to localStorage.
 * @param templates - Array of custom template data to save
 */
export function saveCustomTemplates(templates: TemplateData[]): void {
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

/**
 * Loads custom templates from localStorage.
 * @returns Array of saved templates or empty array if none exist or parsing fails
 */
export function loadCustomTemplates(): TemplateData[] {
  const raw = localStorage.getItem(TEMPLATES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
