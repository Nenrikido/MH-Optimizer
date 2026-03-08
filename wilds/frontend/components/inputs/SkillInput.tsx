import React, {useState} from 'react';
import {Skill} from '../../model/Skill';
import CustomAutocomplete from './CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';

interface SkillInputProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  availableSkills: NamedEntity[];
}

// This component handles skill input with suggestions/autocomplete
function SkillInput({skills, setSkills, availableSkills}: SkillInputProps) {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSelect = (value: string) => {
    const selected = availableSkills.find((skill) => skill.id === value);
    if (selected && !skills.some(skill => skill.id === value)) {
      setSkills([...skills, {id: selected.id, names: selected.names, max_points: 3, weight: 10}]);
      setInput('');
    }
  };

  return (
    <CustomAutocomplete
      value={input}
      onChange={handleSelect}
      onInputChange={setInput}
      options={availableSkills}
      filterOutValues={skills.map(s => s.id)}
      placeholder={t.inputs.skills}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default SkillInput;
