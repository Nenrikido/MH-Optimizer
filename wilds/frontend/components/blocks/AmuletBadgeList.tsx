import React from 'react';
import {Box} from '@mui/material';
import AmuletBadge from './AmuletBadge';
import {Amulet} from '../../model/Amulet';
import { NamedEntity } from '../../model/Localized';

interface AmuletBadgeListProps {
  amulets: Amulet[];
  setAmulets: (amulets: Amulet[]) => void;
  availableSkills: NamedEntity[];
}

function AmuletBadgeList({amulets, setAmulets, availableSkills}: AmuletBadgeListProps) {
  const handleRemove = (index: number) => {
    setAmulets(amulets.filter((_, i) => i !== index));
  };

  const handleSkillRemove = (amuletIdx: number, skillIdx: number) => {
    setAmulets(amulets.map((a, i) =>
      i === amuletIdx ? {...a, skills: a.skills.filter((_, j) => j !== skillIdx)} : a
    ));
  };

  const handleSlotRemove = (index: number) => {
    setAmulets(amulets.map((a, i) => i === index ? {...a, slots: ''} : a));
  };

  const handleSkillChange = (
    amuletIdx: number,
    skillIdx: number,
    field: string,
    value: string | number | { en: string; fr: string } | undefined
  ) => {
    setAmulets(amulets.map((a, i) => {
      if (i !== amuletIdx) return a;
      const skills = [...a.skills];
      if (!skills[skillIdx]) skills[skillIdx] = {id: '', name: '', value: 0};
      skills[skillIdx] = {...skills[skillIdx], [field]: value};
      return {...a, skills};
    }));
  };

  const handleSlotChange = (index: number, value: string) => {
    setAmulets(amulets.map((a, i) => i === index ? {...a, slots: value} : a));
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      {amulets.map((amulet, idx) => (
        <AmuletBadge
          key={idx}
          amulet={amulet}
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
