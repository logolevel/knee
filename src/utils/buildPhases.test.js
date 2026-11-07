import {
  BOOKEND_REST_SECONDS,
  buildPhases,
  findExerciseStarts,
  getDifficultyByDuration,
  getTotalBreakdown,
  getTotalDuration,
} from './buildPhases.js';
import { formatDuration } from './formatTime.js';
import {
  applyDifficulty,
  defaultExercises,
  defaultSettings,
  getMatchingDifficulty,
  getRegularDurationSeconds,
  mergeExercises,
  mergeSettings,
} from '../data/defaults.js';
import {
  SUPPORTED_LANGUAGES,
  detectLanguage,
  localizeExercises,
  translations,
} from '../i18n/translations.js';
import { isTheme, resolveTheme } from '../theme/theme.js';

const ru = translations.ru;
const en = translations.en;

const settings = {
  warmupTime: 180,
  tabataWorkTime: 10,
  tabataRestTime: 3,
  tabataSets: 10,
  restBetweenExercises: 20,
};

const exercises = [
  { id: '1', title: 'Табата А', type: 'tabata', isActive: true },
  { id: '2', title: 'Регуляр с ногами', type: 'regular', durationMinutes: 3, hasLegSwap: true, isActive: true },
  { id: '3', title: 'Регуляр без смены', type: 'regular', durationMinutes: 2, hasLegSwap: false, isActive: false },
  { id: '4', title: 'Табата Б', type: 'tabata', isActive: true },
];

const phases = buildPhases(settings, exercises, ru);
const enPhases = buildPhases(settings, exercises, en);
const kinds = phases.map((phase) => phase.kind);
const starts = findExerciseStarts(phases);

const tabataA = phases.filter(
  (phase) =>
    phase.exerciseId === '1' && (phase.kind === 'tabata-work' || phase.kind === 'tabata-rest'),
);
const regular = phases.filter((phase) => phase.exerciseId === '2' && phase.kind === 'regular');
const transitions = phases.filter((phase) => phase.kind === 'transition');
const restAfterWarmup = transitions[0];
const firstExerciseRest = transitions.find((phase) => phase.nextExerciseId === '2');

function setNavigator(value) {
  Object.defineProperty(globalThis, 'navigator', { value, configurable: true, writable: true });
}

function shape(value) {
  if (typeof value === 'function') {
    return 'fn';
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]));
  }
  return typeof value;
}

const nonTranslatableKeys = new Set(['code', 'nativeName', 'speechLang']);
const expectedShape = JSON.stringify(shape(ru));
const sameShape = SUPPORTED_LANGUAGES.every((code) => JSON.stringify(shape(translations[code])) === expectedShape);

const idsWithText = defaultExercises.map((exercise) => exercise.id);
const allExercisesTranslated = SUPPORTED_LANGUAGES.every((code) =>
  idsWithText.every((id) => translations[code].exercises[id]?.title && translations[code].exercises[id]?.description),
);

const localized = localizeExercises(defaultExercises, translations.uk);

setNavigator({ languages: ['de-DE', 'uk-UA', 'en-US'], language: 'de-DE' });
const detectedUk = detectLanguage();
setNavigator({ languages: ['ru-RU'], language: 'ru-RU' });
const detectedRu = detectLanguage();
setNavigator({ languages: ['en-GB'], language: 'en-GB' });
const detectedEn = detectLanguage();
setNavigator({ languages: ['de-DE'], language: 'de-DE' });
const detectedFallback = detectLanguage();
setNavigator({ language: 'uk' });
const detectedSingle = detectLanguage();

const checks = [
  ['starts with warmup', phases[0].kind === 'warmup' && phases[0].duration === 180],
  [
    'fixed rest after warmup',
    restAfterWarmup?.kind === 'transition' &&
      restAfterWarmup.duration === BOOKEND_REST_SECONDS &&
      restAfterWarmup.nextExerciseTitle === 'Табата А',
  ],
  ['tabata has 10 work + 9 rest', tabataA.filter((p) => p.kind === 'tabata-work').length === 10 && tabataA.filter((p) => p.kind === 'tabata-rest').length === 9],
  [
    'last tabata round has no rest',
    tabataA.at(-1).kind === 'tabata-work' && tabataA.at(-1).set === 10,
  ],
  ['inactive regular is skipped', !phases.some((phase) => phase.exerciseId === '3')],
  ['leg swap creates two regular phases', regular.length === 2 && regular[1].speech === 'Смена ноги' && regular[0].duration === 180],
  ['transition announces next title', firstExerciseRest.speech === 'Отдых. Следующее упражнение: Регуляр с ногами'],
  ['transition keeps finished exercise id', firstExerciseRest.exerciseId === '1'],
  ['transition points to next exercise image', firstExerciseRest.nextExerciseId === '2'],
  ['three exercise starts', starts.length === 3],
  ['warmup speech', phases[0].speech === 'Началась разминка. Скольжение на пятках'],
  ['warmup title', phases[0].exerciseTitle === 'Скольжение на пятках'],
  ['warmup uses image 1', phases[0].exerciseId === '1'],
  ['tabata work says start', tabataA.find((p) => p.kind === 'tabata-work' && p.set === 1)?.speech === 'Табата А. Старт'],
  ['later tabata work says start only', tabataA.find((p) => p.kind === 'tabata-work' && p.set === 2)?.speech === 'Старт'],
  ['total duration sums all phases', getTotalDuration(settings, exercises) === 180 + 254 + 360 + 40 + BOOKEND_REST_SECONDS],
  [
    'breakdown by type',
    JSON.stringify(getTotalBreakdown(settings, exercises)) ===
      JSON.stringify({ warmup: 180, tabata: 254, regular: 360, rest: 40 + BOOKEND_REST_SECONDS, stretch: 0 }),
  ],
  ['format hours', formatDuration(3725) === '1 h 2 min 5 sec'],
  ['format exact minute hides seconds', formatDuration(60, ru.units) === '1 мин'],
  ['format minute and seconds', formatDuration(75, ru.units) === '1 мин 15 сек'],
  ['format only seconds', formatDuration(30, ru.units) === '30 сек'],
  ['format minutes in ru', formatDuration(840, ru.units) === '14 мин'],
  ['format minutes in uk', formatDuration(840, translations.uk.units) === '14 хв'],
  ['english phases speak english', enPhases[0].speech === 'Warm-up started. Heel slides' && enPhases[0].label === 'Warm-up'],
  ['english leg swap', enPhases.filter((p) => p.kind === 'regular')[1].speech === 'Switch legs'],
  ['english transition', enPhases.find((p) => p.nextExerciseId === '2').speech === 'Rest. Next exercise: Регуляр с ногами'],
  ['phase durations do not depend on language', getTotalDuration(settings, exercises) === enPhases.reduce((sum, p) => sum + p.duration, 0)],
  ['all languages share the same message keys', sameShape],
  ['every default exercise is translated in every language', allExercisesTranslated],
  ['localizeExercises translates by id', localized.find((e) => e.id === '11')?.title === 'Присідання з гумкою'],
  ['localizeExercises keeps settings', localized.find((e) => e.id === '11')?.durationSeconds === 30],
  ['regular duration prefers seconds', getRegularDurationSeconds({ durationSeconds: 45, durationMinutes: 3 }) === 45],
  ['regular duration falls back to minutes', getRegularDurationSeconds({ durationMinutes: 3 }) === 180],
  ['default difficulty is easy', defaultSettings.difficulty === 'easy' && defaultSettings.warmupTime === 60 && defaultSettings.tabataSets === 10],
  ['matching difficulty detects easy defaults', getMatchingDifficulty(defaultSettings, defaultExercises) === 'easy'],
  [
    'applyDifficulty writes hard preset',
    applyDifficulty('hard', defaultExercises).settings.tabataWorkTime === 15 &&
      applyDifficulty('hard', defaultExercises).exercises.find((e) => e.id === '8')?.durationSeconds === 120,
  ],
  [
    'matching difficulty detects medium',
    getMatchingDifficulty(
      { ...defaultSettings, ...applyDifficulty('medium', defaultExercises).settings },
      applyDifficulty('medium', defaultExercises).exercises,
    ) === 'medium',
  ],
  ['legacy settings without difficulty become easy', mergeSettings({ warmupTime: 180 }).difficulty === 'easy' && mergeSettings({ warmupTime: 180 }).warmupTime === 60],
  ['legacy minutes migrate to easy seconds', mergeExercises([{ id: '8', type: 'regular', durationMinutes: 2, isActive: true }]).find((e) => e.id === '8')?.durationSeconds === 30],
  ['saved seconds are kept', mergeExercises([{ id: '8', type: 'regular', durationSeconds: 90, isActive: true }]).find((e) => e.id === '8')?.durationSeconds === 90],
  ['duration color follows easy preset', getDifficultyByDuration(defaultSettings, defaultExercises) === 'easy'],
  [
    'small easy tweak still maps to easy',
    getDifficultyByDuration({ ...defaultSettings, warmupTime: 75 }, defaultExercises) === 'easy',
  ],
  [
    'duration color follows hard preset',
    getDifficultyByDuration(
      applyDifficulty('hard', defaultExercises).settings,
      applyDifficulty('hard', defaultExercises).exercises,
    ) === 'hard',
  ],
  [
    'time halfway to medium maps to medium',
    getDifficultyByDuration(
      applyDifficulty('medium', defaultExercises).settings,
      applyDifficulty('medium', defaultExercises).exercises,
    ) === 'medium',
  ],
  ['localizeExercises leaves unknown ids alone', localizeExercises([{ id: 'x', title: 'Custom' }], translations.en)[0].title === 'Custom'],
  ['detect: first supported device language', detectedUk === 'uk'],
  ['detect: russian', detectedRu === 'ru'],
  ['detect: english region variant', detectedEn === 'en'],
  ['detect: unsupported falls back to english', detectedFallback === 'en'],
  ['detect: only navigator.language', detectedSingle === 'uk'],
  ['non translatable keys are present', SUPPORTED_LANGUAGES.every((code) => [...nonTranslatableKeys].every((key) => translations[code][key]))],
  [
    'app names follow language',
    translations.en.appName === 'Knee' &&
      translations.uk.appName === 'Коліно' &&
      translations.ru.appName === 'Колено',
  ],
  ['isTheme accepts system light dark', isTheme('system') && isTheme('light') && isTheme('dark') && !isTheme('auto')],
  ['resolveTheme system follows device', resolveTheme('system', true) === 'dark' && resolveTheme('system', false) === 'light'],
  ['resolveTheme manual wins', resolveTheme('light', true) === 'light' && resolveTheme('dark', false) === 'dark'],
];

const stretchSettings = { ...settings, stretchTime: 180 };
const stretchPhases = buildPhases(stretchSettings, exercises, ru);
const stretchStarts = findExerciseStarts(stretchPhases);
const lastStretch = stretchPhases.at(-1);

checks.push(
  ['no stretch when time is 0', !phases.some((phase) => phase.kind === 'stretch')],
  ['ends with stretch', lastStretch.kind === 'stretch' && lastStretch.duration === 180],
  ['stretch uses image 12', lastStretch.exerciseId === '12'],
  ['stretch title', lastStretch.exerciseTitle === 'Растяжка квадрицепса'],
  ['stretch speech', lastStretch.speech === 'Началась растяжка. Растяжка квадрицепса'],
  [
    'stretch is a skippable start',
    stretchStarts.length === 4 && stretchPhases[stretchStarts[3]].kind === 'stretch',
  ],
  [
    'fixed rest before stretch',
    stretchPhases.at(-2).kind === 'transition' &&
      stretchPhases.at(-2).duration === BOOKEND_REST_SECONDS &&
      stretchPhases.at(-2).nextKind === 'stretch',
  ],
  [
    'no rest after warmup when warmup is off',
    buildPhases({ ...settings, warmupTime: 0 }, exercises)[0].kind !== 'warmup' &&
      buildPhases({ ...settings, warmupTime: 0 }, exercises)[0].kind !== 'transition',
  ],
  [
    'breakdown includes stretch',
    JSON.stringify(getTotalBreakdown(stretchSettings, exercises)) ===
      JSON.stringify({
        warmup: 180,
        tabata: 254,
        regular: 360,
        rest: 40 + BOOKEND_REST_SECONDS * 2,
        stretch: 180,
      }),
  ],
  [
    'english stretch speech',
    buildPhases(stretchSettings, exercises, en).at(-1).speech ===
      'Stretching started. Quadriceps stretch',
  ],
);

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(failed.map(([name]) => name));
  console.error({ kinds, starts, transition: transitions[0] });
  process.exit(1);
}

console.log(`ok ${checks.length} checks, ${phases.length} phases`);
