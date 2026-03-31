import React from 'react';

const gearPositions = {
  'sword-shield': 0,
  'great-sword': 1,
  'long-sword': 2,
  'dual-blades': 3,
  lance: 4,
  gunlance: 5,
  hammer: 6,
  'hunting-horn': 7,
  'switch-axe': 8,
  'charge-blade': 9,
  'insect-glaive': 10,
  'light-bowgun': 11,
  'heavy-bowgun': 12,
  bow: 13,
  head: 14,
  chest: 15,
  arms: 16,
  waist: 17,
  legs: 18,
  amulet: 19,
} as const;

const skillsPositions = {
  attack: 0,
  affinity: 1,
  element: 2,
  handicraft: 3,
  ranged: 4,
  defense: 5,
  health: 6,
  stamina: 7,
  offense: 8,
  utility: 9,
  item: 10,
  gathering: 11,
  group: 12,
  set: 13,
} as const;

export type GearIconKey = keyof typeof gearPositions;
export type SkillIconKey = keyof typeof skillsPositions;

type IconType = 'gear' | 'skills';

const SPRITE_META: Record<IconType, { tileSize: number; columns: number; src: string }> = {
  gear: { tileSize: 64, columns: Object.keys(gearPositions).length, src: '/gear.png' },
  skills: { tileSize: 100, columns: Object.keys(skillsPositions).length, src: '/skills.png' },
};

export function isGearIconKey(value?: string | null): value is GearIconKey {
  return Boolean(value && value in gearPositions);
}

export function isSkillIconKey(value?: string | null): value is SkillIconKey {
  return Boolean(value && value in skillsPositions);
}

interface IconProps {
  type: IconType;
  iconKey: GearIconKey | SkillIconKey;
  size?: number;
  style?: React.CSSProperties;
}

export function Icon({ type, iconKey, size = 24, style }: IconProps) {
  const positions = type === 'gear' ? gearPositions : skillsPositions;
  const meta = SPRITE_META[type];
  const position = positions[iconKey as keyof typeof positions];
  const backgroundPositionX = -(position * size);

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${meta.src})`,
        backgroundPosition: `${backgroundPositionX}px 0`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${meta.columns * size}px ${size}px`,
        verticalAlign: 'middle',
        ...style,
      }}
    />
  );
}
