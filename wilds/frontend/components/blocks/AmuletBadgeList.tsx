import React from 'react';
import {Box} from '@mui/material';
import AmuletBadge from './AmuletBadge';
import {Amulet} from '../../model/Amulet';
import { Skill } from '../../model/Skill';

interface AmuletBadgeListProps {
  amulets: Amulet[];
  setAmulets: React.Dispatch<React.SetStateAction<Amulet[]>>;
  availableSkills: Skill[];
}

function AmuletBadgeList({amulets, setAmulets, availableSkills}: AmuletBadgeListProps) {
  const getSkillLabel = (skillId?: string, fallbackName?: string) => {
    if (!skillId) return fallbackName || '';
    const found = availableSkills.find((s) => s.id === skillId);
    return found?.names?.en || fallbackName || skillId;
  };

  const deriveAmuletName = (amulet: Amulet) => {
    const skillParts = (amulet.skills || [])
      .filter((s) => Boolean(s?.id))
      .map((s) => `${getSkillLabel(s.id, s.name)} Lv${s.value || 1}`);
    const slotsPart = amulet.slots ? ` [${amulet.slots}]` : '';
    if (skillParts.length === 0) {
      return slotsPart ? `Custom Amulet${slotsPart}` : 'Custom Amulet';
    }
    return `${skillParts.join(' + ')}${slotsPart}`;
  };

  const normalizeAmulet = (a: Amulet) => {
    let skills = Array.isArray(a.skills) ? [...a.skills] : [];
    while (skills.length < 3) skills.push({value: 0});
    skills = skills.slice(0, 3);
    const normalized = {...a, skills};
    return {...normalized, name: deriveAmuletName(normalized)};
  };

  const handleRemove = (index: number) => {
    setAmulets(prev => prev.filter((_, i) => i !== index));
  };

  const handleSkillRemove = (amuletIdx: number, skillIdx: number) => {
    setAmulets(prev => prev.map((a, i) => {
      if (i !== amuletIdx) return a;
      let skills = Array.isArray(a.skills) ? [...a.skills] : [];
      while (skills.length < 3) skills.push({ value: 0 });
      skills = skills.slice(0, 3);
      skills[skillIdx] = { value: 0 };
      return normalizeAmulet({...a, skills});
    }));
  };

  const handleSlotRemove = (index: number) => {
    setAmulets(prev => prev.map((a, i) => i === index ? normalizeAmulet({...a, slots: ''}) : a));
  };

  const handleSkillChange = (
    amuletIdx: number,
    skillIdx: number,
    field: string,
    value: string | number | { en: string; fr: string } | undefined
  ) => {
    setAmulets(prev => prev.map((a, i) => {
      if (i !== amuletIdx) return a;
      let skills = Array.isArray(a.skills) ? [...a.skills] : [];
      while (skills.length < 3) skills.push({ value: 0 });
      skills = skills.slice(0, 3);
      if (!skills[skillIdx] || typeof skills[skillIdx] !== 'object' || skills[skillIdx] === null) {
        skills[skillIdx] = { value: 0 };
      }
      skills[skillIdx] = {...skills[skillIdx], [field]: value};
      return normalizeAmulet({...a, skills});
    }));
  };

  const handleSlotChange = (index: number, value: string) => {
    setAmulets(prev => prev.map((a, i) => i === index ? normalizeAmulet({...a, slots: value}) : a));
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      {amulets.map((amulet, idx) => (
        <AmuletBadge
          key={idx}
          amulet={normalizeAmulet(amulet)}
          index={idx}
          onRemove={handleRemove}
          onSkillRemove={handleSkillRemove}
          onSlotRemove={handleSlotRemove}
          onSkillChange={handleSkillChange}
          onSlotChange={handleSlotChange}
          availableSkills={availableSkills}
        />
      ))}
    </Box>
  );
}

export default AmuletBadgeList;
