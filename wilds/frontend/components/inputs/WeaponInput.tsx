import React, {useState} from 'react';
import {Weapon} from '../../model/Weapon';
import CustomAutocomplete from './CustomAutocomplete';

interface WeaponInputProps {
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  availableWeapons: string[];
}

function WeaponInput({weapons, setWeapons, availableWeapons}: WeaponInputProps) {
  const [input, setInput] = useState('');

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
      placeholder="On which weapon(s) ?"
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default WeaponInput;
