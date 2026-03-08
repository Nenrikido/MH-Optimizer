/**
 * Internationalization translations and configuration.
 * Defines translation types and provides translations for English and French.
 */

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
  templates: {
    defaultTitle: string;
    customTitle: string;
    namePlaceholder: string;
    saveCurrent: string;
    emptyCustom: string;
    apply: string;
    delete: string;
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
    };
    featuresToCome: string;
    featuresToComeItems: {
      iconsImages: string;
      armorFilters: string;
      betterDesign: string;
    };
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
    templates: 'Templates',
  },
  templates: {
    defaultTitle: 'Default Templates',
    customTitle: 'Custom Templates',
    namePlaceholder: 'Template name',
    saveCurrent: 'Save Current',
    emptyCustom: 'No custom templates saved yet.',
    apply: 'Apply',
    delete: 'Delete',
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
    howToUse: 'How to use:',
    howToUseSteps: {
      step1: 'Type your desired skills, sets and weapons in the input boxes (autocomplete available)',
      step2: 'Choose your max amount of skill points and the weight of each skill, and the min amount of pieces from each set',
      step3: 'In the "Filters" tab, you can choose the amulets you have in your box',
      step4: 'Click on "Optimize" and wait for the results',
    },
    notes: 'Notes:',
    notesItems: {
      dataUpToDate: 'Data is up to date with TU4.1 (AT Arkveld)',
      defaultValues: "Yes the default values are for Insect Glaive, yes I'm a weeb",
    },
    featuresToCome: 'Features to come:',
    featuresToComeItems: {
      iconsImages: 'A bit of icons and images here and there',
      armorFilters: 'Armor pieces filters',
      betterDesign: 'Better design (I suck at design sry)',
    },
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
    templates: 'Modèles',
  },
  templates: {
    defaultTitle: 'Modèles par défaut',
    customTitle: 'Modèles personnalisés',
    namePlaceholder: 'Nom du modèle',
    saveCurrent: 'Sauver la config actuelle',
    emptyCustom: 'Aucun modèle personnalisé enregistré.',
    apply: 'Appliquer',
    delete: 'Supprimer',
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
    howToUse: 'Comment utiliser :',
    howToUseSteps: {
      step1: 'Tapez vos compétences, ensembles d\'armure et armes souhaités dans les champs de saisie (auto-complétion disponible)',
      step2: 'Choisissez le nombre maximum de points de compétence et le poids de chaque compétence, ainsi que le nombre minimum de pièces de chaque ensemble',
      step3: 'Dans l\'onglet "Filtres", vous pouvez choisir les amulettes que vous avez dans votre inventaire',
      step4: 'Cliquez sur "Optimiser" et attendez les résultats',
    },
    notes: 'Notes :',
    notesItems: {
      dataUpToDate: 'Les données sont à jour avec TU4.1 (AT Arkveld)',
      defaultValues: 'Oui, les valeurs par défaut sont pour l\'Insectoglaive, oui je suis un weeb',
    },
    featuresToCome: 'Fonctionnalités à venir :',
    featuresToComeItems: {
      iconsImages: 'Quelques icônes et images ici et là',
      armorFilters: 'Filtres de pièces d\'armure',
      betterDesign: 'Meilleur design (je suis nul en design désolé)',
    },
  },
  common: {
    loading: 'Chargement...',
  },
};

export const translations: Record<Language, Translations> = { en, fr };

export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations.en;
};
