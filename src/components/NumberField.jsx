import { Minus, Plus } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { formatDuration } from '../utils/formatTime.js';

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 3600,
  step = 1,
  suffix,
  layout = 'stack',
  display = 'number',
}) {
  const { messages } = useI18n();
  const snap = (next) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (step <= 1) {
      return Math.round(clamped);
    }
    return Math.min(max, Math.max(min, Math.round(clamped / step) * step));
  };
  const isSubgrid = layout === 'subgrid';
  const formatted = display === 'duration' ? formatDuration(value, messages.units) : null;

  return (
    <label
      className={
        isSubgrid
          ? 'grid min-w-0 row-span-3 grid-rows-subgrid gap-y-1.5'
          : 'flex flex-col gap-1.5'
      }
    >
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-muted ${
          isSubgrid ? 'self-end' : ''
        }`}
      >
        {label}
      </span>
      <div className="flex items-center overflow-hidden rounded-2xl border border-line-strong bg-card-2">
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center text-muted transition hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          onClick={() => onChange(snap(value - step))}
          aria-label={messages.field.decrease(label)}
        >
          <Minus size={18} />
        </button>
        {formatted ? (
          <span className="flex h-12 min-w-0 flex-1 items-center justify-center px-1 text-center text-[13px] font-semibold leading-tight text-heading">
            {formatted}
          </span>
        ) : (
          <input
            type="number"
            inputMode="numeric"
            className="h-12 w-full bg-transparent text-center font-mono text-lg text-heading outline-none"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              const next = Number(event.target.value);
              onChange(Number.isFinite(next) ? snap(next) : min);
            }}
          />
        )}
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center text-muted transition hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          onClick={() => onChange(snap(value + step))}
          aria-label={messages.field.increase(label)}
        >
          <Plus size={18} />
        </button>
      </div>
      <span className="text-[11px] text-faint">{suffix || '\u00a0'}</span>
    </label>
  );
}
