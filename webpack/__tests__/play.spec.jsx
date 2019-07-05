import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";

import App from "../play";
import fixtures from "./__fixtures__/play.json";
import { DEFAULT_STATE } from "../reducers";

describe("<Play>", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const mockStore = configureMockStore();

    store = mockStore(DEFAULT_STATE);
    wrapper = mount(<App store={store} {...fixtures} />);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("starts at 0 if no valid origin is loaded from sessionStorage", () => {
    expect(store.getState().currentTime.time).toBe(0);
  });
});
