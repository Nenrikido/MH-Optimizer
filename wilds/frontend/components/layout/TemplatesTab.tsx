import React from 'react';
import {Box, Typography} from '@mui/material';
import { useI18n } from '../../lib/i18nContext';

function TemplatesTab() {
  const { t } = useI18n();

  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1, color: '#adb5bd' }}>{t.tabs.templates} (WIP)</Typography>
      <Typography sx={{ fontSize: '0.85rem', color: '#adb5bd' }}>Skill & set templates feature coming soon.</Typography>
    </Box>
  );
}

export default TemplatesTab;
