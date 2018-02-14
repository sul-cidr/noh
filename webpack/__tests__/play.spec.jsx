import React from "react";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";

import App from "../play";
import fixtures from "./__fixtures__/play.json";

describe("<Play>", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {};
    const mockStore = configureMockStore();

    store = mockStore(initialState);
    wrapper = mount(<App store={store} {...fixtures} />);
  });

  it("renders as expected", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
