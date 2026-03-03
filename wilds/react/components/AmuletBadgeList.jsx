import React from 'react';
import AmuletBadge from './AmuletBadge';

function AmuletBadgeList({ amulets, setAmulets, availableSkills }) {
  const handleRemove = (index) => {
    setAmulets(amulets.filter((_, i) => i !== index));
  };
  const handleSkillRemove = (amuletIdx, skillIdx) => {
    setAmulets(amulets.map((a, i) =>
      i === amuletIdx ? { ...a, skills: a.skills.filter((_, j) => j !== skillIdx) } : a
    ));
  };
  const handleSlotRemove = (index) => {
    setAmulets(amulets.map((a, i) => i === index ? { ...a, slots: '' } : a));
  };
  const handleSkillChange = (amuletIdx, skillIdx, field, value) => {
    setAmulets(amulets.map((a, i) => {
      if (i !== amuletIdx) return a;
      const skills = [...a.skills];
      if (!skills[skillIdx]) skills[skillIdx] = { name: '', value: '' };
      skills[skillIdx] = { ...skills[skillIdx], [field]: value };
      return { ...a, skills };
    }));
  };
  const handleSlotChange = (index, value) => {
    setAmulets(amulets.map((a, i) => i === index ? { ...a, slots: value } : a));
  };
  return (
    <div className="mb-3 d-flex flex-column gap-2">
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
    </div>
  );
}

export default AmuletBadgeList;

