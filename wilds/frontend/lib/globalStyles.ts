/**
 * Global CSS styles for the application.
 * Defines scrollbar styling for both webkit and Firefox browsers.
 */

export const globalStyles = {
  body: {
    scrollbarWidth: 'thin',
    scrollbarColor: '#495057 #212529',
  },
  'body::-webkit-scrollbar': {
    width: '12px',
    height: '12px',
  },
  'body::-webkit-scrollbar-track': {
    background: '#212529',
  },
  'body::-webkit-scrollbar-thumb': {
    background: '#495057',
    borderRadius: '6px',
    border: '2px solid #212529',
  },
  'body::-webkit-scrollbar-thumb:hover': {
    background: '#6c757d',
  },
  '*': {
    scrollbarWidth: 'thin',
    scrollbarColor: '#495057 #212529',
  },
  '*::-webkit-scrollbar': {
    width: '12px',
    height: '12px',
  },
  '*::-webkit-scrollbar-track': {
    background: '#212529',
  },
  '*::-webkit-scrollbar-thumb': {
    background: '#495057',
    borderRadius: '6px',
    border: '2px solid #212529',
  },
  '*::-webkit-scrollbar-thumb:hover': {
    background: '#6c757d',
  },
};
