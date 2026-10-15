import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext.js';
import { ExerciseImage } from './ExerciseImage.jsx';

const PHASE_THEMES = {
  warmup: {
    background: 'from-amber-600 via-orange-600 to-amber-800',
    chip: 'bg-white/15 text-amber-50',
  },
  'tabata-work': {
    background: 'from-rose-600 via-red-600 to-rose-900',
    chip: 'bg-white/15 text-rose-50',
  },
  'tabata-rest': {
    background: 'from-sky-600 via-blue-700 to-slate-900',
    chip: 'bg-white/15 text-sky-50',
  },
  regular: {
    background: 'from-emerald-600 via-teal-700 to-emerald-950',
    chip: 'bg-white/15 text-emerald-50',
  },
  transition: {
    background: 'from-indigo-600 via-slate-800 to-slate-950',
    chip: 'bg-white/15 text-indigo-50',
  },
};

export function ActiveTimerScreen({ timer, onStop }) {
  const { messages } = useI18n();
  const t = messages.timer;
  const { phase, remaining, formattedTime, progress, isPaused } = timer;
  const theme = PHASE_THEMES[phase?.kind] ?? PHASE_THEMES.regular;
  const isUrgent = remaining > 0 && remaining <= 3;
  const isTransition = phase?.kind === 'transition';
  const previewExerciseId = isTransition ? phase.nextExerciseId : phase?.exerciseId;
  const previewExerciseTitle = isTransition
    ? phase.nextExerciseTitle
    : phase?.exerciseTitle;

  const title = isTransition
    ? t.next(phase.nextExerciseTitle)
    : phase?.exerciseTitle ?? phase?.label ?? t.workoutFallback;

  const description = isTransition
    ? phase.nextExerciseDescription || t.restBetween
    : phase?.exerciseDescription ?? '';

  const handleStop = () => {
    if (window.confirm(t.confirmStop)) {
      onStop();
    }
  };

  return (
    <div
      className={`flex min-h-dvh select-none flex-col bg-gradient-to-b ${theme.background} text-white transition-colors duration-500`}
    >
      <div className="h-1.5 w-full bg-black/20">
        <div
          className="h-full bg-white/80 transition-[width] duration-200 ease-linear"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${theme.chip}`}>
              {phase?.label ?? t.phaseFallback}
            </p>
            <p className="mt-3 text-sm text-white/75">
              {phase?.kind === 'warmup'
                ? t.getReady
                : t.exerciseOf(timer.exerciseNumber, timer.totalExercises)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleStop}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-white/90"
            aria-label={t.stop}
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p
            className={`font-mono text-[22vw] font-bold tabular-nums leading-none tracking-tight sm:text-8xl md:text-9xl ${
              isUrgent ? 'animate-pulse' : ''
            }`}
          >
            {formattedTime}
          </p>

          {timer.isTabata ? (
            <p className="mt-5 text-lg font-semibold text-white/90">
              {t.setOf(phase.set, phase.totalSets)}
            </p>
          ) : null}

          {phase?.kind === 'regular' && phase.totalLegs === 2 ? (
            <p className="mt-5 text-lg font-semibold text-white/90">
              {t.legOf(phase.leg, phase.totalLegs)}
            </p>
          ) : null}

          <h2 className="mt-6 max-w-md text-2xl font-bold leading-tight">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{description}</p>
          ) : null}

          {previewExerciseId ? (
            <ExerciseImage
              id={previewExerciseId}
              alt={previewExerciseTitle ?? title}
              eager
              className="mt-4 h-52 w-auto max-w-full"
            />
          ) : null}

          <p
            className={`mt-3 mb-4 h-7 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
              isPaused ? 'bg-black/25 text-white/90' : 'invisible'
            }`}
          >
            {t.paused}
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <ControlButton
              label={t.prevExercise}
              disabled={!timer.canPrevExercise}
              onClick={timer.prevExercise}
            >
              <SkipIcon>
                <ChevronsLeft size={26} />
              </SkipIcon>
            </ControlButton>

            <button
              type="button"
              onClick={timer.togglePause}
              className="flex h-20 flex-col items-center justify-center rounded-3xl bg-white text-slate-950 shadow-xl"
              aria-label={isPaused ? t.resume : t.pause}
            >
              {isPaused ? <Play size={32} fill="currentColor" /> : <Pause size={32} fill="currentColor" />}
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wide">
                {isPaused ? t.resumeShort : t.pause}
              </span>
            </button>

            <ControlButton
              label={t.nextExercise}
              disabled={!timer.canNextExercise}
              onClick={timer.nextExercise}
            >
              <SkipIcon>
                <ChevronsRight size={26} />
              </SkipIcon>
            </ControlButton>
          </div>

          {timer.isTabata ? (
            <div className="grid grid-cols-2 gap-3">
              <ControlButton
                label={t.prevSet}
                disabled={!timer.canPrevSet}
                onClick={timer.prevSet}
              >
                <ChevronLeft size={22} />
              </ControlButton>
              <ControlButton
                label={t.nextSet}
                disabled={!timer.canNextSet}
                onClick={timer.nextSet}
              >
                <ChevronRight size={22} />
              </ControlButton>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleStop}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-black/25 text-sm font-semibold text-white/85"
          >
            {t.stop}
          </button>
        </div>
      </div>
    </div>
  );
}

function ControlButton({ children, label, disabled, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex h-20 flex-col items-center justify-center rounded-3xl bg-black/20 text-white disabled:opacity-35"
    >
      {children}
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide">{label}</span>
    </button>
  );
}

function SkipIcon({ children }) {
  return <span className="flex items-center justify-center">{children}</span>;
}
