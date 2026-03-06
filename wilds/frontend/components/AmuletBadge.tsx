import React from 'react';
import { Amulet } from '../model/Amulet';
import { Skill } from '../model/Skill';

interface AmuletBadgeProps {
  amulet: Amulet;
  onRemove: (index: number) => void;
  onSkillRemove: (amuletIdx: number, skillIdx: number) => void;
  onSlotRemove: (index: number) => void;
  onSkillChange: (amuletIdx: number, skillIdx: number, field: string, value: string | number) => void;
  onSlotChange: (index: number, value: string) => void;
  index: number;
  availableSkills: string[];
}

function AmuletBadge({ amulet, onRemove, onSkillRemove, onSlotRemove, onSkillChange, onSlotChange, index, availableSkills }: AmuletBadgeProps) {
  return (
    <div className="badge text-start bg-secondary d-flex gap-4 justify-content-between align-items-center w-100 mb-2">
      <div className="d-flex flex-column w-75">
        {[1, 2, 3].map(i => (
          <div className="input-group mb-1" key={i}>
            <input
              name={`skill_name_${i}_amulet_${index}`}
              className="form-control"
              placeholder={`Skill ${i}`}
              value={amulet.skills[i - 1]?.name || ''}
              onChange={e => onSkillChange(index, i - 1, 'name', e.target.value)}
              list={`skills-list-${index}-${i}`}
            />
            <datalist id={`skills-list-${index}-${i}`}>
              {availableSkills.map(skill => (
                <option value={skill} key={skill} />
              ))}
            </datalist>
            <input
              className="form-control"
              type="number"
              name={`skill_value_${i}_amulet_${index}`}
              style={{ width: '3em', flex: '0 1 auto' }}
              min={1}
              max={4}
              title="Skill value"
              value={amulet.skills[i - 1]?.value || ''}
              onChange={e => onSkillChange(index, i - 1, 'value', e.target.value)}
            />
            <button type="button" className="btn btn-dark btn-outline-secondary px-2" onClick={() => onSkillRemove(index, i - 1)}>🗙</button>
          </div>
        ))}
      </div>
      <div className="input-group w-auto">
        <select
          className="form-select"
          aria-label="Slots"
          name={`slots_amulet_${index}`}
          value={amulet.slots}
          onChange={e => onSlotChange(index, e.target.value)}
        >
          <option value="">Slots</option>
          <option value="1-0-0">1-0-0</option>
          <option value="1-1-0">1-1-0</option>
          <option value="2-0-0">2-0-0</option>
          <option value="2-1-0">2-1-0</option>
          <option value="3-0-0">3-0-0</option>
          <option value="W1-0-0">W1-0-0</option>
          <option value="W1-1-0">W1-1-0</option>
          <option value="W1-1-1">W1-1-1</option>
        </select>
        <button type="button" className="btn btn-dark btn-outline-secondary px-2" onClick={() => onSlotRemove(index)}>🗙</button>
      </div>
      <button type="button" className="btn-close btn-close-white close-amulet-badge" aria-label="Remove" onClick={() => onRemove(index)}></button>
    </div>
  );
}

export default AmuletBadge;
