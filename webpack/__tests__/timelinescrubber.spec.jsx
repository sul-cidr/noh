import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import TestUtils from "react-dom/test-utils";
import configureMockStore from "redux-mock-store";

import { DEFAULT_STATE } from "../reducers";
import { setIsPlaying } from "../actionCreators";
import TimelineScrubber, {
  Unwrapped as UnwrappedTimelineScrubber,
  mapDispatchToProps
} from "../components/TimelineScrubber";

describe("<TimelineScrubber>", () => {
  let store;

  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore(DEFAULT_STATE);
    mount(
      <Provider store={store}>
        <TimelineScrubber
          startTime={0}
          duration={100}
          updateCurrentTime={jest.fn()}
          setIsPlaying={value =>
            store.dispatch(setIsPlaying({ value, origin: "TimelineScrubber" }))
          }
        />
      </Provider>
    );
  });

  it("renders as expected by default", () => {
    const component = mount(
      <UnwrappedTimelineScrubber
        startTime={0}
        currentTime={0}
        duration={100}
        updateCurrentTime={jest.fn()}
        setIsPlaying={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("tracks progress appropriately (when updated from upstream)", () => {
    const component = mount(
      <UnwrappedTimelineScrubber
        startTime={0}
        currentTime={0}
        duration={100}
        updateCurrentTime={jest.fn()}
        setIsPlaying={jest.fn()}
      />
    );
    expect(component.state().progress).toBe(0);
    component.setProps({ currentTime: 80 });
    expect(component.state().progress).toBe(0.8);
  });

  it("updates progress appropriately (when interacting with the component)", () => {
    const component = mount(
      <UnwrappedTimelineScrubber
        startTime={0}
        currentTime={0}
        duration={100}
        updateCurrentTime={jest.fn()}
        setIsPlaying={jest.fn()}
      />
    );

    component.instance().scrubberContainer = {
      current: { offsetParent: { offsetLeft: 0 }, offsetWidth: 100 }
    };
    component.instance().scrubberHandle = { current: { offsetWidth: 16 } };

    component.instance().handleMouseDown({ pageX: 50 });
    expect(component.state().progress).toBe(0.5);

    // not sure why I have to set this again here, but...
    component.instance().scrubberContainer = {
      current: { offsetParent: { offsetLeft: 0 }, offsetWidth: 100 }
    };

    // test mouseMove
    component.instance().handleMouseMove({ pageX: 75 });
    expect(component.state().progress).toBe(0.75);

    // on mouseUp
    component.instance().handleMouseUp();
    expect(component.state().mouseDown).toBe(false);
    expect(component.state().progress).toBe(0.75);

    // with mouseDown === true, mouseMove should not affect progress
    component.instance().handleMouseMove({ pageX: 15 });
    expect(component.state().progress).toBe(0.75);

    // with mouseDown === true, mouseUp should not affect progress
    component.instance().handleMouseUp();
    expect(component.state().mouseDown).toBe(false);
    expect(component.state().progress).toBe(0.75);

    // mouseWheel with a positive deltaY should advance the video by 2%
    component
      .instance()
      .handleMouseWheel({ nativeEvent: { deltaY: 50 }, persist: () => null });
    expect(component.state().progress).toBe(0.77);

    // mouseWheel with a negative deltaY should rewind (retreat?!) the video by 2%
    component
      .instance()
      .handleMouseWheel({ nativeEvent: { deltaY: -50 }, persist: () => null });
    expect(component.state().progress).toBe(0.75);

    // mouseWheel with a positive deltaX should rewind the video by 2%
    component
      .instance()
      .handleMouseWheel({ nativeEvent: { deltaX: 50 }, persist: () => null });
    expect(component.state().progress).toBe(0.73);

    // mouseWheel with a negative deltaX should advance the video by 2%
    component
      .instance()
      .handleMouseWheel({ nativeEvent: { deltaX: -50 }, persist: () => null });
    expect(component.state().progress).toBe(0.75);
  });

  it("dispatches the right function for updateCurrentTime", () => {
    const event = { currentTime: { time: 10, origin: "TimelineScrubber" } };
    const payload = { payload: event.currentTime, type: "SET_CURRENT_TIME" };
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updateCurrentTime(event.currentTime.time);
    expect(dispatch).toHaveBeenCalledWith(payload);
  });

  it("resets the scrubber on mouseUp anywhere on the page", () => {
    const component = TestUtils.renderIntoDocument(
      <UnwrappedTimelineScrubber
        startTime={0}
        currentTime={0}
        duration={100}
        updateCurrentTime={jest.fn()}
        setIsPlaying={jest.fn()}
      />
    );

    jest.spyOn(component, "handleMouseUp");
    component.scrubberContainer = {
      current: { offsetParent: { offsetLeft: 0 } }
    };

    component.handleMouseDown({ PageX: 50 });
    expect(component.state.mouseDown).toBe(true);
    window.dispatchEvent(new Event("mouseup"));
    expect(component.handleMouseUp).toHaveBeenCalled();
    expect(component.state.mouseDown).toBe(false);
  });
});
