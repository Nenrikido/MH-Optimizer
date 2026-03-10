import React, {useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {Set as ArmorSet} from '../../model/Set';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';

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
      setSets([...sets, {id: value.id, names: value.names, min_pieces: 2}]);
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
