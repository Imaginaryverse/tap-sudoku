function formatTime(timeInSeconds: number) {
  const hrs = Math.floor(timeInSeconds / 60 / 60);
  const mins = Math.floor(timeInSeconds / 60) % 60;
  const secs = Math.floor(timeInSeconds - mins * 60);

  let time = '';
  time += hrs ? `${hrs}h ` : '';
  time += mins ? `${mins}min ` : '';
  time += `${secs}s`;

  return time;
}

export default formatTime;
