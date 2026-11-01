export const THEME_OPTIONS = ['system', 'light', 'dark'];

export function isTheme(value) {
  return THEME_OPTIONS.includes(value);
}

export function getSystemIsDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolveTheme(theme, systemIsDark) {
  if (theme === 'light') {
    return 'light';
  }
  if (theme === 'dark') {
    return 'dark';
  }
  return systemIsDark ? 'dark' : 'light';
}

export function applyResolvedTheme(resolved) {
  const root = document.documentElement;
  const isDark = resolved === 'dark';
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = resolved;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute('content', isDark ? '#020617' : '#f8fafc');
  }
}
