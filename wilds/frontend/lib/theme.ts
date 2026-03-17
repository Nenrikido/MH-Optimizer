/**
 * Material-UI theme configuration.
 * Generates light and dark variants with shared typography and component overrides.
 */

import { createTheme, PaletteMode } from '@mui/material/styles';

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === 'dark';

  const backgroundDefault = isDark ? '#212529' : '#f1ece2';
  const backgroundPaper = isDark ? '#343a40' : '#f8f4ec';
  const textPrimary = isDark ? '#adb5bd' : '#474038';
  const textSecondary = isDark ? '#adb5bd' : '#5e564d';
  const divider = isDark ? '#495057' : '#7e7061';
  const inputBackground = isDark ? '#212529' : '#f1ece2';
  const hoverBorder = isDark ? '#6c757d' : '#5d5145';
  const selectedSurface = isDark ? '#495057' : '#dfd2c2';
  const hoverSurface = isDark ? '#3a4045' : '#e8ddd0';

  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      mode,
      primary: {
        main: isDark ? '#0d6efd' : '#85745c',
      },
      secondary: {
        main: isDark ? '#6c757d' : '#948675',
      },
      success: {
        main: '#198754',
      },
      action: {
        selected: selectedSurface,
        hover: hoverSurface,
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
      divider,
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            textTransform: 'none',
            fontWeight: 500,
          },
          outlined: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root': {
              color: textSecondary,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: inputBackground,
            color: textPrimary,
            fontSize: '0.875rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: divider,
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: hoverBorder,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: hoverBorder,
              borderWidth: '1px',
            },
          },
          input: {
            color: textPrimary,
            fontSize: '0.875rem',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            backgroundColor: backgroundPaper,
            color: textPrimary,
          },
          listbox: {
            color: textPrimary,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundPaper,
            '&.Mui-expanded': {
              margin: 0,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundPaper,
          },
        },
      },
    },
  });
}
