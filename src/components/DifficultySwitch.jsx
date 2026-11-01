import { useI18n } from '../i18n/I18nContext.js';
import { DIFFICULTY_LEVELS } from '../data/defaults.js';

export function DifficultySwitch({ value, onChange }) {
  const { messages } = useI18n();
  const labels = {
    easy: messages.config.difficultyEasy,
    medium: messages.config.difficultyMedium,
    hard: messages.config.difficultyHard,
  };

  return (
    <div
      role="radiogroup"
      aria-label={messages.config.difficulty}
      className="grid grid-cols-3 gap-1 rounded-2xl border border-line-strong bg-card-2 p-1"
    >
      {DIFFICULTY_LEVELS.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={`flex h-12 items-center justify-center rounded-xl px-2 text-[12px] font-semibold transition ${
              selected
                ? 'bg-page text-heading shadow-sm'
                : 'text-muted hover:text-heading'
            }`}
          >
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}
