import React, { createContext, useContext } from 'react';
import { Skill } from '../model/Skill';
import { Set as ArmorSet } from '../model/Set';
import { Weapon } from '../model/Weapon';
import { Amulet } from '../model/Amulet';
import { Options } from '../model/Options';
import { Result } from '../model/Result';
import { NamedEntity } from '../model/Localized';
import { TemplateData } from '../model/Template';

export interface AppStateContextValue {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  sets: ArmorSet[];
  setSets: React.Dispatch<React.SetStateAction<ArmorSet[]>>;
  weapons: Weapon[];
  setWeapons: React.Dispatch<React.SetStateAction<Weapon[]>>;
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
  amulets: Amulet[];
  setAmulets: React.Dispatch<React.SetStateAction<Amulet[]>>;
  results: Result[] | string[];
  loading: boolean;
  loadingLists: boolean;
  availableSkills: Skill[];
  availableSets: NamedEntity[];
  availableGroups: NamedEntity[];
  availableWeapons: NamedEntity[];
  availableArmorItems: NamedEntity[];
  excludedArmorItems: string[];
  setExcludedArmorItems: React.Dispatch<React.SetStateAction<string[]>>;
  gogSetFilter: string;
  setGogSetFilter: React.Dispatch<React.SetStateAction<string>>;
  gogGroupFilter: string;
  setGogGroupFilter: React.Dispatch<React.SetStateAction<string>>;
  defaultTemplates: TemplateData[];
  customTemplates: TemplateData[];
  applyTemplate: (template: TemplateData) => void;
  saveTemplate: (name: string) => void;
  deleteTemplate: (templateId: string) => void;
  onOptimize: () => Promise<void>;
  onSaveConfig: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

interface AppStateProviderProps {
  value: AppStateContextValue;
  children: React.ReactNode;
}

export function AppStateProvider({ value, children }: AppStateProviderProps) {
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}

