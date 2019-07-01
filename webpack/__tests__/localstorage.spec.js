/* eslint-disable no-proto */
import { loadState } from "../localStorage";

describe("loadState", () => {
  jest.spyOn(window.localStorage.__proto__, "getItem");
  window.localStorage.__proto__.getItem = jest.fn();

  test("it calls localStorage.getItem", () => {
    loadState();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
