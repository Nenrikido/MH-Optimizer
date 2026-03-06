import React, { useState } from 'react';
import { Set as ArmorSet } from '../model/Set';

interface SetInputProps {
  sets: ArmorSet[];
  setSets: (sets: ArmorSet[]) => void;
  availableSets: string[];
}

function SetInput({ sets, setSets, availableSets }: SetInputProps) {
  const [input, setInput] = useState('');
  // Suggestions filtrées
  const suggestions = availableSets.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !sets.some(set => set.name === s)
  );

  const handleSelect = (set: string) => {
    setSets([...sets, {name: set, min_pieces: 2}]);
    setInput('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="form-control mb-3"
        placeholder="With which set(s) ?"
        value={input}
        onChange={e => setInput(e.target.value)}
        autoComplete="off"
      />
      {input && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
          {suggestions.map(set => (
            <li
              key={set}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(set)}
              style={{ cursor: 'pointer' }}
            >
              {set}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SetInput;
