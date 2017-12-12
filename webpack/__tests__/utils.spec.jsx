import utils from "../utils";

describe("getTime", () => {
  test("it converts time expressed in hh:mm:ss.mmm to seconds.millis", () => {
    const element = {};
    element.getAttribute = () => "01:01:01.001";
    const expectedTime = 3661.001;
    expect(utils.getTime(element)).toEqual(expectedTime);
  });

  test("it defaults to 0 for invalid times", () => {
    const element = {};
    element.getAttribute = () => "01:01:90.001";
    expect(utils.getTime(element)).toEqual(0);
  });

  test("it defaults to 0 for bad formatted times", () => {
    const element = {};
    element.getAttribute = () => "Dec 1st 2017 01:01:90.001";
    expect(utils.getTime(element)).toEqual(0);
  });
});
