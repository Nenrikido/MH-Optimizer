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
    skillsMaxPoints: string;
    skillsWeight: string;
    armor: string;
    armorMinPieces: string;
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
      title: string;
      addAmulet: string;
      skill: string;
      slots: string;
    };
    excludeArmorParts: {
      title: string;
      description: string;
      placeholder: string;
    };
    gogWeapons: {
      title: string;
      description: string;
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
    skillsMaxPoints: 'Max level for this skill (leave empty for no limit)',
    skillsWeight: 'Weight for this skill',
    armor: 'With which armor set(s)',
    armorMinPieces: 'Minimum pieces for this set (default 2)',
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
      title: 'Amulets',
      addAmulet: 'Add an amulet',
      skill: 'Skill',
      slots: 'Slots'
    },
    excludeArmorParts: {
      title: 'Exclude Armor Parts',
      description: 'Select armor parts to exclude from searches',
      placeholder: 'Search armor parts...',
    },
    gogWeapons: {
      title: 'Gogmazios Weapon',
      description: 'Choose the Gogmazios weapons set and group bonus',
      setBonus: 'Set Bonus',
      setBonusAutocomplete: 'Search for a set bonus...',
      groupBonus: 'Group Bonus',
      groupBonusAutocomplete: 'Search for a group bonus...',
    },
  },
  armorParts: {
    head: 'Head',
    chest: 'Chest',
    arms: 'Arms',
    waist: 'Waist',
    legs: 'Legs',
  },
  info: {
    help: 'Help',
    howToUse: 'How to use:',
    howToUseSteps: {
      step1: 'Pick your target skills, sets and weapons with autocomplete.',
      step2: 'Adjust max points / weights and set piece requirements.',
      step3: 'Use Filters to add your amulets and exclude specific armor items.',
      step4: 'Click Optimize and review builds, skills and active set/group bonuses.',
    },
    notes: 'Notes:',
    notesItems: {
      dataUpToDate: 'Data is up to date with TU4.1 (AT Arkveld)',
      defaultValues: "Yes the default values are for Insect Glaive, yes I'm a weeb",
      noBuild: 'If no build appears, relax constraints (sets/skills/filters).',
      gogFilters: 'Gogmazios set/group filters are hidden when "Include all Gog sets" is enabled.',
      customTemplates: 'Saved custom templates are local to your browser.',
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
    skillsMaxPoints: 'Niveau max pour cette compétence',
    skillsWeight: 'Poids pour cette compétence',
    armor: 'Avec quel(s) ensemble(s) d\'armure ?',
    armorMinPieces: 'Nombre minimum de pièces pour cet ensemble (défaut 2)',
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
      title: 'Amulettes',
      addAmulet: 'Ajouter une amulette',
      skill: 'Compétence',
      slots: 'Slots'
    },
    excludeArmorParts: {
      title: 'Exclure des pièces d\'armure',
      description: 'Sélectionner les pièces d\'armure à exclure des recherches',
      placeholder: 'Rechercher des pièces d\'armure...',
    },
    gogWeapons: {
      title: 'Armes Gogmazios',
      description: 'Choisissez le bonus d\'ensemble et de groupe de l\'arme Gogmazios',
      setBonus: 'Bonus d\'ensemble',
      setBonusAutocomplete: 'Recherchez un bonus d\'ensemble...',
      groupBonus: 'Bonus de groupe',
      groupBonusAutocomplete: 'Recherchez un bonus de groupe...',
    },
  },
  armorParts: {
    head: 'Tête',
    chest: 'Torse',
    arms: 'Bras',
    waist: 'Ceinture',
    legs: 'Jambes',
  },
  info: {
    help: 'Aide',
    howToUse: 'Comment utiliser :',
    howToUseSteps: {
      step1: 'Choisissez vos compétences, ensembles et armes via l\'auto-complétion.',
      step2: 'Ajustez les points max / poids et le minimum de pièces par ensemble.',
      step3: 'Utilisez Filtres pour ajouter vos amulettes et exclure des pièces d\'armure précises.',
      step4: 'Cliquez sur Optimiser puis consultez les builds, compétences et bonus actifs.',
    },
    notes: 'Notes :',
    notesItems: {
      dataUpToDate: 'Les données sont à jour avec TU4.1 (AT Arkveld)',
      defaultValues: 'Oui, les valeurs par défaut sont pour l\'Insectoglaive, oui je suis un weeb',
      noBuild: 'Si aucun build ne sort, assouplissez les contraintes (sets/skills/filtres).',
      gogFilters: 'Les filtres Gogmazios (set/groupe) sont masqués si "Inclure tous les sets Gog" est activé.',
      customTemplates: 'Les templates personnalisés sont enregistrés localement dans le navigateur.',
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
