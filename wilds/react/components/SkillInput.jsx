import React, { useState } from 'react';

// Ce composant gère l'input des skills avec suggestions/autocomplete
function SkillInput({ skills, setSkills }) {
  const [input, setInput] = useState('');
  // À remplacer par une vraie liste de suggestions (props ou contexte)
  const availableSkills = [
    "Master's Touch", 'Critical Boost', 'Counterstrike', 'Antivirus',
    'Adrenaline Rush', 'Weakness Exploit', 'Divine Blessing',
    'Constitution', 'Burst', 'Maximum Might', 'Quick Sheathe', 'Agitator'
  ];

  // Suggestions filtrées
  const suggestions = availableSkills.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !skills.includes(s)
  );

  const handleSelect = (skill) => {
    setSkills([...skills, skill]);
    setInput('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        className="form-control mb-3"
        placeholder="Which skills do you want to have ?"
        value={input}
        onChange={e => setInput(e.target.value)}
        autoComplete="off"
      />
      {input && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100" style={{ zIndex: 10 }}>
          {suggestions.map(skill => (
            <li
              key={skill}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(skill)}
              style={{ cursor: 'pointer' }}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SkillInput;

