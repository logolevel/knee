export function formatDuration(totalSeconds, units = { h: 'h', min: 'min', sec: 'sec' }) {
  const safe = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} ${units.h}`);
  }
  if (minutes > 0 || hours > 0) {
    parts.push(`${minutes} ${units.min}`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} ${units.sec}`);
  }

  return parts.join(' ');
}

export function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
