import React, { useState } from 'react';
import { Skill } from '../model/Skill';

interface SkillInputProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  availableSkills: string[];
}

// Ce composant gère l'input des skills avec suggestions/autocomplete
function SkillInput({ skills, setSkills, availableSkills }: SkillInputProps) {
  const [input, setInput] = useState('');
  console.log(availableSkills);

  // Suggestions filtrées
  const suggestions = availableSkills.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !skills.some(skill => skill.name === s)
  );

  const handleSelect = (skill: string) => {
    setSkills([...skills, {name: skill, max_points: 3, weight: 10}]);
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
