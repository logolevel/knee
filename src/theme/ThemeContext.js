import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  theme: 'system',
  resolved: 'dark',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
