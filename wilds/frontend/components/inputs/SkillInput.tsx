import React, {useState} from 'react';
import {Skill} from '../../model/Skill';
import CustomAutocomplete from './CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';

interface SkillInputProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  availableSkills: string[];
}

// This component handles skill input with suggestions/autocomplete
function SkillInput({skills, setSkills, availableSkills}: SkillInputProps) {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSelect = (value: string) => {
    if (value && !skills.some(skill => skill.name === value)) {
      setSkills([...skills, {name: value, max_points: 3, weight: 10}]);
      setInput('');
    }
  };

  return (
    <CustomAutocomplete
      value={input}
      onChange={handleSelect}
      onInputChange={setInput}
      availableSkills={availableSkills}
      filterOutValues={skills.map(s => s.name)}
      placeholder={t.inputs.skills}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default SkillInput;
