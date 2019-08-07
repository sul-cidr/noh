/* eslint-disable no-underscore-dangle */

export function getTime(element) {
  const timeString = element.getAttribute("datetime");
  const [hhmmss, millis] = timeString.trim().split(".");
  const timeFormat = `01/01/1970 ${hhmmss} GMT`;
  const time = Date.parse(timeFormat) + (millis ? parseInt(millis, 10) : 0);
  return time / 1e3 || 0.0;
}

// Converts time from hh:mm:ss to seconds
export function convertTimeToSeconds(hhmmss) {
  const [ss, mm, hh] = hhmmss.split(":").reverse();
  return Date.UTC(1970, 0, 1, +hh || 0, +mm || 0, +ss || 0) / 1000;
}

// Converts time in seconds to hh:mm:ss
export function convertSecondsToHhmmss(seconds) {
  const timeCode = new Date(seconds * 1000).toISOString().substr(11, 8);
  return timeCode;
}

// Given a grid, return array of filled in data
export function fillGrid(grid, gridLength) {
  if (grid[0].start === 1) {
    grid.unshift({ length: 1, text: "", start: 0 });
  } else if (grid[0].start !== 0) {
    grid.unshift({ length: grid[0].start - 1, text: "", start: 0 });
  }
  const fullData = [];
  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i].start === 0) {
      fullData.push(grid[i]);
    } else {
      if (grid[i].start !== grid[i - 1].length + grid[i - 1].start) {
        fullData.push({
          length: grid[i].start - (grid[i - 1].start + grid[i - 1].length),
          text: "",
          start: grid[i - 1].start + grid[i - 1].length
        });
      }
      fullData.push(grid[i]);
    }
  }
  let sumLengths = 0;
  const lastItem = fullData[fullData.length - 1];
  for (let i = 0; i < fullData.length; i += 1) {
    sumLengths += fullData[i].length;
  }
  if (sumLengths !== gridLength) {
    fullData.push({
      length: gridLength - sumLengths,
      text: "",
      start: lastItem.start + lastItem.length + 1
    });
  }
  return fullData;
}

export function createBeatsArray(grid) {
  const beatsArray = [];
  for (let i = 0; i < grid.length; i += 1) {
    beatsArray[grid[i].start] = grid[i].text;
  }
  return [...Array(beatsArray.length).keys()].map(i => beatsArray[i] || "");
}

export function determinePhraseIndices({
  currentTime,
  duration,
  startTime,
  phrases
}) {
  if (phrases.length === 0) {
    return [null, null, null];
  }
  if (currentTime < startTime) {
    return [null, null, 0];
  }
  // The ugly +1 is here to account for fractions of seconds; not 100%
  //  satisfactory, but doing it properly would mean rewriting a lot of code.
  if (currentTime > startTime + duration + 1) {
    return [phrases.length - 1, null, null];
  }

  const currentPhraseIndex =
    phrases.length -
    (phrases
      .filter(Boolean)
      .reverse()
      .findIndex(phrase => currentTime >= phrase.startTime.value) +
      1);

  const lastPhraseStartTime = phrases[phrases.length - 1].startTime.value;
  const nextPhraseIndex =
    currentTime >= lastPhraseStartTime
      ? null
      : Math.min(currentPhraseIndex + 1, phrases.length - 1);
  const prevPhraseIndex =
    currentPhraseIndex > 0 ? currentPhraseIndex - 1 : null;

  return [prevPhraseIndex, currentPhraseIndex, nextPhraseIndex];
}

// Returns Redux Dev Tools Extension
export function reduxDevTools() {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

// Parse URL Fragments of the form `#key1=val1&key2=val2...` and returns
//  an object of the form `{ key1: val1, key2: val2 ... }`.
export function parseUrlFragment() {
  return window.location.hash
    .slice(1)
    .split("&")
    .reduce((accumulator, kvPair) => {
      const [key, value] = kvPair.split("=");
      return Object.assign({ [key]: value }, accumulator);
    }, {});
}

// Given an integer value or a timestamp of the form <<hh:>mm:>ss, returns
//  an integer value representing the timestamp in seconds.
export function validateTimestamp(timestamp) {
  if (!Number.isNaN(Number(timestamp))) return Number(timestamp);
  if (/^(?:\d{1,2}:)?(?:\d{2}:)?\d{2}$/.exec(timestamp))
    return convertTimeToSeconds(timestamp);
  return false;
}
