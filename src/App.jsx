import { useCallback, useState } from 'react';
import { ConfigurationScreen } from './components/ConfigurationScreen.jsx';
import { ActiveTimerScreen } from './components/ActiveTimerScreen.jsx';
import { WorkoutCompleteScreen } from './components/WorkoutCompleteScreen.jsx';
import { defaultExercises, defaultSettings, mergeExercises, mergeSettings } from './data/defaults';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useWakeLock } from './hooks/useWakeLock';
import { useWorkoutTimer } from './hooks/useWorkoutTimer';
import { initAudio } from './utils/audio';

export default function App() {
  const [settings, setSettings] = useLocalStorage('knee.settings', defaultSettings, {
    deserialize: mergeSettings,
  });
  const [exercises, setExercises] = useLocalStorage('knee.exercises', defaultExercises, {
    deserialize: mergeExercises,
  });
  const [screen, setScreen] = useState('config');

  const handleComplete = useCallback(() => {
    setScreen('complete');
  }, []);

  const timer = useWorkoutTimer({
    settings,
    exercises,
    onComplete: handleComplete,
  });

  useWakeLock(screen === 'workout');

  const handleSettingsChange = (patch) => {
    setSettings((previous) => ({ ...previous, ...patch }));
  };

  const handleExerciseChange = (id, patch) => {
    setExercises((previous) =>
      previous.map((exercise) => (exercise.id === id ? { ...exercise, ...patch } : exercise)),
    );
  };

  const handleStart = () => {
    initAudio();
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      void navigator.wakeLock.request('screen').catch(() => {});
    }
    if (timer.start()) {
      setScreen('workout');
    }
  };

  const handleStop = () => {
    timer.stop();
    setScreen('config');
  };

  if (screen === 'complete') {
    return <WorkoutCompleteScreen onFinish={handleStop} />;
  }

  if (screen === 'workout') {
    return <ActiveTimerScreen timer={timer} onStop={handleStop} />;
  }

  return (
    <ConfigurationScreen
      settings={settings}
      exercises={exercises}
      onSettingsChange={handleSettingsChange}
      onExerciseChange={handleExerciseChange}
      onStart={handleStart}
    />
  );
}
