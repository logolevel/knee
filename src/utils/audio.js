let audioContext = null;

function getAudioContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) {
    return null;
  }

  if (!audioContext) {
    audioContext = new Context();
  }

  return audioContext;
}

export function initAudio() {
  const context = getAudioContext();
  if (!context) {
    return null;
  }

  if (context.state === 'suspended') {
    void context.resume();
  }

  // Silent tick unlocks audio on iOS after a user gesture.
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  gain.gain.value = 0.0001;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.02);

  return context;
}

export function playBeep({
  frequency = 880,
  duration = 0.15,
  type = 'sine',
  volume = 0.28,
} = {}) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    void context.resume();
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

export function playShortBeep() {
  playBeep({
    frequency: 980,
    duration: 0.12,
    type: 'sine',
    volume: 0.26,
  });
}

export function playLongBeep() {
  playBeep({
    frequency: 620,
    duration: 0.45,
    type: 'sine',
    volume: 0.3,
  });
}
