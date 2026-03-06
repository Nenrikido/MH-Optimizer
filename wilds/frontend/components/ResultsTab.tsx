import React from 'react';
import { Result } from '../model/Result';

interface ResultsTabProps {
  results: Result[] | string[];
  loading: boolean;
}

function ResultsTab({ results, loading }: ResultsTabProps) {
  return (
    <div>
      <h4>Optimization results</h4>
      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Optimizing ...
        </div>
      ) : results.length === 0 ? (
        <div>No result for now.</div>
      ) : (
        results.map((res, idx) =>
          typeof res === 'string' ? (
            <pre key={idx}>{res}</pre>
          ) : (
            <pre key={idx}>{JSON.stringify(res, null, 2)}</pre>
          )
        )
      )}
    </div>
  );
}

export default ResultsTab;
