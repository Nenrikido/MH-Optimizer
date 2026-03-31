import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { PaletteMode } from '@mui/material/styles';

interface ThemeModeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
}

const STORAGE_KEY = 'mh_opti_theme_mode';
const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

/**
 * Theme mode provider used to store and persist the current light/dark preference.
 */
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((currentMode) => {
          const nextMode: PaletteMode = currentMode === 'dark' ? 'light' : 'dark';
          localStorage.setItem(STORAGE_KEY, nextMode);
          return nextMode;
        });
      },
    }),
    [mode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

/**
 * Hook exposing the current theme mode and toggle action.
 */
export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }

  return context;
}

