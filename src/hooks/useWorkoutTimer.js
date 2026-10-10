import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildPhases, findExerciseStarts, getActiveExercises } from '../utils/buildPhases';
import { formatTime } from '../utils/formatTime';
import { playLongBeep, playShortBeep } from '../utils/audio';
import { cancelSpeech, speak } from '../utils/speech';

export function useWorkoutTimer({ settings, exercises, onComplete }) {
  const [status, setStatus] = useState('idle');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const phasesRef = useRef([]);
  const endsAtRef = useRef(0);
  const remainingRef = useRef(0);
  const statusRef = useRef(status);
  const phaseIndexRef = useRef(0);
  const lastShortBeepRef = useRef(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  useEffect(() => {
    phaseIndexRef.current = phaseIndex;
  }, [phaseIndex]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const enterPhase = useCallback((index) => {
    const phases = phasesRef.current;

    if (index >= phases.length) {
      finishedRef.current = true;
      setStatus('complete');
      cancelSpeech();
      speak('Тренировка завершена');
      onCompleteRef.current?.();
      return;
    }

    const nextIndex = Math.max(0, index);
    const nextPhase = phases[nextIndex];
    if (!nextPhase) {
      return;
    }

    finishedRef.current = false;
    phaseIndexRef.current = nextIndex;
    remainingRef.current = nextPhase.duration;
    endsAtRef.current = Date.now() + nextPhase.duration * 1000;
    lastShortBeepRef.current = null;

    setPhaseIndex(nextIndex);
    setRemaining(nextPhase.duration);
    playLongBeep();

    if (nextPhase.speech) {
      speak(nextPhase.speech);
    }
  }, []);

  const start = useCallback(() => {
    const phases = buildPhases(settings, exercises);
    phasesRef.current = phases;
    finishedRef.current = false;

    if (phases.length === 0) {
      finishedRef.current = true;
      setStatus('complete');
      onCompleteRef.current?.();
      return false;
    }

    setStatus('running');
    enterPhase(0);
    return true;
  }, [enterPhase, exercises, settings]);

  const pause = useCallback(() => {
    if (statusRef.current !== 'running') {
      return;
    }

    const left = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
    remainingRef.current = left;
    setRemaining(left);
    setStatus('paused');
    cancelSpeech();
  }, []);

  const resume = useCallback(() => {
    if (statusRef.current !== 'paused') {
      return;
    }

    endsAtRef.current = Date.now() + remainingRef.current * 1000;
    setStatus('running');
  }, []);

  const togglePause = useCallback(() => {
    if (statusRef.current === 'running') {
      pause();
      return;
    }

    if (statusRef.current === 'paused') {
      resume();
    }
  }, [pause, resume]);

  const stop = useCallback(() => {
    cancelSpeech();
    finishedRef.current = true;
    phasesRef.current = [];
    setStatus('idle');
    setPhaseIndex(0);
    setRemaining(0);
  }, []);

  const nextExercise = useCallback(() => {
    const nextIndex = findExerciseStarts(phasesRef.current).find(
      (index) => index > phaseIndexRef.current,
    );
    if (nextIndex != null) {
      enterPhase(nextIndex);
    }
  }, [enterPhase]);

  const prevExercise = useCallback(() => {
    const current = phasesRef.current[phaseIndexRef.current];
    const starts = findExerciseStarts(phasesRef.current);

    if (!current || current.kind === 'warmup') {
      return;
    }

    if (current.kind === 'transition') {
      const currentStart = starts.find(
        (index) => phasesRef.current[index].exerciseId === current.exerciseId,
      );
      if (currentStart != null) {
        enterPhase(currentStart);
      }
      return;
    }

    const previousIndex = [...starts].reverse().find((index) => {
      const phase = phasesRef.current[index];
      return index < phaseIndexRef.current && phase.exerciseId !== current.exerciseId;
    });

    if (previousIndex != null) {
      enterPhase(previousIndex);
    }
  }, [enterPhase]);

  const nextSet = useCallback(() => {
    const phases = phasesRef.current;
    const current = phases[phaseIndexRef.current];
    if (!current || (current.kind !== 'tabata-work' && current.kind !== 'tabata-rest')) {
      return;
    }

    const nextIndex = phases.findIndex(
      (phase, index) =>
        index > phaseIndexRef.current &&
        phase.exerciseId === current.exerciseId &&
        phase.kind === 'tabata-work' &&
        phase.set === current.set + 1,
    );

    if (nextIndex !== -1) {
      enterPhase(nextIndex);
    }
  }, [enterPhase]);

  const prevSet = useCallback(() => {
    const phases = phasesRef.current;
    const current = phases[phaseIndexRef.current];
    if (!current || (current.kind !== 'tabata-work' && current.kind !== 'tabata-rest')) {
      return;
    }

    const targetSet = current.kind === 'tabata-rest' ? current.set : current.set - 1;
    if (targetSet < 1) {
      return;
    }

    const previousIndex = phases.findIndex(
      (phase) =>
        phase.exerciseId === current.exerciseId &&
        phase.kind === 'tabata-work' &&
        phase.set === targetSet,
    );

    if (previousIndex !== -1) {
      enterPhase(previousIndex);
    }
  }, [enterPhase]);

  useEffect(() => {
    if (status !== 'running') {
      return undefined;
    }

    const tick = () => {
      if (finishedRef.current) {
        return;
      }

      const left = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
      remainingRef.current = left;
      setRemaining(left);

      if (left >= 1 && left <= 3) {
        const key = `${phaseIndexRef.current}-${left}`;
        if (lastShortBeepRef.current !== key) {
          lastShortBeepRef.current = key;
          playShortBeep();
        }
      }

      if (left === 0) {
        enterPhase(phaseIndexRef.current + 1);
      }
    };

    const intervalId = window.setInterval(tick, 200);
    return () => window.clearInterval(intervalId);
  }, [enterPhase, status]);

  const phase = phasesRef.current[phaseIndex] ?? null;
  const activeExercises = useMemo(() => getActiveExercises(exercises), [exercises]);
  const starts = findExerciseStarts(phasesRef.current);
  const displayExerciseId =
    phase?.kind === 'transition' ? phase.nextExerciseId : phase?.exerciseId ?? null;
  const exerciseNumber = displayExerciseId
    ? activeExercises.findIndex((exercise) => exercise.id === displayExerciseId) + 1
    : 0;
  const isTabata = phase?.kind === 'tabata-work' || phase?.kind === 'tabata-rest';
  const canNextExercise = starts.some((index) => index > phaseIndex);
  const canPrevExercise = Boolean(
    phase &&
      phase.kind !== 'warmup' &&
      (phase.kind === 'transition' ||
        starts.some(
          (index) =>
            index < phaseIndex && phasesRef.current[index].exerciseId !== phase.exerciseId,
        )),
  );

  return {
    status,
    isPaused: status === 'paused',
    isRunning: status === 'running' || status === 'paused',
    phase,
    phaseIndex,
    remaining,
    formattedTime: formatTime(remaining),
    progress: phase?.duration ? 1 - remaining / phase.duration : 0,
    exerciseNumber: Math.max(0, exerciseNumber),
    totalExercises: activeExercises.length,
    canPrevSet: Boolean(
      isTabata && (phase.set > 1 || phase.kind === 'tabata-rest'),
    ),
    canNextSet: Boolean(isTabata && phase.set < phase.totalSets),
    canPrevExercise,
    canNextExercise,
    isTabata,
    start,
    pause,
    resume,
    togglePause,
    stop,
    nextExercise,
    prevExercise,
    nextSet,
    prevSet,
  };
}
