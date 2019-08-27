import React from "react";
import TestUtils from "react-dom/test-utils";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { DEFAULT_STATE } from "../reducers";
import ScoreControls, {
  Unwrapped as UnwrappedScoreControls
} from "../components/ScoreControls";
import { phrases } from "./__fixtures__/phrases.json";

describe("<ScoreControls>", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const mockStore = configureMockStore();
    const defaultState = DEFAULT_STATE;
    defaultState.currentTime.time = phrases[0].startTime.value;
    store = mockStore(defaultState);
    wrapper = mount(
      <Provider store={store}>
        <ScoreControls
          phrases={phrases}
          startTime={phrases[0].startTime.value}
          duration={2000}
          updateScoreToggles={jest.fn()}
          updateStartTime={jest.fn()}
        />
      </Provider>
    );
  });

  it("renders as expected by default", () => {
    const component = shallow(
      <UnwrappedScoreControls
        updateScoreToggles={jest.fn()}
        updateStartTime={jest.fn()}
        phrases={phrases}
        currentTime={0}
        duration={2000}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected by default at the end of the duration time", () => {
    const component = shallow(
      <UnwrappedScoreControls
        updateScoreToggles={jest.fn()}
        updateStartTime={jest.fn()}
        updStartTime={jest.fn()}
        phrases={phrases}
        currentTime={1500}
        duration={2000}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected by default with a store", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("handles checkbox changes", () => {
    const action = { type: "SET_SCORE_TOGGLES", payload: {} };
    wrapper.find("input").forEach(input => {
      input.simulate("change");
      expect(store.getActions()[0].type).toEqual(action.type);
    });
  });

  it("handles filters popup", () => {
    const component = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ScoreControls
          phrases={phrases}
          startTime={phrases[0].startTime.value}
          duration={2000}
          updateScoreToggles={jest.fn()}
          updateStartTime={jest.fn()}
        />
      </Provider>
    );

    const panel = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "score-controls__filters-popup"
    );
    const button = TestUtils.findRenderedDOMComponentWithClass(
      component,
      "score-controls__filters-button"
    );

    // filters panel starts hidden
    expect(panel.className).toContain("hidden");

    // after a click on the button, it is no longer hidden
    TestUtils.Simulate.click(button);
    expect(panel.className).not.toContain("hidden");

    // clicks on the button when the filters panel is open do not execute the hiding/event-listener-attaching code
    // note: actually clicking on the button when the filters panel is open in a real browser will result in the
    //       panel being closed; this is because the button code is not executed, but the click event bubbles to
    //       the level of document.body, where the attached listener is invoked.  ReactTestUtils doesn't bubble the
    //       events beyond React's own synthetic event system, so that effect is not present in the test environment.
    TestUtils.Simulate.click(button);
    expect(panel.className).not.toContain("hidden");

    // clicks anywhere outside the filters panel will close the panel if it's open
    // note: this includes on the button in normal circumstances -- see above.
    document.body.dispatchEvent(new Event("click"));
    expect(panel.className).toContain("hidden");
  });

  it("handles prev button", () => {
    const mockStore = configureMockStore();
    const defaultState = DEFAULT_STATE;
    defaultState.currentTime.time = phrases[1].startTime.value;
    store = mockStore(defaultState);
    wrapper = mount(
      <Provider store={store}>
        <ScoreControls
          phrases={phrases}
          duration={2000}
          startTime={phrases[0].startTime.value}
          updateScoreToggles={jest.fn()}
          updateStartTime={jest.fn()}
        />
      </Provider>
    );

    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: phrases[0].startTime.value, origin: "ScoreControls" }
    };
    const button = wrapper.find("button.sentence-control__prev").first();
    button.simulate("click");
    expect(store.getActions()[0]).toEqual(action);
  });

  it("handles next button", () => {
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: phrases[1].startTime.value, origin: "ScoreControls" }
    };
    const button = wrapper.find("button.sentence-control__next").first();
    button.simulate("click");
    expect(store.getActions()[0]).toEqual(action);
  });

  it("ignores prev button when currentTime is outside section (earlier)", () => {
    const mockStore = configureMockStore();
    const defaultState = DEFAULT_STATE;
    defaultState.currentTime.time = 0;
    store = mockStore(defaultState);
    wrapper = mount(
      <Provider store={store}>
        <ScoreControls
          phrases={phrases}
          duration={2000}
          startTime={phrases[0].startTime.value}
          updateScoreToggles={jest.fn()}
          updateStartTime={jest.fn()}
        />
      </Provider>
    );

    const action = undefined;
    const button = wrapper.find("button.sentence-control__prev").first();
    button.simulate("click");
    expect(store.getActions()[1]).toEqual(action);
  });

  it("ignores next button when currentTime is outside section (later)", () => {
    const mockStore = configureMockStore();
    const defaultState = DEFAULT_STATE;
    const duration = 2000;
    defaultState.currentTime.time = phrases[0].startTime.value + duration + 10;
    store = mockStore(defaultState);
    wrapper = mount(
      <Provider store={store}>
        <ScoreControls
          phrases={phrases}
          duration={duration}
          startTime={phrases[0].startTime.value}
          updateScoreToggles={jest.fn()}
          updateStartTime={jest.fn()}
        />
      </Provider>
    );

    const action = undefined;
    const button = wrapper.find("button.sentence-control__next").first();
    button.simulate("click");
    expect(store.getActions()[1]).toEqual(action);
  });
});
