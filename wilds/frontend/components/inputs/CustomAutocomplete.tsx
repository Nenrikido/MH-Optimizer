import React from 'react';
import { Autocomplete, TextField, SxProps, Theme } from '@mui/material';

interface SkillAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (value: string) => void;
  availableSkills: string[];
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
  availableSkills,
  placeholder,
  label,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  sx,
  filterOutValues = [],
  disabled = false,
}: SkillAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState(value);

  const handleInputChange = (event: any, newInputValue: string) => {
    setInputValue(newInputValue);
    onInputChange?.(newInputValue);
  };

  return (
    <Autocomplete
      options={availableSkills.filter(s => !filterOutValues.includes(s))}
      value={value || null}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={(event, newValue) => {
        onChange(newValue || '');
        setInputValue(newValue || '');
      }}
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
      freeSolo
      disabled={disabled}
      fullWidth
      sx={{flex: fullWidth ? 1 : 'auto', ...sx}}
    />
  );
}

export default CustomAutocomplete;
