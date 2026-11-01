import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { ThemeContext } from './ThemeContext.js';
import { applyResolvedTheme, getSystemIsDark, isTheme, resolveTheme } from './theme.js';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('knee.theme', 'system', {
    deserialize: (stored) => (isTheme(stored) ? stored : 'system'),
  });
  const [systemIsDark, setSystemIsDark] = useState(getSystemIsDark);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystemIsDark(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolved = resolveTheme(theme, systemIsDark);

  useEffect(() => {
    applyResolvedTheme(resolved);
  }, [resolved]);

  const value = useMemo(() => ({ theme, setTheme, resolved }), [theme, setTheme, resolved]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
