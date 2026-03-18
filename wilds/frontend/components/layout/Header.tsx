import React from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import {Box, FormControl, IconButton, MenuItem, Select, Tooltip, Typography} from '@mui/material';
import type {SelectChangeEvent} from '@mui/material/Select';
import {useTheme} from '@mui/material/styles';
import {useI18n} from '../../lib/i18nContext';
import {LANGUAGE_FLAGS, LANGUAGE_LABELS, Language, SUPPORTED_LANGUAGES} from '../../lib/i18n';
import {useThemeMode} from '../../lib/themeModeContext';

function Header() {
  const {language, setLanguage, t} = useI18n();
  const {mode, toggleMode} = useThemeMode();
  const theme = useTheme();

  const handleLanguageChange = (e: SelectChangeEvent<Language>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <Box sx={{p: 2, height: 75, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2}}>
      <Box>
        <Typography sx={{fontSize: {xs: '1.25rem', md: '1.75rem'}, fontWeight: 600, mb: 0, color: 'text.primary'}}>
          {t.header.title}
        </Typography>
        <Typography sx={{fontSize: {xs: '0.75rem', md: '0.9rem'}, color: 'text.secondary'}}>
          {t.header.subtitle}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.25}}>
        <Tooltip title={mode === 'dark' ? t.common.switchToLightMode : t.common.switchToDarkMode}>
          <IconButton
            aria-label={mode === 'dark' ? t.common.switchToLightMode : t.common.switchToDarkMode}
            onClick={toggleMode}
            sx={{
              border: 1,
              borderColor: 'divider',
              color: 'text.secondary',
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {mode === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <FormControl size="small" sx={{minWidth: 140}}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            renderValue={(value) => (
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Box component="img"
                     src={LANGUAGE_FLAGS[value]}
                     alt=""
                     sx={{width: 18, height: 12, borderRadius: '2px'}} />
                <Box component="span" sx={{color: 'text.secondary', fontSize: '0.875rem'}}>
                  {LANGUAGE_LABELS[value]}
                </Box>
              </Box>
            )}
            sx={{
              color: 'text.secondary',
              backgroundColor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': {borderColor: 'divider'},
              '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'text.secondary'},
              '& .MuiSvgIcon-root': {color: 'text.secondary'}
            }}
          >
            {SUPPORTED_LANGUAGES.map((supportedLanguage) => (
              <MenuItem key={supportedLanguage} value={supportedLanguage}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Box component="img" src={LANGUAGE_FLAGS[supportedLanguage]} alt="" sx={{width: 18, height: 12, borderRadius: '2px'}} />
                  <Box component="span">{LANGUAGE_LABELS[supportedLanguage]}</Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Header;
