export type Language = 'en' | 'fr';

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
    armor: string;
    weapons: string;
  }
  tabs: {
    results: string;
    filters: string;
    templates: string;
  };
  results: {
    noResults: string;
    error: string;
    title: string;
    skillsLabel: string;
    amuletsLabel: string;
    armorLabel: string;
    weaponLabel: string;
  };
  filters: {
    amulets: {
      addAmulet: string;
      skill: string;
      level: string;
    }
  };
  info: {
    help: string;
  };
  common: {
    loading: string;
  };
}

const en: Translations = {
  header: {
    title: 'MH Wilds Build Optimizer (Beta)',
    subtitle: 'from @nenrikido on discord',
  },
  form: {
    skills: 'Skills',
    armor: 'Armor Sets',
    weapons: 'Weapons',
    optimize: 'Optimize',
    save: 'Save Config',
  },
  options: {
    includeAllAmulets: 'Include all generated amulets from desired skills (unchecking this will include only farmable amulets and amulets chosen from the filters tab)',
    transcend: 'Transcend all armors (this changes their decoration slots if their rarity is 5 or 6)',
    includeGogSets: 'Include all possible sets on Gogmazios upgraded weapons',
  },
  inputs: {
    skills: 'Which skills do you want to have ?',
    armor: 'With which armor set(s)',
    weapons: 'On which weapon(s)',
  },
  tabs: {
    results: 'Results',
    filters: 'Filters',
    templates: 'Templates (WIP)',
  },
  results: {
    noResults: 'No results for now.',
    error: 'Error during optimization',
    title: 'Optimization results',
    skillsLabel: 'Skills',
    amuletsLabel: 'Amulets',
    armorLabel: 'Items',
    weaponLabel: 'Weapon',
  },
  filters: {
    amulets: {
      addAmulet: 'Add an amulet',
      skill: 'Skill',
      level: 'Level',
    }
  },
  info: {
    help: 'Help',
  },
  common: {
    loading: 'Loading...',
  }
};

const fr: Translations = {
  header: {
    title: 'Optimiseur de Build pour MH Wilds (Bêta)',
    subtitle: 'par @nenrikido sur discord',
  },
  form: {
    skills: 'Compétences',
    armor: 'Ensembles d\'armure',
    weapons: 'Armes',
    optimize: 'Optimiser',
    save: 'Sauvegarder la config',
  },
  options: {
    includeAllAmulets: 'Inclure toutes les amulettes générées à partir des compétences souhaitées (décocher ceci inclura uniquement les amulettes farmables et les amulettes choisies dans l\'onglet filtres)',
    transcend: 'Transcender toutes les armures (cela change leurs emplacements de décoration si leur rareté est 5 ou 6)',
    includeGogSets: 'Inclure tous les sets possibles sur les armes améliorées Gogmazios',
  },
  inputs: {
    skills: 'Quelles compétences souhaitez-vous avoir ?',
    armor: 'Avec quel(s) ensemble(s) d\'armure ?',
    weapons: 'Sur quelle(s) arme(s) ?',
  },
  tabs: {
    results: 'Résultats',
    filters: 'Filtres',
    templates: 'Modèles (EN COURS)',
  },
  results: {
    noResults: 'Aucun résultat pour le moment.',
    error: 'Erreur lors de l\'optimisation',
    title: 'Résultats de l\'optimisation',
    skillsLabel: 'Compétences',
    amuletsLabel: 'Amulettes',
    armorLabel: 'Équipement',
    weaponLabel: 'Arme',
  },
  filters: {
    amulets: {
      addAmulet: 'Ajouter une amulette',
      skill: 'Compétence',
      level: 'Niveau',
    }
  },
  info: {
    help: 'Aide',
  },
  common: {
    loading: 'Chargement...',
  },
};

export const translations: Record<Language, Translations> = { en, fr };

export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations.en;
};

