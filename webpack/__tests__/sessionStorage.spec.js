/* eslint-disable no-proto */
import { loadState } from "../sessionStorage";

describe("loadState", () => {
  jest.spyOn(window.sessionStorage.__proto__, "getItem");
  window.sessionStorage.__proto__.getItem = jest.fn();

  test("it calls sessionStorage.getItem", () => {
    loadState();
    expect(sessionStorage.getItem).toHaveBeenCalled();
  });
});
