export const preparedTime = (time: number): string => {
  const minutes = Math.floor(time / 60000).toFixed(0);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}
