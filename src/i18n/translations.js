export const SUPPORTED_LANGUAGES = ['en', 'uk', 'ru'];
export const FALLBACK_LANGUAGE = 'en';

const en = {
  code: 'en',
  nativeName: 'English',
  speechLang: 'en-US',
  appName: 'Knee',
  appDescription: 'Interval timer for knee rehabilitation',
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
    breakdownStretch: 'Stretching',
    exerciseSettings: 'Exercise settings',
    difficulty: 'Difficulty',
    difficultyEasy: 'Easy',
    difficultyMedium: 'Medium',
    difficultyHard: 'Hard',
    warmup: 'Warm-up',
    warmupTime: 'Warm-up time',
    stretch: 'Stretching',
    stretchTime: 'Stretching time',
    minutes: 'minutes',
    seconds: 'seconds',
    tabataWork: 'Tabata work',
    tabataRest: 'Tabata rest',
    sets: 'Rounds',
    setsHint: 'work/rest repeats',
    restBetween: 'Rest between exercises',
    appSettings: 'App settings',
    language: 'Language',
    theme: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    exercises: 'Exercises',
    active: (count) => `Active: ${count}`,
    start: 'Start workout',
    enableOne: 'Enable at least one exercise',
  },

  image: {
    open: 'View larger image',
    close: 'Close image',
  },

  card: {
    tabata: 'Tabata',
    regular: 'Regular',
    legSwap: 'Leg swap',
    duration: 'Duration',
    minutesPerLeg: 'minutes per leg',
    minutes: 'minutes',
    secondsPerLeg: 'seconds per leg',
    seconds: 'seconds',
    perLeg: 'per leg',
  },

  field: {
    decrease: (label) => `Decrease ${label}`,
    increase: (label) => `Increase ${label}`,
  },

  timer: {
    confirmStop: 'End the workout and return to settings?',
    stop: 'End workout',
    getReady: 'Get ready',
    coolDown: 'Cool-down',
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
    stretch: 'Stretching',
    work: 'Work',
    rest: 'Rest',
    firstLeg: 'First leg',
    secondLeg: 'Second leg',
    exercise: 'Exercise',
  },

  speech: {
    warmupStart: (title) => `Warm-up started. ${title}`,
    stretchStart: (title) => `Stretching started. ${title}`,
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

  stretchExercise: {
    title: 'Quadriceps stretch',
    description:
      'Stand upright, then kneel and hold the back foot, pulling the heel toward the glute to stretch the quadriceps. Repeat on the other leg.',
  },

  exercises: {
    2: {
      title: 'Knee press',
      description:
        'Lie on your back, place a soft roll under the knee and press the knee into the roll to feel the quadriceps. It is especially important to pull the toes toward you to feel the quadriceps. Keep the quadriceps tensed throughout the entire interval!',
    },
    3: {
      title: 'Straight leg raise',
      description:
        'Lie on your back with one leg on the floor and raise the other leg up, pulling the toes toward you to feel the quadriceps. Keep the quadriceps tensed throughout the entire interval! For extra resistance you can use a band.',
    },
    4: {
      title: 'Forward leg push with a fitball',
      description:
        'Sit on a chair, set the knee at 90 degrees and press a fitball into the wall with your leg. Control the pressing force so there is no sharp pain. Keep the quadriceps tensed throughout the entire interval!',
    },
    5: {
      title: 'Band knee pull-back',
      description:
        'Tie the band to a post, put one leg in the band and move it backward, rising onto the toe and onto the heel. Keep the quadriceps tensed throughout the entire interval!',
    },
    6: {
      title: 'Wall sit with a fitball',
      description:
        'Place a fitball behind your back (if you have one) and lower smoothly to 90 degrees, then hold that position. If 90 degrees causes sharp pain, reduce the angle to a comfortable one. Keep the quadriceps tensed throughout the entire interval!',
    },
    7: {
      title: 'Glute bridge',
      description:
        'Lie on the floor and lift your hips up, keeping the glutes tense. If it feels easy, you can rise onto your toes. Keep the quadriceps and glutes tensed throughout the entire interval!',
    },
    8: {
      title: 'Leg abduction on a slightly bent knee',
      description:
        'Stand on one leg with a slightly bent knee and move the straight leg in four directions: forward, sideways, backward and to the other side. The standing-leg angle should not cause knee pain. Try to keep the knee bent throughout the entire interval!',
    },
    9: {
      title: 'Step-down on a platform',
      description:
        'Standing with one foot on a platform, lower yourself without shifting the hip; keep it in one plane. The standing-leg angle should not cause knee pain, but try to lower yourself further.',
    },
    10: {
      title: 'Half-squat side steps',
      description:
        'Put a band around your knees (if you have one) and move with side steps, controlling the standing-leg angle so it does not cause knee pain. Keep the chosen knee-bend angle constant and do not sway.',
    },
    11: {
      title: 'Squats with a band',
      description:
        'Hook the band (if you have one) to a post and around both legs and squat, feeling the band’s resistance.',
    },
  },
};

const uk = {
  code: 'uk',
  nativeName: 'Українська',
  speechLang: 'uk-UA',
  appName: 'Коліно',
  appDescription: 'Інтервальний таймер для реабілітації коліна',
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
    breakdownStretch: 'Розтяжка',
    exerciseSettings: 'Налаштування вправ',
    difficulty: 'Складність',
    difficultyEasy: 'Легкий',
    difficultyMedium: 'Середній',
    difficultyHard: 'Важкий',
    warmup: 'Розминка',
    warmupTime: 'Час розминки',
    stretch: 'Розтяжка',
    stretchTime: 'Час розтяжки',
    minutes: 'хвилини',
    seconds: 'секунди',
    tabataWork: 'Робота табати',
    tabataRest: 'Відпочинок табати',
    sets: 'Кола',
    setsHint: 'повтори роботи/відпочинку',
    restBetween: 'Відпочинок між вправами',
    appSettings: 'Налаштування програми',
    language: 'Мова',
    theme: 'Тема',
    themeSystem: 'Система',
    themeLight: 'Світла',
    themeDark: 'Темна',
    exercises: 'Вправи',
    active: (count) => `Активно: ${count}`,
    start: 'Почати тренування',
    enableOne: 'Увімкніть хоча б одну вправу',
  },

  image: {
    open: 'Відкрити зображення більше',
    close: 'Закрити зображення',
  },

  card: {
    tabata: 'Табата',
    regular: 'Звичайна',
    legSwap: 'Зміна ніг',
    duration: 'Тривалість',
    minutesPerLeg: 'хвилини на одну ногу',
    minutes: 'хвилини',
    secondsPerLeg: 'секунди на одну ногу',
    seconds: 'секунди',
    perLeg: 'на одну ногу',
  },

  field: {
    decrease: (label) => `Зменшити: ${label}`,
    increase: (label) => `Збільшити: ${label}`,
  },

  timer: {
    confirmStop: 'Завершити тренування й повернутися до налаштувань?',
    stop: 'Завершити тренування',
    getReady: 'Підготовка',
    coolDown: 'Заминка',
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
    stretch: 'Розтяжка',
    work: 'Робота',
    rest: 'Відпочинок',
    firstLeg: 'Перша нога',
    secondLeg: 'Друга нога',
    exercise: 'Вправа',
  },

  speech: {
    warmupStart: (title) => `Розпочалася розминка. ${title}`,
    stretchStart: (title) => `Розпочалася розтяжка. ${title}`,
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

  stretchExercise: {
    title: 'Розтяжка квадрицепса',
    description:
      'Стати рівно, потім опуститися на коліно й узяти задню стопу, підтягуючи п’яту до сідниці, щоб розтягнути квадрицепс. Повторити на іншій нозі.',
  },

  exercises: {
    2: {
      title: 'Вдавлювання коліна',
      description:
        'Лягти на спину, підкласти під коліно м’який валик і вдавлювати коліно в цей валик, щоб відчути квадріцепс. Особливо важливо тягнути носок ноги на себе, щоб відчути квадріцепс. Тримати м’яз квадрицепса в напруженні протягом усього інтервалу!',
    },
    3: {
      title: 'Підняття прямої ноги вгору',
      description:
        'Лягти на спину, одна нога на підлозі, другу підняти вгору, натягуючи носок на себе, щоб відчути квадріцепс. Тримати м’яз квадрицепса в напруженні протягом усього інтервалу! Для додаткового опору можна використати гуму.',
    },
    4: {
      title: 'Відведення ноги вперед з фітболом',
      description:
        'Сісти на стілець, поставити коліно під 90 градусів і вдавлювати фітбол ногою в стіну. Контролювати силу натискання, щоб не було різкого болю. Тримати м’яз квадрицепса в напруженні протягом усього інтервалу!',
    },
    5: {
      title: 'Відтягування коліна гумою назад',
      description:
        'Прив’язати гуму до стовпчика, одягнути одну ногу в гуму й відводити її назад, стаючи на носок і на п’ятку. Тримати м’яз квадрицепса в напруженні протягом усього інтервалу!',
    },
    6: {
      title: 'Стільчик з фітболом біля стіни',
      description:
        'Підкласти до спини фітбол (якщо є), опуститися плавно під 90 градусів і утримувати це положення. Якщо при 90 градусах різкий біль, зменшити кут до комфортного для вас. Тримати м’яз квадрицепса в напруженні протягом усього інтервалу!',
    },
    7: {
      title: 'Сідничний місток',
      description:
        'Лягти на підлогу й підняти сідниці вгору, утримуючи в них напругу. Якщо легко, можна ставати на носочки. Тримати м’язи квадрицепса та сідниць у напруженні протягом усього інтервалу!',
    },
    8: {
      title: 'Відведення ноги на напівзігнутому коліні',
      description:
        'Стати на одну ногу, трохи зігнувши коліно, і відводити пряму ногу в чотирьох площинах: уперед, убік, назад і в інший бік. Кут опорної ноги не повинен викликати біль у коліні. Постаратися тримати коліно зігнутим протягом усього інтервалу!',
    },
    9: {
      title: 'Опускання на платформі',
      description:
        'Стоячи однією ногою на платформі, опускатися, але при цьому не зміщувати стегно, тримати його в одній площині. Кут опорної ноги не повинен викликати біль у коліні, але намагатися опуститися нижче.',
    },
    10: {
      title: 'Переміщення на напівзігнутих',
      description:
        'Надіти гуму (якщо є) на коліна й приставним кроком переміщатися, контролюючи кут опорної ноги, щоб не викликати біль у коліні. Важливо зберігати обраний кут згину колін постійним, не розгойдуючись.',
    },
    11: {
      title: 'Присідання з гумкою',
      description:
        'Зачепити гумку (якщо є) за стовпчик і за обидві ноги та присідати, відчуваючи опір гуми.',
    },
  },
};

const ru = {
  code: 'ru',
  nativeName: 'Русский',
  speechLang: 'ru-RU',
  appName: 'Колено',
  appDescription: 'Интервальный таймер для реабилитации колена',
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
    breakdownStretch: 'Растяжка',
    exerciseSettings: 'Настройки упражнений',
    difficulty: 'Сложность',
    difficultyEasy: 'Лёгкий',
    difficultyMedium: 'Средний',
    difficultyHard: 'Тяжёлый',
    warmup: 'Разминка',
    warmupTime: 'Время разминки',
    stretch: 'Растяжка',
    stretchTime: 'Время растяжки',
    minutes: 'минуты',
    seconds: 'секунды',
    tabataWork: 'Работа табаты',
    tabataRest: 'Отдых табаты',
    sets: 'Круги',
    setsHint: 'повторы работы/отдыха',
    restBetween: 'Отдых между упражнениями',
    appSettings: 'Настройки приложения',
    language: 'Язык',
    theme: 'Тема',
    themeSystem: 'Система',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    exercises: 'Упражнения',
    active: (count) => `Активно: ${count}`,
    start: 'Начать тренировку',
    enableOne: 'Включите хотя бы одно упражнение',
  },

  image: {
    open: 'Открыть изображение крупнее',
    close: 'Закрыть изображение',
  },

  card: {
    tabata: 'Табата',
    regular: 'Обычное',
    legSwap: 'Смена ног',
    duration: 'Длительность',
    minutesPerLeg: 'минуты на одну ногу',
    minutes: 'минуты',
    secondsPerLeg: 'секунды на одну ногу',
    seconds: 'секунды',
    perLeg: 'на одну ногу',
  },

  field: {
    decrease: (label) => `Уменьшить: ${label}`,
    increase: (label) => `Увеличить: ${label}`,
  },

  timer: {
    confirmStop: 'Завершить тренировку и вернуться к настройкам?',
    stop: 'Завершить тренировку',
    getReady: 'Подготовка',
    coolDown: 'Заминка',
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
    stretch: 'Растяжка',
    work: 'Работа',
    rest: 'Отдых',
    firstLeg: 'Первая нога',
    secondLeg: 'Вторая нога',
    exercise: 'Упражнение',
  },

  speech: {
    warmupStart: (title) => `Началась разминка. ${title}`,
    stretchStart: (title) => `Началась растяжка. ${title}`,
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

  stretchExercise: {
    title: 'Растяжка квадрицепса',
    description:
      'Встать ровно, затем опуститься на колено и взять заднюю стопу, подтягивая пятку к ягодице, чтобы растянуть квадрицепс. Повторить на другой ноге.',
  },

  exercises: {
    2: {
      title: 'Вдавливание колена',
      description:
        'Лечь на спину, подложить под колено мягкий валик и вдавливать колено в этот валик, чтобы прочувствовать квадрицепс. Особенно важно тянуть носок ноги на себя, чтобы прочувствовать квадрицепс. Держать мышцу квадрицепца в напряжении на протяжении всего интервала!',
    },
    3: {
      title: 'Поднятие прямой ноги вверх',
      description:
        'Лечь на спину, одна нога на полу, вторую поднять вверх, натягивая носок на себя, чтобы прочувствовать квадрицепс. Держать мышцу квадрицепца в напряжении на протяжении всего интервала! Для дополнительного сопротивления можно использовать резину.',
    },
    4: {
      title: 'Отведение ноги вперёд с фитболом',
      description:
        'Сесть на стул, поставить колено в 90 градусов и вдавливать фитбол ногой в стену. Контролировать силу надавливания, чтобы не было резкой боли. Держать мышцу квадрицепца в напряжении на протяжении всего интервала!',
    },
    5: {
      title: 'Оттяжка колена резиной назад',
      description:
        'Привязать резину к столбику, одеть одну ногу в резину и отводить её назад, вставая на носок и на пятку. Держать мышцу квадрицепца в напряжении на протяжении всего интервала!',
    },
    6: {
      title: 'Стульчик с фитболом у стены',
      description: 'Подложить к спине фитбол(если есть), опуститься плавно под 90 градусов и удерживать это положение. Если при 90 градусах резкая боль, то уменьшить угол до комфортного для вас. Держать мышцу квадрицепца в напряжении на протяжении всего интервала!',
    },
    7: {
      title: 'Ягодичный мост',
      description: 'Лечь на пол и поднять ягодицы вверх, удерживая в них напряжение. Если легко, то можно становиться на носочки. Держать мышцу квадрицепца и ягодиц в напряжении на протяжении всего интервала!',
    },
    8: {
      title: 'Отведение ноги на полусогнутом колене',
      description:
        'Встать на одну ногу, слегка согнув колено, и отводить прямую ногу в четыре плоскости: вперёд, вбок, назад и в другой бок. Угол опорной ноги не должен вызывать боль в колене. Постараться держать колено согнутым на протяжении всего интервала!',
    },
    9: {
      title: 'Опускание на платформе',
      description:
        'Стоя одной ногой на платформе, опускаться, но при этом не смещать бедро, держать его в одной плоскости. Угол опорной ноги не должен вызывать боль в колене, но стараться опуститься ниже.',
    },
    10: {
      title: 'Перемещение на полусогнутых',
      description:
        'Надеть резину(если есть) на колени и приставным шагом перемещаться, контролируя угол опорной ноги, чтобы не вызывать боль в колене. Важно сохранять выбранный угол сгиба коленей постоянным, не раскачиваясь.',
    },
    11: {
      title: 'Приседания с резинкой',
      description: 'Зацепить резинку(если есть) за столбик и за обе ноги и приседать, чувствуя сопротивление резины',
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
