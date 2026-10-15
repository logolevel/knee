import {
  buildPhases,
  findExerciseStarts,
  getTotalBreakdown,
  getTotalDuration,
} from './buildPhases.js';
import { formatDuration } from './formatTime.js';
import { defaultExercises } from '../data/defaults.js';
import {
  SUPPORTED_LANGUAGES,
  detectLanguage,
  localizeExercises,
  translations,
} from '../i18n/translations.js';

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

const tabataA = phases.filter((phase) => phase.exerciseId === '1');
const regular = phases.filter((phase) => phase.exerciseId === '2' && phase.kind === 'regular');
const transitions = phases.filter((phase) => phase.kind === 'transition');

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
  ['tabata has 10 work + 10 rest', tabataA.filter((p) => p.kind === 'tabata-work').length === 10 && tabataA.filter((p) => p.kind === 'tabata-rest').length === 10],
  ['inactive regular is skipped', !phases.some((phase) => phase.exerciseId === '3')],
  ['leg swap creates two regular phases', regular.length === 2 && regular[1].speech === 'Смена ноги' && regular[0].duration === 180],
  ['transition announces next title', transitions[0].speech === 'Отдых. Следующее упражнение: Регуляр с ногами'],
  ['transition keeps finished exercise id', transitions[0].exerciseId === '1'],
  ['transition points to next exercise image', transitions[0].nextExerciseId === '2'],
  ['three exercise starts', starts.length === 3],
  ['warmup speech', phases[0].speech === 'Началась разминка. Скольжение на пятках'],
  ['warmup title', phases[0].exerciseTitle === 'Скольжение на пятках'],
  ['warmup uses image 1', phases[0].exerciseId === '1'],
  ['tabata work says start', tabataA.find((p) => p.kind === 'tabata-work' && p.set === 1)?.speech === 'Табата А. Старт'],
  ['later tabata work says start only', tabataA.find((p) => p.kind === 'tabata-work' && p.set === 2)?.speech === 'Старт'],
  ['total duration sums all phases', getTotalDuration(settings, exercises) === 180 + 260 + 360 + 40],
  [
    'breakdown by type',
    JSON.stringify(getTotalBreakdown(settings, exercises)) ===
      JSON.stringify({ warmup: 180, tabata: 260, regular: 360, rest: 40 }),
  ],
  ['format hours', formatDuration(3725) === '1 h 2 min 5 sec'],
  ['format minutes in ru', formatDuration(840, ru.units) === '14 мин'],
  ['format minutes in uk', formatDuration(840, translations.uk.units) === '14 хв'],
  ['english phases speak english', enPhases[0].speech === 'Warm-up started. Heel slides' && enPhases[0].label === 'Warm-up'],
  ['english leg swap', enPhases.filter((p) => p.kind === 'regular')[1].speech === 'Switch legs'],
  ['english transition', enPhases.find((p) => p.kind === 'transition').speech === 'Rest. Next exercise: Регуляр с ногами'],
  ['phase durations do not depend on language', getTotalDuration(settings, exercises) === enPhases.reduce((sum, p) => sum + p.duration, 0)],
  ['all languages share the same message keys', sameShape],
  ['every default exercise is translated in every language', allExercisesTranslated],
  ['localizeExercises translates by id', localized.find((e) => e.id === '11')?.title === 'Присідання з гумкою'],
  ['localizeExercises keeps settings', localized.find((e) => e.id === '11')?.durationMinutes === 1],
  ['localizeExercises leaves unknown ids alone', localizeExercises([{ id: 'x', title: 'Custom' }], translations.en)[0].title === 'Custom'],
  ['detect: first supported device language', detectedUk === 'uk'],
  ['detect: russian', detectedRu === 'ru'],
  ['detect: english region variant', detectedEn === 'en'],
  ['detect: unsupported falls back to english', detectedFallback === 'en'],
  ['detect: only navigator.language', detectedSingle === 'uk'],
  ['non translatable keys are present', SUPPORTED_LANGUAGES.every((code) => [...nonTranslatableKeys].every((key) => translations[code][key]))],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(failed.map(([name]) => name));
  console.error({ kinds, starts, transition: transitions[0] });
  process.exit(1);
}

console.log(`ok ${checks.length} checks, ${phases.length} phases`);
