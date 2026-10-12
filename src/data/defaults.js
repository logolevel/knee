export const defaultSettings = {
  warmupTime: 180,
  tabataWorkTime: 10,
  tabataRestTime: 3,
  tabataSets: 10,
  restBetweenExercises: 20,
};

export const warmupExercise = {
  title: 'Скольжение на пятках',
  description: 'Лечь на спину на пол и скользить пятками по полу до ягодиц.',
};

const removedExerciseIds = new Set(['1']);

export const defaultExercises = [
  {
    id: '2',
    title: 'Вдавливание колена',
    description:
      'Лечь на спину, подложить под колено мягкий валик и вдавливать колено в этот валик, чтобы прочувствовать квадрицепс.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '3',
    title: 'Поднятие прямой ноги вверх',
    description:
      'Лечь на спину, с помощью резины поднимать прямую ногу вверх, натягивая носок на себя, чтобы прочувствовать квадрицепс.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '4',
    title: 'Отведение ноги вперёд с фитболом',
    description:
      'Сесть на стул, поставить колено в 90 градусов и вдавливать фитбол ногой в стену и контролировать, чтобы не было резкой боли.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '5',
    title: 'Оттяжка колена резиной назад',
    description:
      'Привязать резину к столбику, одеть одну ногу в резину и отводить ногу назад, вставая на носок и на пятку.',
    type: 'tabata',
    isActive: true,
  },
  {
    id: '6',
    title: 'Стульчик с фитболом у стены',
    description: 'Подложить к спине фитбол, опуститься плавно под 90 градусов.',
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
    title: 'Отведение ноги',
    description:
      'Встать на одну ногу, слегка согнув колено, и отводить ногу прямую в четыре плоскости: вперёд, вбок, назад и в другой бок.',
    type: 'regular',
    durationMinutes: 2,
    hasLegSwap: true,
    isActive: true,
  },
  {
    id: '9',
    title: 'Опускание на платформе',
    description:
      'Стоя одной ногой на платформе, опускаться, но при этом не смещать бедро, держать его в одной плоскости.',
    type: 'regular',
    durationMinutes: 3,
    hasLegSwap: true,
    isActive: true,
  },
  {
    id: '10',
    title: 'Перемещение на полусогнутых',
    description: 'Надеть резину на колени и приставным шагом перемещаться, не раскачиваясь.',
    type: 'regular',
    durationMinutes: 3,
    hasLegSwap: false,
    isActive: true,
  },
  {
    id: '11',
    title: 'Приседания с резинкой',
    description: 'Зацепить резинку за столбик и обе ноги и приседать.',
    type: 'regular',
    durationMinutes: 1,
    hasLegSwap: false,
    isActive: true,
  },
];

export function mergeSettings(stored) {
  if (!stored || typeof stored !== 'object') {
    return { ...defaultSettings };
  }

  return {
    ...defaultSettings,
    ...stored,
    warmupTime: toNonNegativeInt(stored.warmupTime, defaultSettings.warmupTime),
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
  const merged = stored
    .filter((exercise) => !removedExerciseIds.has(exercise.id))
    .map((exercise) => {
      const fallback = defaultExercises.find((item) => item.id === exercise.id);
      const storedDuration = exercise.durationMinutes;
      const nextDuration =
        exercise.id === '11' && storedDuration === 3
          ? fallback?.durationMinutes ?? 1
          : storedDuration;
      const base = fallback ? { ...fallback, ...exercise, durationMinutes: nextDuration } : { ...exercise };

      return {
        ...base,
        isActive: Boolean(base.isActive),
        type: base.type === 'regular' ? 'regular' : 'tabata',
        durationMinutes:
          base.type === 'regular'
            ? Math.max(1, toNonNegativeInt(base.durationMinutes, fallback?.durationMinutes ?? 3))
            : undefined,
        hasLegSwap: base.type === 'regular' ? Boolean(base.hasLegSwap) : undefined,
      };
    });

  defaultExercises.forEach((exercise) => {
    if (!storedById.has(exercise.id)) {
      merged.push({ ...exercise });
    }
  });

  return merged;
}

function toNonNegativeInt(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.max(0, Math.round(number));
}
