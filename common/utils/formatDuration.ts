export function formatDuration(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (totalMinutes >= 60) {
    return `${hours}h $${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}
