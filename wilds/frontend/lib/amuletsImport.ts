import {Amulet, AmuletSkill} from '../model/Amulet';
import {Skill} from '../model/Skill';

export type GameCatSkill = {
  id?: number;
  level?: number;
  name?: string;
};

export type GameCatCharm = {
  name?: string;
  skills?: GameCatSkill[];
  slots?: number | string;
};

const GAMECAT_SLOT_MAP: Record<string, string> = {
  '100': '1-0-0',
  '110': '1-1-0',
  '200': '2-0-0',
  '210': '2-1-0',
  '300': '3-0-0',
  '500': 'W1-0-0',
  '510': 'W1-1-0',
  '511': 'W1-1-1',
};

const normalizeSkillName = (value: string) => value.trim().toLowerCase();

const deriveImportedAmuletName = (skills: AmuletSkill[]): string => {
  const parts = skills
    .filter((skill) => Boolean(skill.id) && Number(skill.value) > 0)
    .map((skill) => `${skill.name || skill.id}: ${skill.value || 1}`);

  if (!parts.length) {
    return 'Custom Amulet';
  }
  return `${parts.join(', ')}`;
};

const mapCharmToAmulet = (
  charm: GameCatCharm,
  skillByNormalizedName: Map<string, Skill>
): Amulet | null => {

  const mappedSkills: AmuletSkill[] = Array.isArray(charm.skills)
    ? charm.skills.reduce<AmuletSkill[]>((acc, rawSkill) => {
      const skillName = typeof rawSkill?.name === 'string' ? rawSkill.name : '';
      const matchedSkill = skillName ? skillByNormalizedName.get(normalizeSkillName(skillName)) : undefined;
      if (!matchedSkill) return acc;

      const level = Number(rawSkill?.level);
      acc.push({
        id: matchedSkill.id,
        name: matchedSkill.names.en,
        names: matchedSkill.names,
        value: Number.isFinite(level) && level > 0 ? level : 1,
      });
      return acc;
    }, [])
    : [];

  const skillTriplet: AmuletSkill[] = [...mappedSkills.slice(0, 3)];
  while (skillTriplet.length < 3) {
    skillTriplet.push({value: 0});
  }

  const slotKey = String(charm.slots ?? '').trim();
  const mappedSlots = GAMECAT_SLOT_MAP[slotKey] || (slotKey in GAMECAT_SLOT_MAP ? GAMECAT_SLOT_MAP[slotKey] : '');

  if (mappedSkills.length === 0 && !mappedSlots) {
    return null;
  }

  return {
    name: deriveImportedAmuletName(skillTriplet),
    skills: skillTriplet,
    slots: mappedSlots,
  };
};

export const parseGameCatAmulets = (payload: unknown, availableSkills: Skill[]): Amulet[] => {
  if (!Array.isArray(payload)) {
    return [];
  }

  const skillByNormalizedName = new Map(
    availableSkills
      .filter((skill) => Boolean(skill?.names?.en))
      .map((skill) => [normalizeSkillName(skill.names.en), skill])
  );

  return (payload as GameCatCharm[])
    .map((charm) => {
      if (!charm || typeof charm !== 'object') return null;
      return mapCharmToAmulet(charm, skillByNormalizedName);
    })
    .filter((amulet): amulet is Amulet => Boolean(amulet));
};


