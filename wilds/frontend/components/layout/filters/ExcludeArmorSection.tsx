import React, { useState } from 'react';
import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material';
import { useI18n } from '../../../lib/i18nContext';
import { GearIconKey, Icon, isGearIconKey } from '../../../lib/icon';
import { ExcludeArmorSectionProps } from './types';

function ExcludeArmorSection({ excludedArmorItems, setExcludedArmorItems, availableArmorItems }: ExcludeArmorSectionProps) {
  const { t, language } = useI18n();
  const [exclusionInput, setExclusionInput] = useState('');

  const availableArmorForExclusion = availableArmorItems.filter((item) => !excludedArmorItems.includes(item.id));

  const handleSelectArmorItem = (_: any, value: any | null) => {
    if (value && !excludedArmorItems.includes(value.id)) {
      setExcludedArmorItems([...excludedArmorItems, value.id]);
      setExclusionInput('');
    }
  };

  const handleRemoveArmorItem = (itemId: string) => {
    setExcludedArmorItems(excludedArmorItems.filter((id) => id !== itemId));
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1.5, color: '#adb5bd' }}>
        {t.filters.excludeArmorParts.title}
      </Typography>

      <Autocomplete
        disableClearable
        inputValue={exclusionInput}
        onInputChange={(_, newInputValue, reason) => {
          if (reason === 'input') {
            setExclusionInput(newInputValue);
            return;
          }
          if (reason === 'clear' || reason === 'reset') {
            setExclusionInput('');
          }
        }}
        onChange={handleSelectArmorItem}
        options={availableArmorForExclusion}
        getOptionLabel={(option) => option.names[language] || option.names.en}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isGearIconKey(option.gear_key) ? <Icon type="gear" iconKey={option.gear_key as GearIconKey} /> : null}
            <span>{option.names[language] || option.names.en}</span>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} placeholder={t.filters.excludeArmorParts.placeholder} size="small" fullWidth />
        )}
        fullWidth
        size="small"
        sx={{ mb: 1.5 }}
      />

      {excludedArmorItems.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {excludedArmorItems.map((itemId) => {
            const item = availableArmorItems.find((a) => a.id === itemId);
            const label = item ? (item.names[language] || item.names.en) : itemId;
            return (
              <Chip
                key={itemId}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    {item && isGearIconKey(item.gear_key) ? <Icon type="gear" iconKey={item.gear_key as GearIconKey} /> : null}
                    <span>{label}</span>
                  </Box>
                }
                onDelete={() => handleRemoveArmorItem(itemId)}
                size="small"
                variant="outlined"
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default ExcludeArmorSection;

