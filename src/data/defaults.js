export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

export const difficultyPresets = {
  easy: {
    settings: {
      warmupTime: 60,
      stretchTime: 60,
      tabataWorkTime: 5,
      tabataRestTime: 3,
      tabataSets: 5,
      restBetweenExercises: 20,
    },
    regularDurationSeconds: 30,
  },
  medium: {
    settings: {
      warmupTime: 120,
      stretchTime: 120,
      tabataWorkTime: 10,
      tabataRestTime: 3,
      tabataSets: 10,
      restBetweenExercises: 20,
    },
    regularDurationSeconds: 60,
  },
  hard: {
    settings: {
      warmupTime: 180,
      stretchTime: 180,
      tabataWorkTime: 15,
      tabataRestTime: 5,
      tabataSets: 15,
      restBetweenExercises: 20,
    },
    regularDurationSeconds: 120,
  },
};

export function isDifficulty(value) {
  return DIFFICULTY_LEVELS.includes(value);
}

export const defaultSettings = {
  difficulty: 'easy',
  ...difficultyPresets.easy.settings,
};

const removedExerciseIds = new Set(['1']);

export const defaultExercises = [
  {
    id: '2',
    title: 'Вдавливание колена',
    description:
      'Лечь на спину, подложить под колено небольшой валик и вдавливать колено в него, тянуть носок ноги на себя, чтобы прочувствовать квадрицепс.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '3',
    title: 'Поднятие прямой ноги вверх',
    description:
      'Лечь на спину, закрепить резину на ноге, что лежит на полу, и поднимать прямую ногу вверх, испытывая сопротивление резины, натягивая носок на себя, чтобы прочувствовать квадрицепс.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '4',
    title: 'Отведение ноги вперёд с фитболом',
    description:
      'Сесть на стул, поставить колено в 90 градусов и вдавливать фитбол ногой вперёд в стену, чтобы не было резкой боли, увеличивая угол сгибания колена.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '5',
    title: 'Оттяжка колена резиной назад',
    description:
      'Привязать резину к столбику, продеть одну ногу в резину и отводить ногу назад, стоя лицом к столбику, перекатываясь с носка на пятку.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '6',
    title: 'Стульчик с фитболом у стены',
    description: 'Подложить к спине фитбол и опершись о стену, опуститься плавно под 90 градусов.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '7',
    title: 'Ягодичный мост',
    description: 'Лечь на пол и поднимать ягодицы вверх.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '8',
    title: 'Отведение ноги на полусогнутом колене',
    description:
      'Встать на одну ногу, слегка согнув колено, и отводить прямую ногу в четыре плоскости: вперёд, вбок, назад и в другой бок. Корпус ровно, не отклоняясь в стороны.',
    type: 'regular',
    durationSeconds: 30,
    hasLegSwap: true,
    isActive: true,
  },
  {
    id: '9',
    title: 'Опускание на платформе',
    description:
      'Стоя одной ногой на платформе, опускаться, сгибая колено, но при этом не смещать бедро, держа его в одной плоскости.',
    type: 'regular',
    durationSeconds: 30,
    hasLegSwap: true,
    isActive: true,
  },
  {
    id: '10',
    title: 'Перемещение на полусогнутых',
    description: 'Надеть резину на колени, согнув их под 45 градусов и приставным шагом перемещаться, не раскачиваясь.',
    type: 'regular',
    durationSeconds: 30,
    hasLegSwap: false,
    isActive: true,
  },
  {
    id: '11',
    title: 'Приседания с резинкой',
    description: 'Зацепить резинку за столбик и за обе ноги и стоя лицом к столбику приседать.',
    type: 'regular',
    durationSeconds: 30,
    hasLegSwap: false,
    isActive: true,
  },
];

export function mergeSettings(stored) {
  if (!stored || typeof stored !== 'object' || !isDifficulty(stored.difficulty)) {
    return { ...defaultSettings };
  }

  return {
    ...defaultSettings,
    ...stored,
    difficulty: stored.difficulty,
    warmupTime: toNonNegativeInt(stored.warmupTime, defaultSettings.warmupTime),
    stretchTime: toNonNegativeInt(stored.stretchTime, defaultSettings.stretchTime),
    tabataWorkTime: toNonNegativeInt(stored.tabataWorkTime, defaultSettings.tabataWorkTime),
    tabataRestTime: toNonNegativeInt(stored.tabataRestTime, defaultSettings.tabataRestTime),
    tabataSets: Math.max(1, toNonNegativeInt(stored.tabataSets, defaultSettings.tabataSets)),
    restBetweenExercises: toNonNegativeInt(
      stored.restBetweenExercises,
      defaultSettings.restBetweenExercises,
    ),
  };
}

export function mergeExercises(stored) {
  if (!Array.isArray(stored) || stored.length === 0) {
    return defaultExercises.map((exercise) => ({ ...exercise }));
  }

  const storedById = new Map(stored.map((exercise) => [exercise.id, exercise]));
  const hasDurationSeconds = stored.some((exercise) => exercise.durationSeconds != null);
  const merged = stored
    .filter((exercise) => !removedExerciseIds.has(exercise.id))
    .map((exercise) => {
      const fallback = defaultExercises.find((item) => item.id === exercise.id);
      const base = fallback ? { ...fallback, ...exercise } : { ...exercise };
      const type = base.type === 'regular' ? 'regular' : 'tabata';

      return {
        ...base,
        isActive: Boolean(base.isActive),
        type,
        durationSeconds: type === 'regular'
          ? hasDurationSeconds
            ? toDurationSeconds(exercise, fallback)
            : difficultyPresets.easy.regularDurationSeconds
          : undefined,
        durationMinutes: undefined,
        hasLegSwap: type === 'regular' ? Boolean(base.hasLegSwap) : undefined,
      };
    });

  defaultExercises.forEach((exercise) => {
    if (!storedById.has(exercise.id)) {
      merged.push({ ...exercise });
    }
  });

  return merged;
}

export function applyDifficulty(difficulty, exercises) {
  const preset = difficultyPresets[difficulty];
  if (!preset) {
    return { settings: {}, exercises };
  }

  return {
    settings: { difficulty, ...preset.settings },
    exercises: (exercises ?? []).map((exercise) =>
      exercise.type === 'regular'
        ? { ...exercise, durationSeconds: preset.regularDurationSeconds }
        : exercise,
    ),
  };
}

export function getMatchingDifficulty(settings, exercises) {
  return (
    DIFFICULTY_LEVELS.find((difficulty) => {
      const preset = difficultyPresets[difficulty];
      const settingsMatch = Object.entries(preset.settings).every(
        ([key, value]) => settings?.[key] === value,
      );
      const exercisesMatch = (exercises ?? [])
        .filter((exercise) => exercise.type === 'regular')
        .every((exercise) => getRegularDurationSeconds(exercise) === preset.regularDurationSeconds);
      return settingsMatch && exercisesMatch;
    }) ?? null
  );
}

export function getRegularDurationSeconds(exercise) {
  const seconds = Number(exercise?.durationSeconds);
  if (Number.isFinite(seconds) && seconds > 0) {
    return Math.max(15, Math.round(seconds));
  }

  const minutes = Number(exercise?.durationMinutes);
  if (Number.isFinite(minutes) && minutes > 0) {
    return Math.max(15, Math.round(minutes * 60));
  }

  return difficultyPresets.easy.regularDurationSeconds;
}

function toDurationSeconds(exercise, fallbackExercise) {
  const fallback =
    fallbackExercise?.durationSeconds ?? difficultyPresets.easy.regularDurationSeconds;

  if (exercise.durationSeconds != null && Number.isFinite(Number(exercise.durationSeconds))) {
    return Math.max(15, toNonNegativeInt(exercise.durationSeconds, fallback));
  }

  let minutes = Number(exercise.durationMinutes);
  if (exercise.id === '11' && minutes === 3) {
    minutes = 1;
  }
  if (Number.isFinite(minutes) && minutes > 0) {
    return Math.max(15, Math.round(minutes * 60));
  }

  return fallback;
}

function toNonNegativeInt(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.max(0, Math.round(number));
}
