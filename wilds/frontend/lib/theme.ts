import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d6efd',
    },
    secondary: {
      main: '#6c757d',
    },
    success: {
      main: '#198754',
    },
    background: {
      default: '#212529',
      paper: '#343a40',
    },
    text: {
      primary: '#adb5bd',
      secondary: '#adb5bd',
    },
    divider: '#495057',
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
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#212529',
            color: '#f8f9fa',
            fontSize: '0.875rem',
          },
          '& .MuiOutlinedInput-input': {
            color: '#f8f9fa',
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#343a40',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#343a40',
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#343a40',
        },
      },
    },
  },
});

