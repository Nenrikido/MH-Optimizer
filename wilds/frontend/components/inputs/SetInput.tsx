import React, {useState} from 'react';
import {Autocomplete, Box, TextField} from '@mui/material';
import {Set as ArmorSet} from '../../model/Set';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';
import { Icon, isSkillIconKey } from '../../lib/icon';

interface SetInputProps {
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  availableSets: NamedEntity[];
}

function SetInput({sets, setSets, availableSets}: SetInputProps) {
  const [input, setInput] = useState('');
  const { t, language } = useI18n();

  const filteredOptions = availableSets.filter((option) => !sets.some(set => set.id === option.id));

  const handleSelect = (_: any, value: NamedEntity | null) => {
    if (value && !sets.some(setItem => setItem.id === value.id)) {
      const isGroup = value.icon === 'group';
      setSets([
        ...sets,
        {
          id: value.id,
          names: value.names,
          icon: value.icon,
          min_pieces: isGroup ? 3 : 2,
          is_group: isGroup,
        },
      ]);
    }
    setInput('');
  };

  return (
    <Autocomplete
      disableClearable
      inputValue={input}
      onInputChange={(_, newInputValue, reason) => {
        if (reason === 'input') {
          setInput(newInputValue);
          return;
        }
        if (reason === 'clear' || reason === 'reset') {
          setInput('');
        }
      }}
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
          placeholder={t.inputs.armor}
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

export default SetInput;
