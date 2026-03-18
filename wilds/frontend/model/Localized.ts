export interface LocalizedNames {
  en: string;
  [languageCode: string]: string | undefined;
}

export interface NamedEntity {
  id: string;
  names: LocalizedNames;
  icon?: string | null;
  gear_key?: string | null;
}
