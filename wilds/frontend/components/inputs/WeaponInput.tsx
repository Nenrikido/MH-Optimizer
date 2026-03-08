import React, {useState} from 'react';
import {Weapon} from '../../model/Weapon';
import CustomAutocomplete from './CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';

interface WeaponInputProps {
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  availableWeapons: string[];
}

function WeaponInput({weapons, setWeapons, availableWeapons}: WeaponInputProps) {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSelect = (value: string) => {
    if (value && !weapons.some(weapon => weapon.name === value)) {
      setWeapons([...weapons, {name: value}]);
      setInput('');
    }
  };

  return (
    <CustomAutocomplete
      value={input}
      onChange={handleSelect}
      onInputChange={setInput}
      availableSkills={availableWeapons}
      placeholder={t.inputs.weapons}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default WeaponInput;
