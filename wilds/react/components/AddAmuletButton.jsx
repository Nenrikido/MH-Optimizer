import React from 'react';

function AddAmuletButton({ onAdd }) {
  return (
    <button type="button" className="btn btn-secondary mb-2" onClick={onAdd}>
      + Ajouter un talisman
    </button>
  );
}

export default AddAmuletButton;

