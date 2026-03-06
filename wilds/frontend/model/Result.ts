export interface Result {
  // À adapter selon la structure réelle des résultats
  buildName?: string;
  score?: number;
  details?: string;
  // Ajoutez d'autres champs selon le backend
}
export interface Skill {
  name: string;
  max_points?: number;
  weight?: number;
}

