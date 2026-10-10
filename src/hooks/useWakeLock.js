import { useEffect, useRef, useState } from 'react';

export function useWakeLock(enabled) {
  const sentinelRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!enabled || typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return undefined;
    }

    let cancelled = false;

    const release = () => {
      const sentinel = sentinelRef.current;
      sentinelRef.current = null;
      setIsActive(false);

      if (sentinel) {
        void sentinel.release().catch(() => {});
      }
    };

    const request = async () => {
      if (cancelled || document.visibilityState !== 'visible') {
        return;
      }

      try {
        const sentinel = await navigator.wakeLock.request('screen');
        if (cancelled) {
          void sentinel.release();
          return;
        }

        sentinelRef.current = sentinel;
        setIsActive(true);
        sentinel.addEventListener('release', () => {
          if (sentinelRef.current === sentinel) {
            sentinelRef.current = null;
            setIsActive(false);
          }
        });
      } catch {
        setIsActive(false);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void request();
      }
    };

    void request();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      release();
    };
  }, [enabled]);

  return isActive;
}
