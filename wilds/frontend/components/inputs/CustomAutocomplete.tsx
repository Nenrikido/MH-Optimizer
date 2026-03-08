import React from 'react';
import { Autocomplete, TextField, SxProps, Theme } from '@mui/material';
import { NamedEntity } from '../../model/Localized';
import { useI18n } from '../../lib/i18nContext';

interface SkillAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (value: string) => void;
  options: NamedEntity[];
  placeholder?: string;
  label?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  filterOutValues?: string[];
  disabled?: boolean;
}

function CustomAutocomplete({
  value,
  onChange,
  onInputChange,
  options,
  placeholder,
  label,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  sx,
  filterOutValues = [],
  disabled = false,
}: SkillAutocompleteProps) {
  const { language } = useI18n();

  const filteredOptions = options.filter((option) => !filterOutValues.includes(option.id));
  const valueOption = filteredOptions.find((option) => option.id === value) || null;

  return (
    <Autocomplete
      options={filteredOptions}
      value={valueOption}
      onInputChange={(event, newInputValue) => {
        onInputChange?.(newInputValue);
      }}
      onChange={(event, newValue) => {
        onChange(newValue?.id || '');
      }}
      getOptionLabel={(option) => option.names[language] || option.names.en}
      isOptionEqualToValue={(option, selectedValue) => option.id === selectedValue.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          label={label}
          variant={variant}
          size={size}
          fullWidth
          sx={sx}
        />
      )}
      disabled={disabled}
      fullWidth
      sx={{flex: fullWidth ? 1 : 'auto', ...sx}}
    />
  );
}

export default CustomAutocomplete;
