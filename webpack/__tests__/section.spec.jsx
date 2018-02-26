import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";

import App from "../section";
import fixtures from "./__fixtures__/section.json";
import fixturesNoPhrases from "./__fixtures__/section-no-phrases.json";

describe("<Section>", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      currentTime: 0,
      isPlaying: false,
      startTime: 0,
      currentPhraseID: "I/1"
    };
    const mockStore = configureMockStore();

    store = mockStore(initialState);
    wrapper = mount(<App store={store} {...fixtures} />);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as expected with no phrases", () => {
    const component = mount(<App store={store} {...fixturesNoPhrases} />);
    expect(component).toMatchSnapshot();
  });

  it("toggles highlighted-text/libretto", () => {
    const containerSelector = ".highlighted-text__container";
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true); // on by default
    const h3 = wrapper.find(`${containerSelector} h3`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(false);
  });

  it("toggles shodan-timeline/section map", () => {
    const containerSelector = ".shodan-timeline__container";
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(false); // off by default
    const h3 = wrapper.find(`${containerSelector} h3`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true);
  });

  it("highlighted-text/libretto does not toggle if an element other than H3 gets clicked", () => {
    const containerSelector = ".highlighted-text__container";
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true); // on by default
    const h3 = wrapper.find(`${containerSelector} div`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true);
  });

  it("shodan-timeline/section map  does not toggle if an element other than H3 gets clicked", () => {
    const containerSelector = ".shodan-timeline__container";
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(false); // off by default
    const h3 = wrapper.find(`${containerSelector} div`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(false);
  });
});
