import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";

import App from "../section";
import fixtures from "./__fixtures__/section.json";
import fixturesNoPhrases from "./__fixtures__/section-no-phrases.json";
import fixturesFirstAndLast from "./__fixtures__/multiple-sections.json";

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
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(false); // off by default
    const h3 = wrapper.find(`${containerSelector} h3`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true);
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
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true); // from previous test
    const h3 = wrapper.find(`${containerSelector} div`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true);
  });

  it("shodan-timeline/section map  does not toggle if an element other than H3 gets clicked", () => {
    const containerSelector = ".shodan-timeline__container";
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true); // from previous test
    const h3 = wrapper.find(`${containerSelector} div`).first();
    h3.simulate("click");
    expect(wrapper.find(containerSelector).hasClass("is-open")).toEqual(true);
  });
});

describe("<Section> that is first in play", () => {
  it("renders as expected", () => {
    const initialState = {
      currentTime: 0,
      isPlaying: false,
      startTime: 0,
      currentPhraseID: "I/1"
    };
    const mockStore = configureMockStore();

    const store = mockStore(initialState);
    const wrapper = mount(<App store={store} {...fixturesFirstAndLast[0]} />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Section> that is last in play", () => {
  it("renders as expected", () => {
    const initialState = {
      currentTime: 3401,
      isPlaying: false,
      startTime: 3401,
      currentPhraseID: "I/1"
    };
    const mockStore = configureMockStore();

    const store = mockStore(initialState);
    const wrapper = mount(<App store={store} {...fixturesFirstAndLast[1]} />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe("<Section> with a URL frag", () => {
  it("sets currentTime appropriately based on URL frag", () => {
    const wrapper = mount(<App {...fixtures} />);
    const { store } = wrapper.find("Provider").props();
    store.dispatch = jest.fn();

    window.location.hash = "#startTime=1000";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    const payload = {
      payload: { time: 1000, origin: "URL_FRAG" },
      type: "SET_CURRENT_TIME"
    };
    expect(store.dispatch).toHaveBeenCalledWith(payload);
  });
});
