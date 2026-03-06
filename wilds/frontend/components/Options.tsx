import React from 'react';
import type {Options as OptionsType} from '../model/Options';

interface OptionsProps {
  options: OptionsType;
  setOptions: (options: OptionsProps['options']) => void;
  onOptimize: () => void;
  loading: boolean;
  onSaveConfig: () => void;
}

function Options({ options, setOptions, onOptimize, loading, onSaveConfig }: OptionsProps) {
  return (
    <div>
      <h4>Nombre de résultats (max: 5)</h4>
      <input
        type="number"
        className="form-control mb-3"
        name="N"
        value={options.N}
        max={5}
        min={1}
        onChange={e => setOptions({ ...options, N: Math.max(1, Math.min(5, Number(e.target.value))) })}
      />
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="include_all_amulets"
          name="include_all_amulets"
          checked={options.include_all_amulets}
          onChange={e => setOptions({ ...options, include_all_amulets: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="include_all_amulets">
          Inclure tous les talismans générés à partir des compétences souhaitées
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="transcend"
          name="transcend"
          checked={options.transcend}
          onChange={e => setOptions({ ...options, transcend: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="transcend">
          Transcender toutes les armures (modifie les slots de décoration si rareté 5 ou 6)
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="include_gog_sets"
          name="include_gog_sets"
          checked={options.include_gog_sets}
          onChange={e => setOptions({ ...options, include_gog_sets: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="include_gog_sets">
          Inclure tous les sets possibles sur les armes Gogmazios améliorées
        </label>
      </div>
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-success" onClick={onOptimize} disabled={loading}>
          {loading ? 'Optimisation en cours...' : 'Optimiser'}
        </button>
        <button type="button" className="btn btn-primary" onClick={onSaveConfig}>Sauvegarder la configuration</button>
      </div>
    </div>
  );
}

export default Options;
