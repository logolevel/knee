import { useMemo } from 'react';
import { ChevronDown, Clock, Gauge, Globe, Play, SunMoon } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { SUPPORTED_LANGUAGES, translations } from '../i18n/translations.js';
import { getMatchingDifficulty } from '../data/defaults.js';
import { getTotalBreakdown } from '../utils/buildPhases';
import { formatDuration } from '../utils/formatTime';
import { DifficultySwitch } from './DifficultySwitch.jsx';
import { NumberField } from './NumberField.jsx';
import { ExerciseCard } from './ExerciseCard.jsx';
import { ExerciseImage } from './ExerciseImage.jsx';
import { ThemeSwitch } from './ThemeSwitch.jsx';

export function ConfigurationScreen({
  settings,
  exercises,
  onSettingsChange,
  onExerciseChange,
  onDifficultyChange,
  onStart,
}) {
  const { language, setLanguage, messages } = useI18n();
  const t = messages.config;

  const activeCount = exercises.filter((exercise) => exercise.isActive).length;
  const canStart = activeCount > 0;

  const breakdown = useMemo(() => getTotalBreakdown(settings, exercises), [settings, exercises]);
  const totalSeconds =
    breakdown.warmup +
    breakdown.tabata +
    breakdown.regular +
    breakdown.rest +
    breakdown.stretch;
  const breakdownRows = [
    [t.breakdownWarmup, breakdown.warmup],
    [t.breakdownTabata, breakdown.tabata],
    [t.breakdownRegular, breakdown.regular],
    [t.breakdownRest, breakdown.rest],
    [t.breakdownStretch, breakdown.stretch],
  ];

  return (
    <div className="min-h-dvh bg-page text-page-fg">
      <div className="mx-auto w-full max-w-xl px-4 pb-36 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <header className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
            {t.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">{t.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t.subtitle}</p>
        </header>

        <section className="mb-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                {t.totalTime}
              </p>
              <p className="mt-0.5 text-2xl font-bold tabular-nums text-heading">
                {formatDuration(totalSeconds, messages.units)}
              </p>
            </div>
          </div>

          <details className="group mt-3">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-200/80 [&::-webkit-details-marker]:hidden">
              {t.breakdownToggle}
              <ChevronDown
                size={14}
                className="shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <dl className="mt-2 space-y-1.5 text-sm">
              {breakdownRows.map(([label, seconds]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-medium tabular-nums text-page-fg">
                    {formatDuration(seconds, messages.units)}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </section>

        <section className="mb-4 rounded-3xl border border-line bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            {t.exerciseSettings}
          </h2>
          <div className="mb-4 flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <Gauge size={14} />
              {t.difficulty}
            </span>
            <DifficultySwitch
              value={getMatchingDifficulty(settings, exercises)}
              onChange={onDifficultyChange}
            />
          </div>
          <BookendExerciseDetails
            label={t.warmup}
            title={messages.warmupExercise.title}
            description={messages.warmupExercise.description}
            imageId="1"
            accent="amber"
          />
          <BookendExerciseDetails
            label={t.stretch}
            title={messages.stretchExercise.title}
            description={messages.stretchExercise.description}
            imageId="12"
            accent="violet"
          />

          <div className="grid grid-cols-2 gap-x-3 gap-y-3">
            <NumberField
              layout="subgrid"
              display="duration"
              label={t.warmupTime}
              value={settings.warmupTime}
              min={0}
              max={1800}
              step={15}
              onChange={(warmupTime) => onSettingsChange({ warmupTime })}
            />
            <NumberField
              layout="subgrid"
              display="duration"
              label={t.stretchTime}
              value={settings.stretchTime}
              min={0}
              max={1800}
              step={15}
              onChange={(stretchTime) => onSettingsChange({ stretchTime })}
            />
            <NumberField
              layout="subgrid"
              display="duration"
              label={t.tabataWork}
              value={settings.tabataWorkTime}
              min={1}
              max={300}
              onChange={(tabataWorkTime) => onSettingsChange({ tabataWorkTime })}
            />
            <NumberField
              layout="subgrid"
              display="duration"
              label={t.tabataRest}
              value={settings.tabataRestTime}
              min={0}
              max={180}
              onChange={(tabataRestTime) => onSettingsChange({ tabataRestTime })}
            />
            <NumberField
              layout="subgrid"
              label={t.sets}
              suffix={t.setsHint}
              value={settings.tabataSets}
              min={1}
              max={50}
              onChange={(tabataSets) => onSettingsChange({ tabataSets })}
            />
            <NumberField
              layout="subgrid"
              display="duration"
              label={t.restBetween}
              value={settings.restBetweenExercises}
              min={0}
              max={600}
              onChange={(restBetweenExercises) => onSettingsChange({ restBetweenExercises })}
            />
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-line bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            {t.appSettings}
          </h2>
          <label className="mb-4 flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <Globe size={14} />
              {t.language}
            </span>
            <div className="relative">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-line-strong bg-card-2 px-4 pr-11 text-base text-heading outline-none focus:border-emerald-500"
              >
                {SUPPORTED_LANGUAGES.map((code) => (
                  <option key={code} value={code}>
                    {translations[code].nativeName}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <SunMoon size={14} />
              {t.theme}
            </span>
            <ThemeSwitch />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              {t.exercises}
            </h2>
            <p className="text-xs text-faint">{t.active(activeCount)}</p>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onToggle={(isActive) => onExerciseChange(exercise.id, { isActive })}
                onDurationChange={(durationSeconds) =>
                  onExerciseChange(exercise.id, { durationSeconds })
                }
              />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-page to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-8">
        <div className="mx-auto w-full max-w-xl">
          <button
            type="button"
            disabled={!canStart}
            onClick={onStart}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-3xl bg-emerald-500 text-lg font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
          >
            <Play size={22} fill="currentColor" />
            {t.start}
          </button>
          {!canStart ? (
            <p className="mt-2 text-center text-xs text-rose-600 dark:text-rose-300">{t.enableOne}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const BOOKEND_ACCENTS = {
  amber: {
    box: 'border-amber-500/20 bg-amber-500/5',
    label: 'text-amber-700 dark:text-amber-300',
  },
  violet: {
    box: 'border-violet-500/20 bg-violet-500/5',
    label: 'text-violet-700 dark:text-violet-300',
  },
};

function BookendExerciseDetails({ label, title, description, imageId, accent }) {
  const colors = BOOKEND_ACCENTS[accent];

  return (
    <details className={`group mb-4 rounded-2xl border ${colors.box}`}>
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] ${colors.label} [&::-webkit-details-marker]:hidden`}
      >
        {label}
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="px-3 pb-3">
        <p className="text-base font-semibold text-heading">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
        <ExerciseImage id={imageId} alt={title} className="mt-3 w-1/3" zoomable />
      </div>
    </details>
  );
}
