let voicesReady = false;

function ensureVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  const markReady = () => {
    voicesReady = true;
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    voicesReady = true;
    return;
  }

  window.speechSynthesis.addEventListener('voiceschanged', markReady, { once: true });
}

function pickRussianVoice() {
  if (!window.speechSynthesis) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang?.toLowerCase().startsWith('ru')) ??
    voices.find((voice) => voice.lang?.toLowerCase().includes('ru')) ??
    null
  );
}

export function cancelSpeech() {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
}

export function speak(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text) {
    return;
  }

  ensureVoices();
  cancelSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voice = pickRussianVoice();
  if (voice) {
    utterance.voice = voice;
  }

  // Some engines ignore speak() if voices are still loading.
  if (!voicesReady) {
    window.setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 80);
    return;
  }

  window.speechSynthesis.speak(utterance);
}
