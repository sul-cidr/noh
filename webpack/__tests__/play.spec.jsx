import React from "react";
import { mount } from "enzyme";

import App from "../play";
import fixtures from "./__fixtures__/play.json";

describe("<Play>", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App {...fixtures} />);
    ({ store } = wrapper.find("Provider").props());
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("starts at 0 if no valid origin is loaded from sessionStorage", () => {
    expect(store.getState().currentTime.time).toBe(0);
  });

  it("sets currentTime appropriately based on URL frag", () => {
    expect(store.getState().currentTime).toEqual({
      time: 0,
      origin: "Kokaji"
    });

    window.location.hash = "#startTime=1000";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    expect(store.getState().currentTime).toEqual({
      time: 1000,
      origin: "URL_FRAG"
    });
  });
});
