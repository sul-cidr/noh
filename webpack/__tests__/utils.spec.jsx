import { getTime, convertTimeToSeconds } from "../utils";

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

  test("it defaults to 0 for invalid times", () => {
    const time = "01:01:90.001";
    expect(convertTimeToSeconds(time)).toEqual(0);
  });

  test("it defaults to 0 for bad formatted times", () => {
    const time = "Dec 1st 2017 01:01:90.001";
    expect(convertTimeToSeconds(time)).toEqual(0);
  });
});
