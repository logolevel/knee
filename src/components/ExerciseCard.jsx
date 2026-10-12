import { Repeat2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { ExerciseImage } from './ExerciseImage.jsx';
import { NumberField } from './NumberField.jsx';

export function ExerciseCard({ exercise, onToggle, onDurationChange }) {
  const { messages } = useI18n();
  const isRegular = exercise.type === 'regular';

  return (
    <article
      className={`rounded-3xl border p-4 transition ${
        exercise.isActive
          ? 'border-slate-700 bg-slate-900/80'
          : 'border-slate-800 bg-slate-950/60 opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        <label className="mt-0.5 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            className="h-5 w-5 accent-emerald-400"
            checked={exercise.isActive}
            onChange={(event) => onToggle(event.target.checked)}
          />
        </label>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-snug text-white">{exercise.title}</h3>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                isRegular
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              {isRegular ? messages.card.regular : messages.card.tabata}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">{exercise.description}</p>

          <ExerciseImage id={exercise.id} alt={exercise.title} className="mt-3 w-1/3" />

          {isRegular ? (
            <div className="mt-4 space-y-3">
              {exercise.hasLegSwap ? (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-2.5 py-1 text-[11px] font-medium text-sky-300">
                  <Repeat2 size={12} />
                  {messages.card.legSwap}
                </div>
              ) : null}

              <NumberField
                label={messages.card.duration}
                value={exercise.durationMinutes ?? 3}
                min={1}
                max={60}
                step={1}
                suffix={exercise.hasLegSwap ? messages.card.minutesPerLeg : messages.card.minutes}
                onChange={onDurationChange}
              />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
