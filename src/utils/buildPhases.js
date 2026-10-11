import { warmupExercise } from '../data/defaults.js';

export function getActiveExercises(exercises) {
  return (exercises ?? []).filter((exercise) => exercise.isActive);
}

export function buildPhases(settings, exercises) {
  const {
    warmupTime = 0,
    tabataWorkTime = 0,
    tabataRestTime = 0,
    tabataSets = 1,
    restBetweenExercises = 0,
  } = settings ?? {};

  const active = getActiveExercises(exercises);
  const phases = [];

  if (warmupTime > 0) {
    phases.push({
      kind: 'warmup',
      duration: warmupTime,
      label: 'Разминка',
      exerciseTitle: warmupExercise.title,
      exerciseDescription: warmupExercise.description,
      speech: `Началась разминка. ${warmupExercise.title}`,
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
            label: 'Работа',
            speech: set === 1 ? `${exercise.title}. Старт` : 'Старт',
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
            label: 'Отдых',
            speech: 'Отдых',
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
              ? 'Первая нога'
              : 'Вторая нога'
            : 'Упражнение',
          speech: leg === 1 ? exercise.title : 'Смена ноги',
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
        label: 'Отдых',
        speech: `Отдых. Следующее упражнение: ${nextExercise.title}`,
      });
    }
  });

  return phases;
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
