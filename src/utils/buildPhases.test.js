import { buildPhases, findExerciseStarts } from './buildPhases.js';

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

const phases = buildPhases(settings, exercises);
const kinds = phases.map((phase) => phase.kind);
const starts = findExerciseStarts(phases);

const tabataA = phases.filter((phase) => phase.exerciseId === '1');
const regular = phases.filter((phase) => phase.exerciseId === '2' && phase.kind === 'regular');
const transitions = phases.filter((phase) => phase.kind === 'transition');

const checks = [
  ['starts with warmup', phases[0].kind === 'warmup' && phases[0].duration === 180],
  ['tabata has 10 work + 10 rest', tabataA.filter((p) => p.kind === 'tabata-work').length === 10 && tabataA.filter((p) => p.kind === 'tabata-rest').length === 10],
  ['inactive regular is skipped', !phases.some((phase) => phase.exerciseId === '3')],
  ['leg swap creates two regular phases', regular.length === 2 && regular[1].speech === 'Смена ноги' && regular[0].duration === 180],
  ['transition announces next title', transitions[0].speech.includes('Табата Б') === false && transitions[0].nextExerciseTitle === 'Регуляр с ногами'],
  ['three exercise starts', starts.length === 3],
  ['warmup speech', phases[0].speech === 'Началась разминка. Скольжение на пятках'],
  ['warmup title', phases[0].exerciseTitle === 'Скольжение на пятках'],
  ['tabata work says start', tabataA.find((p) => p.kind === 'tabata-work' && p.set === 1)?.speech === 'Табата А. Старт'],
  ['later tabata work says start only', tabataA.find((p) => p.kind === 'tabata-work' && p.set === 2)?.speech === 'Старт'],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(failed.map(([name]) => name));
  console.error({ kinds, starts, transition: transitions[0] });
  process.exit(1);
}

console.log(`ok ${checks.length} checks, ${phases.length} phases`);
