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
import { isDifficulty } from '../data/defaults.js';
import { useTheme } from '../theme/ThemeContext.js';
import { ExerciseImage } from './ExerciseImage.jsx';

const DIFFICULTY_THEMES = {
  easy: {
    light: {
      background: 'from-emerald-100 via-green-200 to-emerald-200',
      fg: 'text-emerald-950',
      muted: 'text-emerald-900/70',
      chip: 'bg-emerald-800/10 text-emerald-900',
      control: 'bg-emerald-950/10 text-emerald-950',
      overlay: 'bg-emerald-950/10 text-emerald-950',
      progressTrack: 'bg-emerald-950/10',
      progress: 'bg-emerald-800',
      pause: 'bg-white text-emerald-950 shadow-xl',
    },
    dark: {
      background: 'from-emerald-800 via-emerald-900 to-emerald-950',
      fg: 'text-white',
      muted: 'text-white/75',
      chip: 'bg-white/15 text-emerald-50',
      control: 'bg-black/20 text-white',
      overlay: 'bg-black/20 text-white',
      progressTrack: 'bg-black/20',
      progress: 'bg-white/80',
      pause: 'bg-white text-slate-950 shadow-xl',
    },
  },
  medium: {
    light: {
      background: 'from-orange-100 via-amber-200 to-orange-200',
      fg: 'text-orange-950',
      muted: 'text-orange-900/70',
      chip: 'bg-orange-800/10 text-orange-900',
      control: 'bg-orange-950/10 text-orange-950',
      overlay: 'bg-orange-950/10 text-orange-950',
      progressTrack: 'bg-orange-950/10',
      progress: 'bg-orange-800',
      pause: 'bg-white text-orange-950 shadow-xl',
    },
    dark: {
      background: 'from-orange-800 via-amber-900 to-orange-950',
      fg: 'text-white',
      muted: 'text-white/75',
      chip: 'bg-white/15 text-orange-50',
      control: 'bg-black/20 text-white',
      overlay: 'bg-black/20 text-white',
      progressTrack: 'bg-black/20',
      progress: 'bg-white/80',
      pause: 'bg-white text-slate-950 shadow-xl',
    },
  },
  hard: {
    light: {
      background: 'from-rose-100 via-red-200 to-rose-200',
      fg: 'text-rose-950',
      muted: 'text-rose-900/70',
      chip: 'bg-rose-800/10 text-rose-900',
      control: 'bg-rose-950/10 text-rose-950',
      overlay: 'bg-rose-950/10 text-rose-950',
      progressTrack: 'bg-rose-950/10',
      progress: 'bg-rose-800',
      pause: 'bg-white text-rose-950 shadow-xl',
    },
    dark: {
      background: 'from-red-800 via-rose-900 to-red-950',
      fg: 'text-white',
      muted: 'text-white/75',
      chip: 'bg-white/15 text-rose-50',
      control: 'bg-black/20 text-white',
      overlay: 'bg-black/20 text-white',
      progressTrack: 'bg-black/20',
      progress: 'bg-white/80',
      pause: 'bg-white text-slate-950 shadow-xl',
    },
  },
};

const BOOKEND_THEMES = {
  warmup: {
    light: {
      background: 'from-amber-100 via-orange-100 to-amber-200',
      fg: 'text-amber-950',
      muted: 'text-amber-900/70',
      chip: 'bg-amber-800/10 text-amber-900',
      control: 'bg-amber-950/10 text-amber-950',
      overlay: 'bg-amber-950/10 text-amber-950',
      progressTrack: 'bg-amber-950/10',
      progress: 'bg-amber-800',
      pause: 'bg-white text-amber-950 shadow-xl',
    },
    dark: {
      background: 'from-amber-600 via-orange-700 to-amber-900',
      fg: 'text-white',
      muted: 'text-white/75',
      chip: 'bg-white/15 text-amber-50',
      control: 'bg-black/20 text-white',
      overlay: 'bg-black/20 text-white',
      progressTrack: 'bg-black/20',
      progress: 'bg-white/80',
      pause: 'bg-white text-slate-950 shadow-xl',
    },
  },
  stretch: {
    light: {
      background: 'from-violet-100 via-purple-200 to-violet-200',
      fg: 'text-violet-950',
      muted: 'text-violet-900/70',
      chip: 'bg-violet-800/10 text-violet-900',
      control: 'bg-violet-950/10 text-violet-950',
      overlay: 'bg-violet-950/10 text-violet-950',
      progressTrack: 'bg-violet-950/10',
      progress: 'bg-violet-800',
      pause: 'bg-white text-violet-950 shadow-xl',
    },
    dark: {
      background: 'from-violet-600 via-purple-800 to-violet-950',
      fg: 'text-white',
      muted: 'text-white/75',
      chip: 'bg-white/15 text-violet-50',
      control: 'bg-black/20 text-white',
      overlay: 'bg-black/20 text-white',
      progressTrack: 'bg-black/20',
      progress: 'bg-white/80',
      pause: 'bg-white text-slate-950 shadow-xl',
    },
  },
};

function getPhaseTheme(phaseKind, difficulty, colorMode) {
  const mode = colorMode === 'light' ? 'light' : 'dark';
  if (phaseKind === 'warmup' || phaseKind === 'stretch') {
    return BOOKEND_THEMES[phaseKind][mode];
  }

  const level = isDifficulty(difficulty) ? difficulty : 'easy';
  return DIFFICULTY_THEMES[level][mode];
}

export function ActiveTimerScreen({ timer, onStop, difficulty = 'easy' }) {
  const { messages } = useI18n();
  const { resolved } = useTheme();
  const t = messages.timer;
  const { phase, remaining, formattedTime, progress, isPaused } = timer;
  const theme = getPhaseTheme(phase?.kind, difficulty, resolved);
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
      className={`flex min-h-dvh select-none flex-col bg-gradient-to-b ${theme.background} ${theme.fg} transition-colors duration-500`}
    >
      <div className={`h-1.5 w-full ${theme.progressTrack}`}>
        <div
          className={`h-full ${theme.progress} transition-[width] duration-200 ease-linear`}
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))]">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${theme.chip}`}>
              {phase?.label ?? t.phaseFallback}
            </p>
            <p className={`mt-3 text-sm ${theme.muted}`}>
              {phase?.kind === 'warmup'
                ? t.getReady
                : phase?.kind === 'stretch'
                  ? t.coolDown
                  : t.exerciseOf(timer.exerciseNumber, timer.totalExercises)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleStop}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.overlay}`}
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
            <p className={`mt-5 text-lg font-semibold ${theme.muted}`}>
              {t.setOf(phase.set, phase.totalSets)}
            </p>
          ) : null}

          {phase?.kind === 'regular' && phase.totalLegs === 2 ? (
            <p className={`mt-5 text-lg font-semibold ${theme.muted}`}>
              {t.legOf(phase.leg, phase.totalLegs)}
            </p>
          ) : null}

          <h2 className="mt-6 max-w-md text-2xl font-bold leading-tight">{title}</h2>
          {description ? (
            <p className={`mt-3 max-w-md text-sm leading-relaxed ${theme.muted}`}>{description}</p>
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
              isPaused ? theme.overlay : 'invisible'
            }`}
          >
            {t.paused}
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <ControlButton
              className={theme.control}
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
              className={`flex h-20 flex-col items-center justify-center rounded-3xl ${theme.pause}`}
              aria-label={isPaused ? t.resume : t.pause}
            >
              {isPaused ? <Play size={32} fill="currentColor" /> : <Pause size={32} fill="currentColor" />}
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wide">
                {isPaused ? t.resumeShort : t.pause}
              </span>
            </button>

            <ControlButton
              className={theme.control}
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
                className={theme.control}
                label={t.prevSet}
                disabled={!timer.canPrevSet}
                onClick={timer.prevSet}
              >
                <ChevronLeft size={22} />
              </ControlButton>
              <ControlButton
                className={theme.control}
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
            className={`flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold ${theme.overlay}`}
          >
            {t.stop}
          </button>
        </div>
      </div>
    </div>
  );
}

function ControlButton({ children, label, disabled, onClick, className }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-20 flex-col items-center justify-center rounded-3xl disabled:opacity-35 ${className}`}
    >
      {children}
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide">{label}</span>
    </button>
  );
}

function SkipIcon({ children }) {
  return <span className="flex items-center justify-center">{children}</span>;
}
