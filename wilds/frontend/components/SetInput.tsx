import React, {useState} from 'react';
import {Set as ArmorSet} from '../model/Set';
import CustomAutocomplete from './CustomAutocomplete';

interface SetInputProps {
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  availableSets: string[];
}

function SetInput({sets, setSets, availableSets}: SetInputProps) {
  const [input, setInput] = useState('');

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
      placeholder="With which set(s) ?"
      fullWidth
      size="small"
      sx={{mb: 2}}
    />
  );
}

export default SetInput;
