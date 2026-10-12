import { translations } from '../i18n/translations.js';

export function getActiveExercises(exercises) {
  return (exercises ?? []).filter((exercise) => exercise.isActive);
}

export function buildPhases(settings, exercises, messages = translations.en) {
  const {
    warmupTime = 0,
    tabataWorkTime = 0,
    tabataRestTime = 0,
    tabataSets = 1,
    restBetweenExercises = 0,
  } = settings ?? {};

  const { phase: labels, speech, warmupExercise } = messages;
  const active = getActiveExercises(exercises);
  const phases = [];

  if (warmupTime > 0) {
    phases.push({
      kind: 'warmup',
      duration: warmupTime,
      label: labels.warmup,
      exerciseTitle: warmupExercise.title,
      exerciseDescription: warmupExercise.description,
      speech: speech.warmupStart(warmupExercise.title),
    });
  }

  active.forEach((exercise, index) => {
    const nextExercise = active[index + 1];

    if (exercise.type === 'tabata') {
      for (let set = 1; set <= tabataSets; set += 1) {
        if (tabataWorkTime > 0) {
          phases.push({
            kind: 'tabata-work',
            duration: tabataWorkTime,
            exerciseId: exercise.id,
            exerciseTitle: exercise.title,
            exerciseDescription: exercise.description,
            set,
            totalSets: tabataSets,
            label: labels.work,
            speech: set === 1 ? speech.startWithTitle(exercise.title) : speech.start,
          });
        }

        if (tabataRestTime > 0) {
          phases.push({
            kind: 'tabata-rest',
            duration: tabataRestTime,
            exerciseId: exercise.id,
            exerciseTitle: exercise.title,
            exerciseDescription: exercise.description,
            set,
            totalSets: tabataSets,
            label: labels.rest,
            speech: speech.rest,
          });
        }
      }
    } else {
      const duration = Math.max(1, exercise.durationMinutes ?? 3) * 60;
      const totalLegs = exercise.hasLegSwap ? 2 : 1;

      for (let leg = 1; leg <= totalLegs; leg += 1) {
        phases.push({
          kind: 'regular',
          duration,
          exerciseId: exercise.id,
          exerciseTitle: exercise.title,
          exerciseDescription: exercise.description,
          leg: exercise.hasLegSwap ? leg : null,
          totalLegs,
          label: exercise.hasLegSwap
            ? leg === 1
              ? labels.firstLeg
              : labels.secondLeg
            : labels.exercise,
          speech: leg === 1 ? exercise.title : speech.legSwap,
        });
      }
    }

    if (nextExercise && restBetweenExercises > 0) {
      phases.push({
        kind: 'transition',
        duration: restBetweenExercises,
        exerciseId: exercise.id,
        exerciseTitle: exercise.title,
        nextExerciseId: nextExercise.id,
        nextExerciseTitle: nextExercise.title,
        label: labels.rest,
        speech: speech.transition(nextExercise.title),
      });
    }
  });

  return phases;
}

export function getTotalDuration(settings, exercises) {
  return buildPhases(settings, exercises).reduce((sum, phase) => sum + phase.duration, 0);
}

export function getTotalBreakdown(settings, exercises) {
  const breakdown = { warmup: 0, tabata: 0, regular: 0, rest: 0 };

  buildPhases(settings, exercises).forEach((phase) => {
    if (phase.kind === 'warmup') {
      breakdown.warmup += phase.duration;
    } else if (phase.kind === 'tabata-work' || phase.kind === 'tabata-rest') {
      breakdown.tabata += phase.duration;
    } else if (phase.kind === 'regular') {
      breakdown.regular += phase.duration;
    } else if (phase.kind === 'transition') {
      breakdown.rest += phase.duration;
    }
  });

  return breakdown;
}

export function findExerciseStarts(phases) {
  const starts = [];
  let lastId = null;

  phases.forEach((phase, index) => {
    const isStart =
      (phase.kind === 'tabata-work' && phase.set === 1) ||
      (phase.kind === 'regular' && (phase.leg == null || phase.leg === 1));

    if (isStart && phase.exerciseId && phase.exerciseId !== lastId) {
      starts.push(index);
      lastId = phase.exerciseId;
    }
  });

  return starts;
}
