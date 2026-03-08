import React from 'react';
import {Box, Button, Checkbox, FormControlLabel} from '@mui/material';
import type {Options} from '../../model/Options';
import { useI18n } from '../../lib/i18nContext';

interface OptionsProps {
  options: Options;
  setOptions: (options: OptionsProps['options']) => void;
  onOptimize: () => void;
  loading: boolean;
  onSaveConfig: () => void;
}

function OptionsInputs({options, setOptions, onOptimize, loading, onSaveConfig}: OptionsProps) {
  const { t } = useI18n();

  return (
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={options.include_all_amulets}
              onChange={e => setOptions({ ...options, include_all_amulets: e.target.checked })}
              size="small"
            />
          }
          label={t.options.includeAllAmulets}
          sx={{ mb: 1, display: 'block' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.transcend}
              onChange={e => setOptions({ ...options, transcend: e.target.checked })}
              size="small"
            />
          }
          label={t.options.transcend}
          sx={{ mb: 1, display: 'block' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.include_gog_sets}
              onChange={e => setOptions({ ...options, include_gog_sets: e.target.checked })}
              size="small"
            />
          }
          label={t.options.includeGogSets}
          sx={{ mb: 2, display: 'block' }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="success" onClick={onOptimize} disabled={loading} size="small">
            {loading ? t.common.loading : t.form.optimize}
          </Button>
          <Button variant="contained" color="primary" onClick={onSaveConfig} size="small">
            {t.form.save}
          </Button>
        </Box>
      </Box>
  );
}

export default OptionsInputs;
