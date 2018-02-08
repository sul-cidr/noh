export function getTime(element) {
  const timeString = element.getAttribute("datetime");
  const [hhmmss, millis] = timeString.trim().split(".");
  const timeFormat = `01/01/1970 ${hhmmss} GMT`;
  const time = Date.parse(timeFormat) + (millis ? parseInt(millis, 10) : 0);
  return time / 1e3 || 0.0;
}

// Converts time from hh:mm:ss to seconds
export function convertTimeToSeconds(hhmmss) {
  const timeFormat = `01/01/1970 ${hhmmss} GMT`;
  const time = Date.parse(timeFormat);
  return time / 1e3 || 0.0;
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
    } else if (grid[i].start === grid[i - 1].length + grid[i - 1].start) {
      fullData.push(grid[i]);
    } else if (grid[i].start !== grid[i - 1].length + grid[i - 1].start) {
      fullData.push({
        length: grid[i].start - (grid[i - 1].start + grid[i - 1].length),
        text: "",
        start: grid[i - 1].start + grid[i - 1].length
      });
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
