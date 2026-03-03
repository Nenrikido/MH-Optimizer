import React, { useState } from 'react';

function WeaponInput({ weapons, setWeapons, availableWeapons }) {
  const [input, setInput] = useState('');
  // Suggestions filtrées
  const suggestions = availableWeapons.filter(
    w => w.toLowerCase().includes(input.toLowerCase()) && !weapons.includes(w)
  );

  const handleSelect = (weapon) => {
    setWeapons([...weapons, weapon]);
    setInput('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="form-control mb-3"
        placeholder="On which weapon(s) ?"
        value={input}
        onChange={e => setInput(e.target.value)}
        autoComplete="off"
      />
      {input && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
          {suggestions.map(weapon => (
            <li
              key={weapon}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(weapon)}
              style={{ cursor: 'pointer' }}
            >
              {weapon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WeaponInput;

