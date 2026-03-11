/**
 * Data normalization and transformation utilities.
 * Provides functions to normalize API responses and saved data into consistent formats.
 */

import { NamedEntity } from '../model/Localized';
import { Skill } from '../model/Skill';
import { Set as ArmorSet } from '../model/Set';
import { Weapon } from '../model/Weapon';

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
  const en = entry.names?.en || entry.name || id;
  const fr = entry.names?.fr || en;
  return {
    id,
    names: { en, fr },
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
    names: base?.names || { en: String(skill.name), fr: String(skill.name) },
    icon: base?.icon ?? null,
    max_points: skill?.max_points ?? 3,
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
    names: base?.names || { en: String(setItem.name), fr: String(setItem.name) },
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
    names: base?.names || { en: String(weapon.name), fr: String(weapon.name) },
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
    index[entry.names.en] = entry;
    index[entry.names.fr] = entry;
  });
  return index;
}
