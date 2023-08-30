const readableTimeFormat = /^(?:(\d\d?):)?(\d\d?\.\d\d?)$/;

/**
 * converts "naive" user inputted time into frames
 * @param time raw inputted time in form (mm:)ss:cc
 */
export function timeToFrames(timeString) {
  const timeMatch = timeString.match(readableTimeFormat);
  if (!timeMatch) {
    return null;
  }
  const [, minutes, seconds] = timeMatch;
  const time = +(minutes || 0) * 60 + +seconds;
  return Math.round(time * 60);
}

export function framesToTime(frames) {
  const minutes = Math.floor(frames / 3600);
  const seconds = Math.floor((frames / 60) % 60);
  const paddedSeconds = seconds.toString().padStart(2, "0");
  const centiseconds = Math.floor(((frames % 60) * 99) / 59);
  const paddedCentis = centiseconds.toString().padStart(2, "0");

  return minutes > 0
    ? `${minutes}:${paddedSeconds}.${paddedCentis}`
    : `${seconds}.${paddedCentis}`;
}
