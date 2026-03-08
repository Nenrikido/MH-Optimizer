import React, {useState} from 'react';
import {Set as ArmorSet} from '../../model/Set';
import CustomAutocomplete from './CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';

interface SetInputProps {
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  availableSets: string[];
}

function SetInput({sets, setSets, availableSets}: SetInputProps) {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSelect = (value: string) => {
    if (value && !sets.some(set => set.name === value)) {
      setSets([...sets, {name: value, min_pieces: 2}]);
      setInput('');
    }
  };

  return (
    <CustomAutocomplete
      value={input}
      onChange={handleSelect}
      onInputChange={setInput}
      availableSkills={availableSets}
      placeholder={t.inputs.armor}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default SetInput;
