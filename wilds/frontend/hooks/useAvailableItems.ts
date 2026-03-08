/**
 * Custom hook for loading available items from the API.
 * Fetches skills, sets, and weapons on mount, then loads and normalizes saved configuration.
 *
 * @param setSkills - Setter function for skills state
 * @param setSets - Setter function for sets state
 * @param setWeapons - Setter function for weapons state
 * @param setAmulets - Setter function for amulets state
 * @param setOptions - Setter function for options state
 * @returns Object containing available items lists and loading state
 */

import { useState, useEffect } from 'react';
import { NamedEntity } from '../model/Localized';
import { Skill } from '../model/Skill';
import { Set as ArmorSet } from '../model/Set';
import { Weapon } from '../model/Weapon';
import { Amulet } from '../model/Amulet';
import { Options } from '../model/Options';
import { DEFAULT_DATA } from '../lib/defaultData';
import { normalizeEntity, normalizeSavedSkill, normalizeSavedSet, normalizeSavedWeapon, buildEntityIndex } from '../lib/dataUtils';
import { loadConfig } from '../lib/configStorage';

interface UseAvailableItemsResult {
  availableSkills: NamedEntity[];
  availableSets: NamedEntity[];
  availableWeapons: NamedEntity[];
  loading: boolean;
}

export function useAvailableItems(
  setSkills: (skills: Skill[]) => void,
  setSets: (sets: ArmorSet[]) => void,
  setWeapons: (weapons: Weapon[]) => void,
  setAmulets: (amulets: Amulet[]) => void,
  setOptions: (options: Options) => void
): UseAvailableItemsResult {
  const [availableSkills, setAvailableSkills] = useState<NamedEntity[]>([]);
  const [availableSets, setAvailableSets] = useState<NamedEntity[]>([]);
  const [availableWeapons, setAvailableWeapons] = useState<NamedEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/available_items')
      .then((r) => r.json())
      .then((data) => {
        const skillsList = (data.available_skills || []).map(normalizeEntity).filter(Boolean) as NamedEntity[];
        const setsList = (data.available_sets || []).map(normalizeEntity).filter(Boolean) as NamedEntity[];
        const weaponsList = (data.available_weapons || []).map(normalizeEntity).filter(Boolean) as NamedEntity[];

        setAvailableSkills(skillsList);
        setAvailableSets(setsList);
        setAvailableWeapons(weaponsList);

        const skillIndex = buildEntityIndex(skillsList);
        const setIndex = buildEntityIndex(setsList);
        const weaponIndex = buildEntityIndex(weaponsList);

        const saved = loadConfig();
        if (saved) {
          setSkills((saved.skills || []).map((s: any) => normalizeSavedSkill(s, skillIndex)).filter((s): s is Skill => s !== null));
          setSets((saved.sets || []).map((s: any) => normalizeSavedSet(s, setIndex)).filter((s): s is ArmorSet => s !== null));
          setWeapons((saved.weapons || []).map((w: any) => normalizeSavedWeapon(w, weaponIndex)).filter((w): w is Weapon => w !== null));
          setAmulets(saved.amulets || DEFAULT_DATA.amulets);
          setOptions(saved.options || DEFAULT_DATA.options);
        } else {
          setSkills(DEFAULT_DATA.skills as Skill[]);
          setSets(DEFAULT_DATA.sets as ArmorSet[]);
          setWeapons(DEFAULT_DATA.weapons as Weapon[]);
          setAmulets(DEFAULT_DATA.amulets);
          setOptions(DEFAULT_DATA.options);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [setSkills, setSets, setWeapons, setAmulets, setOptions]);

  return {
    availableSkills,
    availableSets,
    availableWeapons,
    loading,
  };
}
