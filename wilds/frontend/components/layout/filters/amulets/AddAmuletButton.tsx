import React from 'react';
import { Button } from '@mui/material';
import { useI18n } from '../../../../lib/i18nContext';

interface AddAmuletButtonProps {
  onAdd: () => void;
}

function AddAmuletButton({ onAdd }: AddAmuletButtonProps) {
  const { t } = useI18n();

  return (
    <Button variant="contained" color="secondary" onClick={onAdd} sx={{ mt: 1 }}>
      + {t.filters.amulets.addAmulet}
    </Button>
  );
}

export default AddAmuletButton;

