import React, {useState} from 'react';
import {Set as ArmorSet} from '../../model/Set';
import CustomAutocomplete from './CustomAutocomplete';
import { useI18n } from '../../lib/i18nContext';
import { NamedEntity } from '../../model/Localized';

interface SetInputProps {
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  availableSets: NamedEntity[];
}

function SetInput({sets, setSets, availableSets}: SetInputProps) {
  const [input, setInput] = useState('');
  const { t } = useI18n();

  const handleSelect = (value: string) => {
    const selected = availableSets.find((setItem) => setItem.id === value);
    if (selected && !sets.some(setItem => setItem.id === value)) {
      setSets([...sets, {id: selected.id, names: selected.names, min_pieces: 2}]);
      setInput('');
    }
  };

  return (
    <CustomAutocomplete
      value={input}
      onChange={handleSelect}
      onInputChange={setInput}
      options={availableSets}
      filterOutValues={sets.map(s => s.id)}
      placeholder={t.inputs.armor}
      fullWidth
      size="small"
      sx={{mb: 1}}
    />
  );
}

export default SetInput;
