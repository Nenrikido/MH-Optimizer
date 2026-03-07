import React from 'react';
import {Button} from '@mui/material';

interface AddAmuletButtonProps {
  onAdd: () => void;
}

function AddAmuletButton({onAdd}: AddAmuletButtonProps) {
  return (
      <Button variant="contained" color="secondary" onClick={onAdd} sx={{mt: 1}}>
        + Add an amulet
      </Button>
  );
}

export default AddAmuletButton;
