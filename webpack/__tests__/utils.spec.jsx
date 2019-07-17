/* eslint-disable no-underscore-dangle */
import {
  getTime,
  convertTimeToSeconds,
  convertSecondsToHhmmss,
  fillGrid,
  reduxDevTools,
  validateTimestamp
} from "../utils";
import phrases from "./__fixtures__/phrases.json";

describe("getTime", () => {
  test("it converts time expressed in hh:mm:ss.mmm to seconds.millis", () => {
    const element = {};
    element.getAttribute = () => "01:01:01.001";
    const expectedTime = 3661.001;
    expect(getTime(element)).toEqual(expectedTime);
  });

  test("it defaults to 0 for invalid times", () => {
    const element = {};
    element.getAttribute = () => "01:01:90.001";
    expect(getTime(element)).toEqual(0);
  });

  test("it defaults to 0 for bad formatted times", () => {
    const element = {};
    element.getAttribute = () => "Dec 1st 2017 01:01:90.001";
    expect(getTime(element)).toEqual(0);
  });
});

describe("convertTimeToSeconds", () => {
  test("it correctly converts time expressed in hh:mm:ss to seconds", () => {
    const time = "01:01:01";
    const expectedTime = 3661;
    expect(convertTimeToSeconds(time)).toEqual(expectedTime);
  });

  test("it correctly converts time expressed in mm:ss to seconds", () => {
    const time = "42:17";
    const expectedTime = 2537;
    expect(convertTimeToSeconds(time)).toEqual(expectedTime);
  });

  test("it correctly converts time expressed in ss to seconds", () => {
    const time = "17";
    const expectedTime = 17;
    expect(convertTimeToSeconds(time)).toEqual(expectedTime);
  });
});

describe("convertSecondsToHhmmss", () => {
  test("it correctly converts time in seconds to hh:mm:ss", () => {
    const time = 3600;
    expect(convertSecondsToHhmmss(time)).toBe("01:00:00");
  });
});

describe("fillGrid", () => {
  test("it correctly fills in the array of data with data starting at position 2", () => {
    const grid = phrases.phrases[0].nohkan.grid; // eslint-disable-line prefer-destructuring
    const fullData = fillGrid(grid, 13);
    expect(fullData).toMatchSnapshot();
  });
  test("it correctly fills in the array of data with data starting past 2", () => {
    const grid = phrases.phrases[1].nohkan.grid; // eslint-disable-line prefer-destructuring
    const fullData = fillGrid(grid, 13);
    expect(fullData).toMatchSnapshot();
  });
});

describe("reduxDevTools", () => {
  test("it correctly returns the Redux dev tools if available", () => {
    window.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn();
    reduxDevTools();
    expect(window.__REDUX_DEVTOOLS_EXTENSION__).toBeCalled();
  });

  test("it returns nothing if the Redux dev tools are unavailable", () => {
    window.__REDUX_DEVTOOLS_EXTENSION__ = null;
    expect(reduxDevTools()).toBe(null);
  });
});

describe("validateTimestamp", () => {
  test("it correctly returns simple integers", () => {
    const timestamp = "3600";
    const expectedReturn = 3600;
    expect(validateTimestamp(timestamp)).toBe(expectedReturn);
  });

  test("it correctly returns hh:mm:ss-format timestamps as seconds", () => {
    const timestamp = "1:12:54";
    const expectedReturn = 4374;
    expect(validateTimestamp(timestamp)).toBe(expectedReturn);
  });

  test("it returns false for unparseable timestamps", () => {
    const timestamp = "abc";
    const expectedReturn = false;
    expect(validateTimestamp(timestamp)).toBe(expectedReturn);
  });
});
