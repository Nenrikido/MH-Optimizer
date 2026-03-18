/**
 * Data normalization and transformation utilities.
 * Provides functions to normalize API responses and saved data into consistent formats.
 */

import { NamedEntity } from '../model/Localized';
import { Skill } from '../model/Skill';
import { Set as ArmorSet } from '../model/Set';
import { Weapon } from '../model/Weapon';
import { TemplateData } from '../model/Template';

/**
 * Normalizes a raw API entity into a standardized NamedEntity format.
 * Handles various input formats (strings, objects with id/name/names fields).
 * @param entry - The raw entity data from API
 * @returns Normalized entity or null if invalid
 */
export function normalizeEntity(entry: any): NamedEntity | null {
  if (!entry) return null;
  if (typeof entry === 'string') {
    return { id: entry, names: { en: entry, fr: entry } };
  }
  const id = String(entry.id || entry.name || '');
  if (!id) return null;
  const fallbackName = String(entry.names?.en || entry.name || id);
  const names = typeof entry.names === 'object' && entry.names
    ? Object.fromEntries(
        Object.entries(entry.names)
          .filter(([key, value]) => typeof key === 'string' && typeof value === 'string' && value)
      )
    : {};
  return {
    id,
    names: { en: fallbackName, ...names },
    icon: entry.icon ?? null,
    gear_key: entry.gear_key ?? null,
  };
}

/**
 * Normalizes a raw API skill entity while preserving optional metadata like icon.
 */
export function normalizeSkillEntity(entry: any): Skill | null {
  const base = normalizeEntity(entry);
  if (!base) return null;

  return {
    id: base.id,
    names: base.names,
    icon: base.icon ?? entry?.icon ?? null,
    max_points: typeof entry?.max_points === 'number' ? entry.max_points : undefined,
  };
}

/**
 * Normalizes a saved skill from localStorage into a full Skill object.
 * Attempts to match by ID first, then by name, using the skill index.
 * @param skill - Raw saved skill data
 * @param skillIndex - Record mapping IDs and names to canonical skill entities
 * @returns Normalized skill or null if invalid
 */
export function normalizeSavedSkill(skill: any, skillIndex: Record<string, Skill>): Skill | null {
  const fromId = skill?.id ? skillIndex[String(skill.id)] : undefined;
  const fromName = skill?.name ? skillIndex[String(skill.name)] : undefined;
  const base = fromId || fromName;
  if (!base && !skill?.name) return null;

  return {
    id: base?.id || String(skill.name),
    names: base?.names || { en: String(skill.name) },
    icon: base?.icon ?? null,
    max_points: skill?.max_points ?? base?.max_points ?? 3,
    weight: skill?.weight ?? 10,
  };
}

/**
 * Normalizes a saved armor set from localStorage into a full ArmorSet object.
 * Attempts to match by ID first, then by name, using the set index.
 * @param setItem - Raw saved set data
 * @param setIndex - Index mapping IDs and names to canonical set entities
 * @returns Normalized armor set or null if invalid
 */
export function normalizeSavedSet(setItem: any, setIndex: Record<string, NamedEntity>): ArmorSet | null {
  const fromId = setItem?.id ? setIndex[String(setItem.id)] : undefined;
  const fromName = setItem?.name ? setIndex[String(setItem.name)] : undefined;
  const base = fromId || fromName;
  if (!base && !setItem?.name) return null;

  return {
    id: base?.id || String(setItem.name),
    names: base?.names || { en: String(setItem.name) },
    icon: base?.icon ?? null,
    min_pieces: setItem?.min_pieces ?? 2,
    is_group: setItem?.is_group,
  };
}

/**
 * Normalizes a saved weapon from localStorage into a full Weapon object.
 * Attempts to match by ID first, then by name, using the weapon index.
 * @param weapon - Raw saved weapon data
 * @param weaponIndex - Index mapping IDs and names to canonical weapon entities
 * @returns Normalized weapon or null if invalid
 */
export function normalizeSavedWeapon(weapon: any, weaponIndex: Record<string, NamedEntity>): Weapon | null {
  const fromId = weapon?.id ? weaponIndex[String(weapon.id)] : undefined;
  const fromName = weapon?.name ? weaponIndex[String(weapon.name)] : undefined;
  const base = fromId || fromName;
  if (!base && !weapon?.name) return null;

  return {
    id: base?.id || String(weapon.name),
    names: base?.names || { en: String(weapon.name) },
    gear_key: base?.gear_key ?? null,
  };
}

/**
 * Builds a multi-key index for fast entity lookups.
 * Creates mappings for id, English name, and French name to the entity.
 * @param entities - Array of named entities to index
 * @returns Record mapping multiple keys (id, en name, fr name) to entities
 */
export function buildEntityIndex<T extends NamedEntity>(entities: T[]): Record<string, T> {
  const index: Record<string, T> = {};
  entities.forEach((entry) => {
    index[entry.id] = entry;
    Object.values(entry.names).forEach((name) => {
      if (name) {
        index[name] = entry;
      }
    });
  });
  return index;
}

function withFallbackNames(id: string, names?: Record<string, string | undefined>, name?: string) {
  const fallback = name || names?.en || id;
  return { en: fallback, ...(names || {}) };
}

/**
 * Resolves template entities against API catalogs by ID so names/icons stay synced with backend translations.
 */
export function resolveDefaultTemplates(
  templates: TemplateData[],
  skillIndex: Record<string, Skill>,
  setIndex: Record<string, NamedEntity>,
  weaponIndex: Record<string, NamedEntity>
): TemplateData[] {
  return templates.map((template) => ({
    ...template,
    skills: (template.skills || []).map((skill) => {
      const fromCatalog = skill?.id ? skillIndex[String(skill.id)] : undefined;
      return {
        ...skill,
        id: fromCatalog?.id || String(skill.id || ''),
        names: withFallbackNames(String(skill.id || ''), fromCatalog?.names || skill.names, skill.name),
        icon: fromCatalog?.icon ?? skill.icon ?? null,
      };
    }),
    sets: (template.sets || []).map((setEntry) => {
      const fromCatalog = setEntry?.id ? setIndex[String(setEntry.id)] : undefined;
      return {
        ...setEntry,
        id: fromCatalog?.id || String(setEntry.id || ''),
        names: withFallbackNames(String(setEntry.id || ''), fromCatalog?.names || setEntry.names, setEntry.name),
        icon: fromCatalog?.icon ?? setEntry.icon ?? null,
      };
    }),
    weapons: (template.weapons || []).map((weapon) => {
      const fromCatalog = weapon?.id ? weaponIndex[String(weapon.id)] : undefined;
      return {
        ...weapon,
        id: fromCatalog?.id || String(weapon.id || ''),
        names: withFallbackNames(String(weapon.id || ''), fromCatalog?.names || weapon.names, weapon.name),
        gear_key: fromCatalog?.gear_key ?? weapon.gear_key ?? null,
      };
    }),
  }));
}

