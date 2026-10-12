export const SUPPORTED_LANGUAGES = ['en', 'uk', 'ru'];
export const FALLBACK_LANGUAGE = 'en';

const en = {
  code: 'en',
  nativeName: 'English',
  speechLang: 'en-US',
  documentTitle: 'Knee — interval timer',
  units: { h: 'h', min: 'min', sec: 'sec' },

  config: {
    eyebrow: 'Knee rehabilitation',
    title: 'Workout settings',
    subtitle: 'Times and the exercise list are saved on this device.',
    totalTime: 'Total workout time',
    breakdownToggle: 'What it consists of',
    breakdownWarmup: 'Warm-up',
    breakdownTabata: 'Tabata',
    breakdownRegular: 'Regular exercises',
    breakdownRest: 'Rest between exercises',
    globalSettings: 'Global settings',
    warmup: 'Warm-up',
    warmupTime: 'Warm-up time',
    minutes: 'minutes',
    seconds: 'seconds',
    tabataWork: 'Tabata work',
    tabataRest: 'Tabata rest',
    sets: 'Rounds',
    setsHint: 'work/rest repeats',
    restBetween: 'Rest between exercises',
    language: 'Language',
    exercises: 'Exercises',
    active: (count) => `Active: ${count}`,
    start: 'Start workout',
    enableOne: 'Enable at least one exercise',
  },

  card: {
    tabata: 'Tabata',
    regular: 'Regular',
    legSwap: 'Leg swap',
    duration: 'Duration',
    minutesPerLeg: 'minutes per leg',
    minutes: 'minutes',
  },

  field: {
    decrease: (label) => `Decrease ${label}`,
    increase: (label) => `Increase ${label}`,
  },

  timer: {
    confirmStop: 'End the workout and return to settings?',
    stop: 'End workout',
    getReady: 'Get ready',
    exerciseOf: (current, total) => `Exercise ${current} of ${total}`,
    setOf: (current, total) => `Round ${current} of ${total}`,
    legOf: (current, total) => `Leg ${current} of ${total}`,
    next: (title) => `Next: ${title}`,
    restBetween: 'Rest between exercises',
    paused: 'Paused',
    pause: 'Pause',
    resume: 'Resume',
    resumeShort: 'Go on',
    prevExercise: 'Prev. ex.',
    nextExercise: 'Next ex.',
    prevSet: 'Prev. round',
    nextSet: 'Next round',
    phaseFallback: 'Phase',
    workoutFallback: 'Workout',
  },

  complete: {
    title: 'Workout complete',
    text: 'All active exercises are done. Rest up or start another round.',
    home: 'Back to home',
  },

  phase: {
    warmup: 'Warm-up',
    work: 'Work',
    rest: 'Rest',
    firstLeg: 'First leg',
    secondLeg: 'Second leg',
    exercise: 'Exercise',
  },

  speech: {
    warmupStart: (title) => `Warm-up started. ${title}`,
    start: 'Start',
    startWithTitle: (title) => `${title}. Start`,
    rest: 'Rest',
    legSwap: 'Switch legs',
    transition: (next) => `Rest. Next exercise: ${next}`,
    complete: 'Workout complete',
  },

  warmupExercise: {
    title: 'Heel slides',
    description:
      'Lie on your back on the floor and slide your heels along the floor toward your buttocks.',
  },

  exercises: {
    2: {
      title: 'Knee press',
      description:
        'Lie on your back, place a soft roll under the knee and press the knee into the roll to feel the quadriceps.',
    },
    3: {
      title: 'Straight leg raise',
      description:
        'Lie on your back and use a resistance band to raise the straight leg up, pulling your toes toward you to feel the quadriceps.',
    },
    4: {
      title: 'Forward leg push with a fitball',
      description:
        'Sit on a chair with the knee bent at 90 degrees and press a fitball into the wall with your leg; make sure there is no sharp pain.',
    },
    5: {
      title: 'Band knee pull-back',
      description:
        'Tie the band to a post, put one leg in the band and move the leg backward, rising onto the toe and onto the heel.',
    },
    6: {
      title: 'Wall sit with a fitball',
      description: 'Place a fitball behind your back and lower smoothly to 90 degrees.',
    },
    7: {
      title: 'Glute bridge',
      description: 'Lie on the floor and lift your hips up.',
    },
    8: {
      title: 'Leg abduction',
      description:
        'Stand on one leg with a slightly bent knee and move the straight leg in four directions: forward, sideways, backward and to the other side.',
    },
    9: {
      title: 'Step-down on a platform',
      description:
        'Standing with one foot on a platform, lower yourself without shifting the hip; keep it in one plane.',
    },
    10: {
      title: 'Half-squat side steps',
      description:
        'Put a band around your knees and move with side steps without swaying.',
    },
    11: {
      title: 'Squats with a band',
      description: 'Hook the band to a post and around both legs and squat.',
    },
  },
};

const uk = {
  code: 'uk',
  nativeName: 'Українська',
  speechLang: 'uk-UA',
  documentTitle: 'Коліно — інтервальний таймер',
  units: { h: 'год', min: 'хв', sec: 'с' },

  config: {
    eyebrow: 'Реабілітація коліна',
    title: 'Налаштування тренування',
    subtitle: 'Час і список вправ зберігаються на цьому пристрої.',
    totalTime: 'Загальний час заняття',
    breakdownToggle: 'З чого складається',
    breakdownWarmup: 'Розминка',
    breakdownTabata: 'Табата',
    breakdownRegular: 'Звичайні вправи',
    breakdownRest: 'Відпочинок між вправами',
    globalSettings: 'Глобальні налаштування',
    warmup: 'Розминка',
    warmupTime: 'Час розминки',
    minutes: 'хвилини',
    seconds: 'секунди',
    tabataWork: 'Робота табати',
    tabataRest: 'Відпочинок табати',
    sets: 'Кола',
    setsHint: 'повтори роботи/відпочинку',
    restBetween: 'Відпочинок між вправами',
    language: 'Мова',
    exercises: 'Вправи',
    active: (count) => `Активно: ${count}`,
    start: 'Почати тренування',
    enableOne: 'Увімкніть хоча б одну вправу',
  },

  card: {
    tabata: 'Табата',
    regular: 'Звичайна',
    legSwap: 'Зміна ніг',
    duration: 'Тривалість',
    minutesPerLeg: 'хвилини на одну ногу',
    minutes: 'хвилини',
  },

  field: {
    decrease: (label) => `Зменшити: ${label}`,
    increase: (label) => `Збільшити: ${label}`,
  },

  timer: {
    confirmStop: 'Завершити тренування й повернутися до налаштувань?',
    stop: 'Завершити тренування',
    getReady: 'Підготовка',
    exerciseOf: (current, total) => `Вправа ${current} з ${total}`,
    setOf: (current, total) => `Коло ${current} з ${total}`,
    legOf: (current, total) => `Нога ${current} з ${total}`,
    next: (title) => `Далі: ${title}`,
    restBetween: 'Відпочинок між вправами',
    paused: 'Пауза',
    pause: 'Пауза',
    resume: 'Продовжити',
    resumeShort: 'Далі',
    prevExercise: 'Попер. впр.',
    nextExercise: 'Наст. впр.',
    prevSet: 'Попер. коло',
    nextSet: 'Наст. коло',
    phaseFallback: 'Фаза',
    workoutFallback: 'Тренування',
  },

  complete: {
    title: 'Тренування завершено',
    text: 'Усі активні вправи виконано. Можна відпочити або запустити підхід ще раз.',
    home: 'На головний екран',
  },

  phase: {
    warmup: 'Розминка',
    work: 'Робота',
    rest: 'Відпочинок',
    firstLeg: 'Перша нога',
    secondLeg: 'Друга нога',
    exercise: 'Вправа',
  },

  speech: {
    warmupStart: (title) => `Розпочалася розминка. ${title}`,
    start: 'Старт',
    startWithTitle: (title) => `${title}. Старт`,
    rest: 'Відпочинок',
    legSwap: 'Зміна ноги',
    transition: (next) => `Відпочинок. Наступна вправа: ${next}`,
    complete: 'Тренування завершено',
  },

  warmupExercise: {
    title: 'Ковзання п’ятами',
    description: 'Лягти на спину на підлогу й ковзати п’ятами по підлозі до сідниць.',
  },

  exercises: {
    2: {
      title: 'Вдавлювання коліна',
      description:
        'Лягти на спину, підкласти під коліно м’який валик і вдавлювати коліно в цей валик, щоб відчути квадріцепс.',
    },
    3: {
      title: 'Підняття прямої ноги вгору',
      description:
        'Лягти на спину, за допомогою гуми піднімати пряму ногу вгору, натягуючи носок на себе, щоб відчути квадріцепс.',
    },
    4: {
      title: 'Відведення ноги вперед з фітболом',
      description:
        'Сісти на стілець, зігнути коліно під 90 градусів і вдавлювати фітбол ногою в стіну, контролюючи, щоб не було різкого болю.',
    },
    5: {
      title: 'Відтягування коліна гумою назад',
      description:
        'Прив’язати гуму до стовпчика, одягнути одну ногу в гуму й відводити ногу назад, стаючи на носок і на п’ятку.',
    },
    6: {
      title: 'Стільчик з фітболом біля стіни',
      description: 'Підкласти до спини фітбол, опуститися плавно під 90 градусів.',
    },
    7: {
      title: 'Сідничний місток',
      description: 'Лягти на підлогу й піднімати сідниці вгору.',
    },
    8: {
      title: 'Відведення ноги',
      description:
        'Стати на одну ногу, трохи зігнувши коліно, і відводити пряму ногу в чотирьох напрямках: уперед, убік, назад і в інший бік.',
    },
    9: {
      title: 'Опускання на платформі',
      description:
        'Стоячи однією ногою на платформі, опускатися, але при цьому не зміщувати стегно, тримати його в одній площині.',
    },
    10: {
      title: 'Переміщення на напівзігнутих',
      description:
        'Одягнути гуму на коліна й приставним кроком переміщатися, не розгойдуючись.',
    },
    11: {
      title: 'Присідання з гумкою',
      description: 'Зачепити гумку за стовпчик і обидві ноги та присідати.',
    },
  },
};

const ru = {
  code: 'ru',
  nativeName: 'Русский',
  speechLang: 'ru-RU',
  documentTitle: 'Колено — интервальный таймер',
  units: { h: 'ч', min: 'мин', sec: 'сек' },

  config: {
    eyebrow: 'Реабилитация колена',
    title: 'Настройки тренировки',
    subtitle: 'Время и список упражнений сохраняются на этом устройстве.',
    totalTime: 'Общее время занятия',
    breakdownToggle: 'Из чего состоит',
    breakdownWarmup: 'Разминка',
    breakdownTabata: 'Табата',
    breakdownRegular: 'Обычные упражнения',
    breakdownRest: 'Отдых между упражнениями',
    globalSettings: 'Глобальные настройки',
    warmup: 'Разминка',
    warmupTime: 'Время разминки',
    minutes: 'минуты',
    seconds: 'секунды',
    tabataWork: 'Работа табаты',
    tabataRest: 'Отдых табаты',
    sets: 'Круги',
    setsHint: 'повторы работы/отдыха',
    restBetween: 'Отдых между упражнениями',
    language: 'Язык',
    exercises: 'Упражнения',
    active: (count) => `Активно: ${count}`,
    start: 'Начать тренировку',
    enableOne: 'Включите хотя бы одно упражнение',
  },

  card: {
    tabata: 'Табата',
    regular: 'Обычное',
    legSwap: 'Смена ног',
    duration: 'Длительность',
    minutesPerLeg: 'минуты на одну ногу',
    minutes: 'минуты',
  },

  field: {
    decrease: (label) => `Уменьшить: ${label}`,
    increase: (label) => `Увеличить: ${label}`,
  },

  timer: {
    confirmStop: 'Завершить тренировку и вернуться к настройкам?',
    stop: 'Завершить тренировку',
    getReady: 'Подготовка',
    exerciseOf: (current, total) => `Упражнение ${current} из ${total}`,
    setOf: (current, total) => `Круг ${current} из ${total}`,
    legOf: (current, total) => `Нога ${current} из ${total}`,
    next: (title) => `Далее: ${title}`,
    restBetween: 'Отдых между упражнениями',
    paused: 'Пауза',
    pause: 'Пауза',
    resume: 'Продолжить',
    resumeShort: 'Дальше',
    prevExercise: 'Пред. упр.',
    nextExercise: 'След. упр.',
    prevSet: 'Пред. круг',
    nextSet: 'След. круг',
    phaseFallback: 'Фаза',
    workoutFallback: 'Тренировка',
  },

  complete: {
    title: 'Тренировка завершена',
    text: 'Все активные упражнения выполнены. Можно отдохнуть или запустить подход ещё раз.',
    home: 'На главный экран',
  },

  phase: {
    warmup: 'Разминка',
    work: 'Работа',
    rest: 'Отдых',
    firstLeg: 'Первая нога',
    secondLeg: 'Вторая нога',
    exercise: 'Упражнение',
  },

  speech: {
    warmupStart: (title) => `Началась разминка. ${title}`,
    start: 'Старт',
    startWithTitle: (title) => `${title}. Старт`,
    rest: 'Отдых',
    legSwap: 'Смена ноги',
    transition: (next) => `Отдых. Следующее упражнение: ${next}`,
    complete: 'Тренировка завершена',
  },

  warmupExercise: {
    title: 'Скольжение на пятках',
    description: 'Лечь на спину на пол и скользить пятками по полу до ягодиц.',
  },

  exercises: {
    2: {
      title: 'Вдавливание колена',
      description:
        'Лечь на спину, подложить под колено мягкий валик и вдавливать колено в этот валик, чтобы прочувствовать квадрицепс.',
    },
    3: {
      title: 'Поднятие прямой ноги вверх',
      description:
        'Лечь на спину, с помощью резины поднимать прямую ногу вверх, натягивая носок на себя, чтобы прочувствовать квадрицепс.',
    },
    4: {
      title: 'Отведение ноги вперёд с фитболом',
      description:
        'Сесть на стул, поставить колено в 90 градусов и вдавливать фитбол ногой в стену и контролировать, чтобы не было резкой боли.',
    },
    5: {
      title: 'Оттяжка колена резиной назад',
      description:
        'Привязать резину к столбику, одеть одну ногу в резину и отводить ногу назад, вставая на носок и на пятку.',
    },
    6: {
      title: 'Стульчик с фитболом у стены',
      description: 'Подложить к спине фитбол, опуститься плавно под 90 градусов.',
    },
    7: {
      title: 'Ягодичный мост',
      description: 'Лечь на пол и поднимать ягодицы вверх.',
    },
    8: {
      title: 'Отведение ноги',
      description:
        'Встать на одну ногу, слегка согнув колено, и отводить ногу прямую в четыре плоскости: вперёд, вбок, назад и в другой бок.',
    },
    9: {
      title: 'Опускание на платформе',
      description:
        'Стоя одной ногой на платформе, опускаться, но при этом не смещать бедро, держать его в одной плоскости.',
    },
    10: {
      title: 'Перемещение на полусогнутых',
      description:
        'Надеть резину на колени и приставным шагом перемещаться, не раскачиваясь.',
    },
    11: {
      title: 'Приседания с резинкой',
      description: 'Зацепить резинку за столбик и обе ноги и приседать.',
    },
  },
};

export const translations = { en, uk, ru };

export function isSupportedLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value);
}

export function detectLanguage() {
  if (typeof navigator === 'undefined') {
    return FALLBACK_LANGUAGE;
  }

  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);

  for (const candidate of candidates) {
    const code = String(candidate).toLowerCase().split('-')[0];
    if (isSupportedLanguage(code)) {
      return code;
    }
  }

  return FALLBACK_LANGUAGE;
}

// Default exercises keep their ids in storage; their text always comes from the
// active language, so switching language retranslates them instantly.
export function localizeExercises(exercises, messages) {
  return (exercises ?? []).map((exercise) => {
    const translated = messages.exercises[exercise.id];
    return translated ? { ...exercise, ...translated } : exercise;
  });
}
