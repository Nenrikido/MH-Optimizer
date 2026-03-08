import React from 'react';
import {Box, FormControl, MenuItem, Select, Typography} from '@mui/material';
import type {SelectChangeEvent} from '@mui/material/Select';
import {useI18n} from '../../lib/i18nContext';
import {Language} from "../../lib/i18n";

function Header() {
  const {language, setLanguage, t} = useI18n();

  const handleLanguageChange = (e: SelectChangeEvent<Language>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <Box sx={{p: 2, height: 75, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box>
        <Typography sx={{fontSize: {xs: '1.25rem', md: '1.75rem'}, fontWeight: 600, mb: 0, color: '#f8f9fa'}}>
          {t.header.title}
        </Typography>
        <Typography sx={{fontSize: {xs: '0.75rem', md: '0.9rem'}, color: '#adb5bd'}}>
          {t.header.subtitle}
        </Typography>
      </Box>
      <FormControl size="small" sx={{minWidth: 128}}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          renderValue={(value) => (
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box component="img" src={value === 'en' ? '/flags/gb.svg' : '/flags/fr.svg'} alt=""
                   sx={{width: 18, height: 12, borderRadius: '2px'}} />
              <Box component="span" sx={{color: '#adb5bd', fontSize: '0.875rem'}}>
                {value === 'en' ? 'English' : 'Francais'}
              </Box>
            </Box>
          )}
          sx={{
            color: '#adb5bd',
            '& .MuiOutlinedInput-notchedOutline': {borderColor: '#495057'},
            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#6c757d'},
            '& .MuiSvgIcon-root': {color: '#adb5bd'}
          }}
        >
          <MenuItem value="en">
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box component="img" src="/flags/gb.svg" alt="" sx={{width: 18, height: 12, borderRadius: '2px'}} />
              <Box component="span">English</Box>
            </Box>
          </MenuItem>
          <MenuItem value="fr">
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Box component="img" src="/flags/fr.svg" alt="" sx={{width: 18, height: 12, borderRadius: '2px'}} />
              <Box component="span">Francais</Box>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Header;
