import { Monitor, Moon, Sun } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { useTheme } from '../theme/ThemeContext.js';
import { THEME_OPTIONS } from '../theme/theme.js';

const THEME_ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const { messages } = useI18n();
  const labels = {
    system: messages.config.themeSystem,
    light: messages.config.themeLight,
    dark: messages.config.themeDark,
  };

  return (
    <div
      role="radiogroup"
      aria-label={messages.config.theme}
      className="grid grid-cols-3 gap-1 rounded-2xl border border-line-strong bg-card-2 p-1"
    >
      {THEME_OPTIONS.map((option) => {
        const selected = theme === option;
        const Icon = THEME_ICONS[option];
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setTheme(option)}
            className={`flex h-12 items-center justify-center gap-1.5 rounded-xl px-2 text-[12px] font-semibold transition ${
              selected
                ? 'bg-page text-heading shadow-sm'
                : 'text-muted hover:text-heading'
            }`}
          >
            <Icon size={15} />
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}
