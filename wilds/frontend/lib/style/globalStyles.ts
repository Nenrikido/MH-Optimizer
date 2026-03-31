/**
 * Global CSS styles for the application.
 * Defines scrollbar styling for both webkit and Firefox browsers.
 */

import { PaletteMode } from '@mui/material/styles';

export function createGlobalStyles(mode: PaletteMode) {
  const track = mode === 'dark' ? '#212529' : '#f4f1ea';
  const thumb = mode === 'dark' ? '#495057' : '#c1b4a3';
  const thumbHover = mode === 'dark' ? '#6c757d' : '#a99683';

  return {
    body: {
      scrollbarWidth: 'thin',
      scrollbarColor: `${thumb} ${track}`,
    },
    'body::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    'body::-webkit-scrollbar-track': {
      background: track,
    },
    'body::-webkit-scrollbar-thumb': {
      background: thumb,
      borderRadius: '6px',
      border: `2px solid ${track}`,
    },
    'body::-webkit-scrollbar-thumb:hover': {
      background: thumbHover,
    },
    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: `${thumb} ${track}`,
    },
    '*::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    '*::-webkit-scrollbar-track': {
      background: track,
    },
    '*::-webkit-scrollbar-thumb': {
      background: thumb,
      borderRadius: '6px',
      border: `2px solid ${track}`,
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: thumbHover,
    },
  };
}
