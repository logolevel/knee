import { useCallback, useState } from 'react';

export function useLocalStorage(key, initialValue, { deserialize } = {}) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue, deserialize));

  const setStoredValue = useCallback(
    (update) => {
      setValue((previous) => {
        const next = typeof update === 'function' ? update(previous) : update;

        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Private mode / quota — keep the in-memory value.
        }

        return next;
      });
    },
    [key],
  );

  return [value, setStoredValue];
}

function readStoredValue(key, initialValue, deserialize) {
  const fallback = typeof initialValue === 'function' ? initialValue() : initialValue;

  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    return deserialize ? deserialize(parsed) : parsed;
  } catch {
    return fallback;
  }
}
