import React, {useState} from 'react';
import {Autocomplete, Box, TextField} from '@mui/material';
import {Skill} from '../../model/Skill';
import { useI18n } from '../../lib/i18nContext';
import { Icon, isSkillIconKey } from '../../lib/icon';

interface SkillInputProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  availableSkills: Skill[];
}

// This component handles skill input with suggestions/autocomplete
function SkillInput({skills, setSkills, availableSkills}: SkillInputProps) {
  const [input, setInput] = useState('');
  const { t, language } = useI18n();

  const filteredOptions = availableSkills.filter((option) => !skills.some(skill => skill.id === option.id));

  const handleSelect = (_: any, value: Skill | null) => {
    if (value && !skills.some(skill => skill.id === value.id)) {
      setSkills([...skills, {id: value.id, names: value.names, icon: value.icon, max_points: 3, weight: 10}]);
      setInput('');
    }
  };

  return (
    <Autocomplete
      inputValue={input}
      onInputChange={(_, newInputValue) => setInput(newInputValue)}
      onChange={handleSelect}
      options={filteredOptions}
      getOptionLabel={(option) => option.names[language] || option.names.en}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isSkillIconKey(option.icon) ? <Icon type="skills" iconKey={option.icon} /> : null}
          <span>{option.names[language] || option.names.en}</span>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t.inputs.skills}
          size="small"
          fullWidth
        />
      )}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default SkillInput;
