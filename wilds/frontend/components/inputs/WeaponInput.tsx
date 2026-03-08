import React, {useState} from 'react';
import {Weapon} from '../../model/Weapon';
import CustomAutocomplete from './CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';

interface WeaponInputProps {
  weapons: Weapon[];
  setWeapons: (weapons: Weapon[]) => void;
  availableWeapons: NamedEntity[];
}

function WeaponInput({weapons, setWeapons, availableWeapons}: WeaponInputProps) {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSelect = (value: string) => {
    const selected = availableWeapons.find((weapon) => weapon.id === value);
    if (selected && !weapons.some(weapon => weapon.id === value)) {
      setWeapons([...weapons, {id: selected.id, names: selected.names}]);
      setInput('');
    }
  };

  return (
    <CustomAutocomplete
      value={input}
      onChange={handleSelect}
      onInputChange={setInput}
      options={availableWeapons}
      placeholder={t.inputs.weapons}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default WeaponInput;
