import React, { useState } from 'react';

function SetInput({ sets, setSets, availableSets }) {
  const [input, setInput] = useState('');
  // Suggestions filtrées
  const suggestions = availableSets.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !sets.includes(s)
  );

  const handleSelect = (set) => {
    setSets([...sets, set]);
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

