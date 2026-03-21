export type Language = 'en' | 'fr' | 'de' | 'es' | 'es-419' | 'pt' | 'pt-BR' | 'it' | 'pl' | 'zh-Hans';

export interface Translations {
  header: {
    title: string;
    subtitle: string;
  };
  form: {
    skills: string;
    armor: string;
    weapons: string;
    optimize: string;
    save: string;
  };
  options: {
    includeAllAmulets: string;
    transcend: string;
    includeGogSets: string;
  };
  inputs: {
    skills: string;
    skillsMaxPoints: string;
    skillsWeight: string;
    armor: string;
    armorMinPieces: string;
    weapons: string;
  };
  tabs: {
    results: string;
    filters: string;
    templates: string;
  };
  templates: {
    defaultTitle: string;
    customTitle: string;
    namePlaceholder: string;
    saveCurrent: string;
    emptyCustom: string;
    apply: string;
    delete: string;
    names: {
      'default-great-sword': string;
      'default-long-sword': string;
      'default-sword-and-shield': string;
      'default-dual-blades': string;
      'default-hammer': string;
      'default-hunting-horn': string;
      'default-lance': string;
      'default-gunlance': string;
      'default-switch-axe': string;
      'default-charge-blade': string;
      'default-insect-glaive': string;
      'default-light-bowgun': string;
      'default-heavy-bowgun': string;
      'default-bow': string;
    };
  };
  results: {
    noResults: string;
    error: string;
    title: string;
    skillsLabel: string;
    armorSetLabel: string;
    armorLabel: string;
  };
  filters: {
    amulets: {
      title: string;
      addAmulet: string;
      skill: string;
      slots: string;
    };
    excludeArmorParts: {
      title: string;
      placeholder: string;
    };
    gogWeapons: {
      title: string;
      setBonus: string;
      setBonusAutocomplete: string;
      groupBonus: string;
      groupBonusAutocomplete: string;
    };
  };
  armorParts: {
    head: string;
    chest: string;
    arms: string;
    waist: string;
    legs: string;
  };
  info: {
    help: string;
    howToUse: string;
    howToUseSteps: {
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    notes: string;
    notesItems: {
      dataUpToDate: string;
      defaultValues: string;
      noBuild: string;
      gogFilters: string;
      customTemplates: string;
    };
  };
  common: {
    loading: string;
    switchToLightMode: string;
    switchToDarkMode: string;
  };
}

