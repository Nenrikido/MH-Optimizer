import React from 'react';

// Affiche une liste de badges (skills, sets, weapons)
function BadgeList({ items, setItems, type }) {
  const handleRemove = (item) => {
    setItems(items.filter(i => i !== item));
  };

  return (
    <div className="mb-3 d-flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span key={item} className="badge bg-secondary d-flex align-items-center gap-2">
          {item}
          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            aria-label="Remove"
            style={{ fontSize: '0.7em' }}
            onClick={() => handleRemove(item)}
          />
        </span>
      ))}
    </div>
  );
}

export default BadgeList;

