import React, {useState} from 'react';
import {Skill} from '../model/Skill';
import CustomAutocomplete from './CustomAutocomplete';

interface SkillInputProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  availableSkills: string[];
}

// This component handles skill input with suggestions/autocomplete
function SkillInput({skills, setSkills, availableSkills}: SkillInputProps) {
  const [input, setInput] = useState('');

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
      placeholder="Which skills do you want to have ?"
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default SkillInput;
