import React from 'react';

function ResultsTab({ results, loading }) {
  return (
    <div>
      <h4>Résultats de l'optimisation</h4>
      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Optimisation en cours...
        </div>
      ) : results.length === 0 ? (
        <div>Aucun résultat pour le moment.</div>
      ) : (
        results.map((res, idx) => <pre key={idx}>{res}</pre>)
      )}
    </div>
  );
}

export default ResultsTab;
