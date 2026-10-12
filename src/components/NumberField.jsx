import { Minus, Plus } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 3600,
  step = 1,
  suffix,
}) {
  const { messages } = useI18n();
  const clamp = (next) => Math.min(max, Math.max(min, next));

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
      <div className="flex items-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80">
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center text-slate-300 transition hover:bg-slate-800 active:bg-slate-700"
          onClick={() => onChange(clamp(value - step))}
          aria-label={messages.field.decrease(label)}
        >
          <Minus size={18} />
        </button>
        <input
          type="number"
          inputMode="numeric"
          className="h-12 w-full bg-transparent text-center font-mono text-lg text-white outline-none"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(Number.isFinite(next) ? clamp(Math.round(next)) : min);
          }}
        />
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center text-slate-300 transition hover:bg-slate-800 active:bg-slate-700"
          onClick={() => onChange(clamp(value + step))}
          aria-label={messages.field.increase(label)}
        >
          <Plus size={18} />
        </button>
      </div>
      {suffix ? <span className="text-[11px] text-slate-500">{suffix}</span> : null}
    </label>
  );
}
