import { useMemo } from 'react';
import { ChevronDown, Clock, Globe, Play } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { SUPPORTED_LANGUAGES, translations } from '../i18n/translations.js';
import { getTotalBreakdown } from '../utils/buildPhases';
import { formatDuration } from '../utils/formatTime';
import { NumberField } from './NumberField.jsx';
import { ExerciseCard } from './ExerciseCard.jsx';

export function ConfigurationScreen({
  settings,
  exercises,
  onSettingsChange,
  onExerciseChange,
  onStart,
}) {
  const { language, setLanguage, messages } = useI18n();
  const t = messages.config;

  const activeCount = exercises.filter((exercise) => exercise.isActive).length;
  const canStart = activeCount > 0;

  const breakdown = useMemo(() => getTotalBreakdown(settings, exercises), [settings, exercises]);
  const totalSeconds =
    breakdown.warmup + breakdown.tabata + breakdown.regular + breakdown.rest;
  const breakdownRows = [
    [t.breakdownWarmup, breakdown.warmup],
    [t.breakdownTabata, breakdown.tabata],
    [t.breakdownRegular, breakdown.regular],
    [t.breakdownRest, breakdown.rest],
  ];

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-xl px-4 pb-36 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <header className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            {t.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{t.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.subtitle}</p>
        </header>

        <section className="mb-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {t.totalTime}
              </p>
              <p className="mt-0.5 text-2xl font-bold tabular-nums text-white">
                {formatDuration(totalSeconds, messages.units)}
              </p>
            </div>
          </div>

          <details className="group mt-3">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-emerald-200/80 [&::-webkit-details-marker]:hidden">
              {t.breakdownToggle}
              <ChevronDown
                size={14}
                className="shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <dl className="mt-2 space-y-1.5 text-sm">
              {breakdownRows.map(([label, seconds]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="text-slate-400">{label}</dt>
                  <dd className="font-medium tabular-nums text-slate-100">
                    {formatDuration(seconds, messages.units)}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </section>

        <section className="mb-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            {t.globalSettings}
          </h2>
          <details className="group mb-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300 [&::-webkit-details-marker]:hidden">
              {t.warmup}
              <ChevronDown
                size={16}
                className="shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="px-3 pb-3">
              <p className="text-base font-semibold text-white">{messages.warmupExercise.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {messages.warmupExercise.description}
              </p>
            </div>
          </details>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label={t.warmupTime}
              suffix={t.minutes}
              value={Math.round((settings.warmupTime ?? 0) / 60)}
              min={0}
              max={30}
              onChange={(warmupMinutes) => onSettingsChange({ warmupTime: warmupMinutes * 60 })}
            />
            <NumberField
              label={t.tabataWork}
              suffix={t.seconds}
              value={settings.tabataWorkTime}
              min={1}
              max={300}
              onChange={(tabataWorkTime) => onSettingsChange({ tabataWorkTime })}
            />
            <NumberField
              label={t.tabataRest}
              suffix={t.seconds}
              value={settings.tabataRestTime}
              min={0}
              max={180}
              onChange={(tabataRestTime) => onSettingsChange({ tabataRestTime })}
            />
            <NumberField
              label={t.sets}
              suffix={t.setsHint}
              value={settings.tabataSets}
              min={1}
              max={50}
              onChange={(tabataSets) => onSettingsChange({ tabataSets })}
            />
            <div className="col-span-2">
              <NumberField
                label={t.restBetween}
                suffix={t.seconds}
                value={settings.restBetweenExercises}
                min={0}
                max={600}
                onChange={(restBetweenExercises) => onSettingsChange({ restBetweenExercises })}
              />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-4">
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              <Globe size={14} />
              {t.language}
            </span>
            <div className="relative">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-slate-700 bg-slate-900/80 px-4 pr-11 text-base text-white outline-none focus:border-emerald-500"
              >
                {SUPPORTED_LANGUAGES.map((code) => (
                  <option key={code} value={code}>
                    {translations[code].nativeName}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </label>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
              {t.exercises}
            </h2>
            <p className="text-xs text-slate-500">{t.active(activeCount)}</p>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onToggle={(isActive) => onExerciseChange(exercise.id, { isActive })}
                onDurationChange={(durationMinutes) =>
                  onExerciseChange(exercise.id, { durationMinutes })
                }
              />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-8">
        <div className="mx-auto w-full max-w-xl">
          <button
            type="button"
            disabled={!canStart}
            onClick={onStart}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-emerald-500 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
          >
            <Play size={22} fill="currentColor" />
            {t.start}
          </button>
          {!canStart ? (
            <p className="mt-2 text-center text-xs text-rose-300">{t.enableOne}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
