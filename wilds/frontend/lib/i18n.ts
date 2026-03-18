/**
 * Internationalization translations and configuration.
 * Defines translation types and provides translations for English and French.
 */

export type Language = 'en' | 'fr' | 'es';

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es'] as const;

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '/flags/gb.svg',
  fr: '/flags/fr.svg',
  es: '/flags/es.svg',
};

export function isLanguage(value: string | null | undefined): value is Language {
  return value != null && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function normalizeLanguage(value: string | null | undefined): Language {
  return isLanguage(value) ? value : 'en';
}

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

const en: Translations = {
  header: {
    title: 'MH Wilds Build Optimizer',
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
    names: {
      'default-great-sword': 'Great Sword',
      'default-long-sword': 'Long Sword',
      'default-sword-and-shield': 'Sword & Shield',
      'default-dual-blades': 'Dual Blades',
      'default-hammer': 'Hammer',
      'default-hunting-horn': 'Hunting Horn',
      'default-lance': 'Lance',
      'default-gunlance': 'Gunlance',
      'default-switch-axe': 'Switch Axe',
      'default-charge-blade': 'Charge Blade',
      'default-insect-glaive': 'Insect Glaive',
      'default-light-bowgun': 'Light Bowgun',
      'default-heavy-bowgun': 'Heavy Bowgun',
      'default-bow': 'Bow',
    },
  },
  results: {
    noResults: 'No results for now.',
    error: 'Error during optimization',
    title: 'Optimization results',
    skillsLabel: 'Skills',
    armorSetLabel: 'Set / Group Bonuses',
    armorLabel: 'Items',
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
      placeholder: 'Search armor parts to exclude from searches',
    },
    gogWeapons: {
      title: 'Gogmazios Weapon',
      setBonus: 'Set Bonus',
      setBonusAutocomplete: 'Choose the Gogmazios weapons set bonus',
      groupBonus: 'Group Bonus',
      groupBonusAutocomplete: 'Choose the Gogmazios weapons group bonus',
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
      defaultValues: "Yes the default values are for LS, yes I'm a weeb",
      noBuild: 'If no build appears, relax constraints (sets/skills/filters).',
      gogFilters: 'Gogmazios set/group filters are hidden when "Include all Gog sets" is enabled.',
      customTemplates: 'Saved custom templates are local to your browser.',
    },
  },
  common: {
    loading: 'Loading...',
    switchToLightMode: 'Switch to light mode',
    switchToDarkMode: 'Switch to dark mode',
  }
};

const fr: Translations = {
  header: {
    title: 'Optimiseur de Build pour MH Wilds',
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
    names: {
      'default-great-sword': 'Grande Épée',
      'default-long-sword': 'Katana',
      'default-sword-and-shield': 'Épée & Bouclier',
      'default-dual-blades': 'Doubles Lames',
      'default-hammer': 'Marteau',
      'default-hunting-horn': 'Cor de Chasse',
      'default-lance': 'Lance',
      'default-gunlance': 'Fusée-Lance',
      'default-switch-axe': 'Morpho-Hache',
      'default-charge-blade': 'Lame Chargée',
      'default-insect-glaive': 'Insectoglaive',
      'default-light-bowgun': 'Fusarbalète Légère',
      'default-heavy-bowgun': 'Fusarbalète Lourde',
      'default-bow': 'Arc',
    },
  },
  results: {
    noResults: 'Aucun résultat pour le moment.',
    error: 'Erreur lors de l\'optimisation',
    title: 'Résultats de l\'optimisation',
    skillsLabel: 'Compétences',
    armorSetLabel: 'Bonus d\'ensemble / de groupe',
    armorLabel: 'Équipement',
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
      placeholder: 'Sélectionner les pièces d\'armure à exclure des recherches',
    },
    gogWeapons: {
      title: 'Armes Gogmazios',
      setBonus: 'Bonus d\'ensemble',
      setBonusAutocomplete: 'Choisissez un bonus d\'ensemble des armes Gogmazios...',
      groupBonus: 'Bonus de groupe',
      groupBonusAutocomplete: 'Choisissez un bonus de groupe des armes Gogmazios...',
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
      defaultValues: 'Oui, les valeurs par défaut sont pour la LS, oui je suis un weeb',
      noBuild: 'Si aucun build ne sort, assouplissez les contraintes (sets/skills/filtres).',
      gogFilters: 'Les filtres Gogmazios (set/groupe) sont masqués si "Inclure tous les sets Gog" est activé.',
      customTemplates: 'Les templates personnalisés sont enregistrés localement dans le navigateur.',
    },
  },
  common: {
    loading: 'Chargement...',
    switchToLightMode: 'Passer en mode clair',
    switchToDarkMode: 'Passer en mode sombre',
  },
};

const es: Translations = {
  header: {
    title: 'Optimizador de Builds MH Wilds',
    subtitle: 'por @nenrikido en discord',
  },
  form: {
    skills: 'Habilidades',
    armor: 'Conjuntos de armadura',
    weapons: 'Armas',
    optimize: 'Optimizar',
    save: 'Guardar config',
  },
  options: {
    includeAllAmulets: 'Incluir todos los amuletos generados a partir de las habilidades deseadas (desactivar esto incluirá solo los amuletos obtenibles y los amuletos elegidos en la pestaña de filtros)',
    transcend: 'Trascender todas las armaduras (esto cambia sus ranuras de decoración si su rareza es 5 o 6)',
    includeGogSets: 'Incluir todos los conjuntos posibles en las armas mejoradas por Gogmazios',
  },
  inputs: {
    skills: '¿Qué habilidades deseas tener?',
    skillsMaxPoints: 'Nivel máximo para esta habilidad',
    skillsWeight: 'Peso para esta habilidad',
    armor: '¿Con qué conjunto(s) de armadura?',
    armorMinPieces: 'Piezas mínimas para este conjunto (por defecto 2)',
    weapons: '¿En qué arma(s)?',
  },
  tabs: {
    results: 'Resultados',
    filters: 'Filtros',
    templates: 'Plantillas',
  },
  templates: {
    defaultTitle: 'Plantillas predeterminadas',
    customTitle: 'Plantillas personalizadas',
    namePlaceholder: 'Nombre de la plantilla',
    saveCurrent: 'Guardar actual',
    emptyCustom: 'No hay plantillas personalizadas guardadas.',
    apply: 'Aplicar',
    delete: 'Eliminar',
    names: {
      'default-great-sword': 'Gran Espada',
      'default-long-sword': 'Espada Larga',
      'default-sword-and-shield': 'Espada y escudo',
      'default-dual-blades': 'Doble hoja',
      'default-hammer': 'Martillo',
      'default-hunting-horn': 'Cuerno de caza',
      'default-lance': 'Lanza',
      'default-gunlance': 'Lanza de fuego',
      'default-switch-axe': 'Hacha-espada',
      'default-charge-blade': 'Espada cargada',
      'default-insect-glaive': 'Guja insecto',
      'default-light-bowgun': 'Ballesta ligera',
      'default-heavy-bowgun': 'Ballesta pesada',
      'default-bow': 'Arco',
    },
  },
  results: {
    noResults: 'Sin resultados por ahora.',
    error: 'Error durante la optimización',
    title: 'Resultados de la optimización',
    skillsLabel: 'Habilidades',
    armorSetLabel: 'Bonificaciones de conjunto / grupo',
    armorLabel: 'Equipamiento',
  },
  filters: {
    amulets: {
      title: 'Amuletos',
      addAmulet: 'Añadir un amuleto',
      skill: 'Habilidad',
      slots: 'Ranuras',
    },
    excludeArmorParts: {
      title: 'Excluir piezas de armadura',
      placeholder: 'Buscar piezas de armadura a excluir de las búsquedas',
    },
    gogWeapons: {
      title: 'Arma Gogmazios',
      setBonus: 'Bonificación de conjunto',
      setBonusAutocomplete: 'Elegir la bonificación de conjunto del arma Gogmazios',
      groupBonus: 'Bonificación de grupo',
      groupBonusAutocomplete: 'Elegir la bonificación de grupo del arma Gogmazios',
    },
  },
  armorParts: {
    head: 'Cabeza',
    chest: 'Pecho',
    arms: 'Brazos',
    waist: 'Cintura',
    legs: 'Piernas',
  },
  info: {
    help: 'Ayuda',
    howToUse: 'Cómo usar:',
    howToUseSteps: {
      step1: 'Elige tus habilidades, conjuntos y armas objetivo con autocompletado.',
      step2: 'Ajusta los puntos máximos / pesos y los requisitos de piezas del conjunto.',
      step3: 'Usa Filtros para añadir tus amuletos y excluir piezas de armadura específicas.',
      step4: 'Haz clic en Optimizar y revisa las builds, habilidades y bonificaciones activas.',
    },
    notes: 'Notas:',
    notesItems: {
      dataUpToDate: 'Los datos están actualizados con TU4.1 (AT Arkveld)',
      defaultValues: 'Sí, los valores predeterminados son para la Espada Larga, sí soy un weeb',
      noBuild: 'Si no aparece ninguna build, reduce las restricciones (conjuntos/habilidades/filtros).',
      gogFilters: 'Los filtros de Gogmazios (conjunto/grupo) se ocultan cuando "Incluir todos los conjuntos Gog" está activado.',
      customTemplates: 'Las plantillas personalizadas guardadas son locales en tu navegador.',
    },
  },
  common: {
    loading: 'Cargando...',
    switchToLightMode: 'Cambiar al modo claro',
    switchToDarkMode: 'Cambiar al modo oscuro',
  },
};

export const translations: Record<Language, Translations> = { en, fr, es };

export const getTranslations = (language: Language): Translations => {
  return translations[normalizeLanguage(language)];
};
