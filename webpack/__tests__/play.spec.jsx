import React from "react";
import { mount } from "enzyme";
import TestUtils from "react-dom/test-utils";

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

describe("", () => {
  it("", () => {
    const component = TestUtils.renderIntoDocument(<App {...fixtures} />);

    const sectionTitle = TestUtils.findAllInRenderedTree(
      component,
      inst =>
        TestUtils.isDOMComponent(inst) &&
        inst.attributes["data-highlight-shodans"] !== undefined
    );

    const shodanBlock = TestUtils.findAllInRenderedTree(
      component,
      inst =>
        TestUtils.isDOMComponent(inst) &&
        inst.attributes["data-index"] !== undefined &&
        inst.attributes["data-index"].value === "1"
    );

    expect(
      shodanBlock[0].classList.contains("shodan-map__item--highlight")
    ).toBe(false);
    sectionTitle[0].dispatchEvent(new Event("mouseover"));
    expect(
      shodanBlock[0].classList.contains("shodan-map__item--highlight")
    ).toBe(true);
    sectionTitle[0].dispatchEvent(new Event("mouseout"));
    expect(
      shodanBlock[0].classList.contains("shodan-map__item--highlight")
    ).toBe(false);
  });
});
