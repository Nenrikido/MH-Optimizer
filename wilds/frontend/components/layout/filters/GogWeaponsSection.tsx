import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useI18n } from '../../../lib/i18nContext';
import { Icon, isSkillIconKey } from '../../../lib/icon';
import { GogWeaponsSectionProps } from './types';

function GogWeaponsSection({
  gogSetFilter,
  setGogSetFilter,
  gogGroupFilter,
  setGogGroupFilter,
  availableSets,
  availableGroups,
}: GogWeaponsSectionProps) {
  const { t, language } = useI18n();

  const selectedGogSet = availableSets.find((s) => s.id === gogSetFilter) || null;
  const selectedGogGroup = availableGroups.find((g) => g.id === gogGroupFilter) || null;

  if (availableSets.length === 0 && availableGroups.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd' }}>
        {t.filters.gogWeapons.title}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#adb5bd', mb: 1 }}>
          {t.filters.gogWeapons.setBonus}
        </Typography>
        <Autocomplete
          disablePortal
          size="small"
          fullWidth
          options={availableSets}
          value={selectedGogSet}
          onChange={(_, newValue) => setGogSetFilter(newValue?.id || '')}
          getOptionLabel={(option) => option.names[language] || option.names.en}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isSkillIconKey(option.icon) ? <Icon type="skills" iconKey={option.icon} /> : null}
              <span>{option.names[language] || option.names.en}</span>
            </Box>
          )}
          renderInput={(params) => <TextField {...params} placeholder={t.filters.gogWeapons.setBonusAutocomplete} />}
        />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#adb5bd', mb: 1 }}>
          {t.filters.gogWeapons.groupBonus}
        </Typography>
        <Autocomplete
          disablePortal
          size="small"
          fullWidth
          options={availableGroups}
          value={selectedGogGroup}
          onChange={(_, newValue) => setGogGroupFilter(newValue?.id || '')}
          getOptionLabel={(option) => option.names[language] || option.names.en}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isSkillIconKey(option.icon) ? <Icon type="skills" iconKey={option.icon} /> : null}
              <span>{option.names[language] || option.names.en}</span>
            </Box>
          )}
          renderInput={(params) => <TextField {...params} placeholder={t.filters.gogWeapons.groupBonusAutocomplete} />}
        />
      </Box>
    </Box>
  );
}

export default GogWeaponsSection;

