import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import ScoreControls, {
  Unwrapped as UnwrappedScoreControls
} from "../components/ScoreControls";

describe("<ScoreControls>", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const mockStore = configureMockStore();
    const initialState = {};
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ScoreControls updateScoreToggles={jest.fn()} duration={100} />
      </Provider>
    );
  });

  it("renders as expected by default", () => {
    const component = shallow(<UnwrappedScoreControls duration={100} />);
    expect(component).toMatchSnapshot();
  });

  it("renders as expected by default with a store", () => {
    expect(wrapper).toMatchSnapshot();
  });

  fit("handles checkbox changes", () => {
    const action = { type: "SET_SCORE_TOGGLES", payload: {} };
    wrapper.find("input").forEach(input => {
      input.simulate("change");
      expect(store.getActions()[0].type).toEqual(action.type);
    });
  });
});
