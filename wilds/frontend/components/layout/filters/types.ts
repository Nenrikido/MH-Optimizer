import React from 'react';
import { Amulet } from '../../../model/Amulet';
import { NamedEntity } from '../../../model/Localized';
import { Skill } from '../../../model/Skill';

export interface AmuletsSectionProps {
  amulets: Amulet[];
  setAmulets: React.Dispatch<React.SetStateAction<Amulet[]>>;
  availableSkills: Skill[];
}

export interface ExcludeArmorSectionProps {
  excludedArmorItems: string[];
  setExcludedArmorItems: (items: string[]) => void;
  availableArmorItems: NamedEntity[];
}

export interface GogWeaponsSectionProps {
  gogSetFilter: string;
  setGogSetFilter: (setId: string) => void;
  gogGroupFilter: string;
  setGogGroupFilter: (groupId: string) => void;
  availableSets: NamedEntity[];
  availableGroups: NamedEntity[];
}
