import React from 'react';
import {Box, Paper, Typography} from '@mui/material';
import BuildCard from '../blocks/BuildCard';
import {Result} from '../../model/Result';
import { useI18n } from '../../lib/i18nContext';

interface ResultsTabProps {
  results: Result[] | string[];
  loading: boolean;
}

function ResultsTab({results, loading}: ResultsTabProps) {
  const { t } = useI18n();

  return (
    <Box>
      <Typography variant="body1" sx={{fontSize: '1.5rem', fontWeight: 600, mb: 1, color: '#adb5bd'}}>
        {t.results.title}
      </Typography>
      {loading ? (
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
          <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
          {t.common.loading}
        </Box>
      ) : results.length === 0 ? (
        <Typography>{t.results.noResults}</Typography>
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


