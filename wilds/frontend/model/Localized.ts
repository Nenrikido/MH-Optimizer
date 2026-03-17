export interface LocalizedNames {
  en: string;
  fr: string;
  es?: string;
}

export interface NamedEntity {
  id: string;
  names: LocalizedNames;
  icon?: string | null;
  gear_key?: string | null;
}
