import React, {useState} from 'react';
import {Autocomplete, Box, TextField} from '@mui/material';
import {Weapon} from '../../model/Weapon';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';
import { GearIconKey, Icon, isGearIconKey } from '../../lib/icon';

interface WeaponInputProps {
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  availableWeapons: NamedEntity[];
}

function WeaponInput({weapons, setWeapons, availableWeapons}: WeaponInputProps) {
  const [input, setInput] = useState('');
  const { t, language } = useI18n();

  const filteredOptions = availableWeapons.filter((option) => !weapons.some(weapon => weapon.id === option.id));

  const handleSelect = (_: any, value: NamedEntity | null) => {
    if (value && !weapons.some(weapon => weapon.id === value.id)) {
      setWeapons([...weapons, {id: value.id, names: value.names, gear_key: value.gear_key}]);
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
          {isGearIconKey(option.gear_key) ? <Icon type="gear" iconKey={option.gear_key as GearIconKey} /> : null}
          <span>{option.names[language] || option.names.en}</span>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t.inputs.weapons}
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

export default WeaponInput;
