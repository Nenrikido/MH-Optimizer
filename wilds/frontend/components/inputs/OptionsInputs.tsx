import React from 'react';
import {Box, Button, Checkbox, FormControlLabel} from '@mui/material';
import type {Options} from '../../model/Options';

interface OptionsProps {
  options: Options;
  setOptions: (options: OptionsProps['options']) => void;
  onOptimize: () => void;
  loading: boolean;
  onSaveConfig: () => void;
}

function OptionsInputs({options, setOptions, onOptimize, loading, onSaveConfig}: OptionsProps) {
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
          label="Include all generated amulets from desired skills (unchecking this will include only farmable amulets and amulets chosen from the filters tab)"
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
          label="Transcend all armors (this changes their decoration slots if their rarity is 5 or 6)"
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
          label="Include all possible sets on Gogmazios upgraded weapons"
          sx={{ mb: 2, display: 'block' }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="success" onClick={onOptimize} disabled={loading} size="small">
            {loading ? 'Optimizing...' : 'Optimize'}
          </Button>
          <Button variant="contained" color="primary" onClick={onSaveConfig} size="small">
            Save Configuration
          </Button>
        </Box>
      </Box>
  );
}

export default OptionsInputs;
