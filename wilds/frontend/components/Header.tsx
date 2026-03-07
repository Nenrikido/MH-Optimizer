import React from 'react';
import {Box, Typography} from '@mui/material';

function Header() {
  return (
    <Box sx={{ p: 2, height: 75 }}>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 600, mb: 0, color: '#f8f9fa' }}>
        MH Wilds Build Optimizer (Beta)
      </Typography>
      <Typography sx={{ fontSize: '0.9rem', color: '#adb5bd' }}>
        from @nenrikido on discord
      </Typography>
    </Box>
  );
}

export default Header;
