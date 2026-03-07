import React from 'react';
import {Box, Paper, Typography} from '@mui/material';
import BuildCard from './BuildCard';
import {Result} from '../model/Result';

interface ResultsTabProps {
  results: Result[] | string[];
  loading: boolean;
}

function ResultsTab({results, loading}: ResultsTabProps) {
  return (
    <Box>
      <Typography variant="body1" sx={{fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd'}}>
        Optimization results
      </Typography>
      {loading ? (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
          <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
          Optimizing ...
        </Box>
      ) : results.length === 0 ? (
        <Typography>No result for now.</Typography>
      ) : (
        results.map((res, idx) =>
          typeof res === 'string' ? (
            <Paper key={idx} sx={{p: 2, mb: 2, whiteSpace: 'pre-wrap'}}>
              <Typography component="pre" sx={{fontSize: '0.85rem'}}>{res}</Typography>
            </Paper>
          ) : (
            <BuildCard key={res.id || idx} build={res} />
          )
        )
      )}
    </Box>
  );
}

export default ResultsTab;


