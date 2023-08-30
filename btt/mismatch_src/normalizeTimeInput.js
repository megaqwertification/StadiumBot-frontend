export default function normalizeTimeInput(input, timeString) {
    if (timeString.match(/^(:?\d\d?:)?\d\d?\.\d$/)) {
      input.value = `${timeString}0`;
    } else if (timeString.match(/^\.\d\d?$/)) {
      input.value = `0${timeString}`;
    } else if (timeString.match(/^(:?\d\d?:)?\d\d?$/)) {
      input.value = `${timeString}.00`;
    }
  }
  