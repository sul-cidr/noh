import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import ShodanTimelineBlock, {
  Unwrapped as UnwrappedShodanTimelineBlock
} from "../components/ShodanTimelineBlock";

describe("<ShodanTimelineBlock>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <UnwrappedShodanTimelineBlock
        name="Kiri"
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with url", () => {
    const component = shallow(
      <UnwrappedShodanTimelineBlock
        name="Kiri"
        url="/kokaji/kiri"
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with startTime", () => {
    const component = shallow(
      <UnwrappedShodanTimelineBlock
        name="Kiri"
        startTime={10}
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with subdivision info", () => {
    const danInfo = { number: "5", value: "Shite Exits" };
    const component = shallow(
      <UnwrappedShodanTimelineBlock
        name="Kiri"
        dan={danInfo}
        startTime={10}
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with current section highlighted", () => {
    const component = shallow(
      <UnwrappedShodanTimelineBlock
        name="Kiri"
        url={window.location.pathname}
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("navigates if clicked and url", () => {
    window.location.assign = jest.fn();
    const url = "/kokaji/kiri";
    const wrapper = mount(
      <Provider store={configureMockStore()({})}>
        <ShodanTimelineBlock
          name="Kiri"
          url={url}
          left="8%"
          intensity="15"
          maxIntensity={21}
          duration={10}
          totalDuration={30}
        />
      </Provider>
    );
    wrapper.find("div").simulate("click");
    expect(window.location.assign).toBeCalledWith(url);
  });

  it("does not navigate if clicked and no url", () => {
    window.location.assign = jest.fn();
    const wrapper = mount(
      <Provider store={configureMockStore()({})}>
        <ShodanTimelineBlock
          name="Kiri"
          url=""
          left="8%"
          intensity="15"
          maxIntensity={21}
          duration={10}
          totalDuration={30}
        />
      </Provider>
    );
    wrapper.find("div").simulate("click");
    expect(window.location.assign).not.toBeCalled();
  });

  it("triggers the SET_CURRENT_TIME action if startTime is present but url is not", () => {
    const initialState = { startTime: 10 };
    const mockStore = configureMockStore();
    const store = mockStore(initialState);
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: 50, origin: "ShodanTimelineBlock" }
    };
    const wrapper = mount(
      <Provider store={store}>
        <ShodanTimelineBlock
          name="Kiri"
          startTime={50}
          left="8%"
          intensity="15"
          maxIntensity={21}
          duration={10}
          totalDuration={30}
        />
      </Provider>
    );
    wrapper.find("div").simulate("click");
    expect(store.getActions()[0]).toEqual(action);
  });

  it("triggers the SET_CURRENT_TIME action if both url and startTime are present", () => {
    window.location.assign = jest.fn();
    const initialState = { startTime: 10 };
    const mockStore = configureMockStore();
    const store = mockStore(initialState);
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: 50, origin: "ShodanTimelineBlock" }
    };
    const url = "/kokaji/kiri";
    const wrapper = mount(
      <Provider store={store}>
        <ShodanTimelineBlock
          name="Kiri"
          url={url}
          startTime={50}
          left="8%"
          intensity="15"
          maxIntensity={21}
          duration={10}
          totalDuration={30}
        />
      </Provider>
    );
    wrapper.find("div").simulate("click");
    expect(store.getActions()[0]).toEqual(action);
    expect(window.location.assign).not.toBeCalled();
  });

  it("does nothing if neither url and startTime are present", () => {
    window.location.assign = jest.fn();
    const mockStore = configureMockStore();
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <ShodanTimelineBlock
          name="Kiri"
          left="8%"
          intensity="15"
          maxIntensity={21}
          duration={10}
          totalDuration={30}
        />
      </Provider>
    );
    wrapper.find("div").simulate("click");
    expect(store.getActions().length).toEqual(0);
    expect(window.location.assign).not.toBeCalled();
  });
});
