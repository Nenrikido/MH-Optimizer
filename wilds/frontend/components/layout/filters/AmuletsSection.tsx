import React from 'react';
import { Box, Typography } from '@mui/material';
import { useI18n } from '../../../lib/i18nContext';
import { AmuletsSectionProps } from './types';
import AmuletBadgeList from './amulets/AmuletBadgeList';
import AddAmuletButton from './amulets/AddAmuletButton';

function AmuletsSection({ amulets, setAmulets, availableSkills }: AmuletsSectionProps) {
  const { t } = useI18n();

  const handleAddAmulet = () => {
    setAmulets((prev) => ([
      ...prev,
      { name: 'Custom Amulet', skills: [{ value: 0 }, { value: 0 }, { value: 0 }], slots: '' },
    ]));
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd' }}>
        {t.filters.amulets.title}
      </Typography>
      <AmuletBadgeList amulets={amulets} setAmulets={setAmulets} availableSkills={availableSkills} />
      <AddAmuletButton onAdd={handleAddAmulet} />
    </Box>
  );
}

export default AmuletsSection;

