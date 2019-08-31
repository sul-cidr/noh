import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import MasterVideo, {
  Unwrapped as UnwrappedMasterVideo,
  mapDispatchToProps
} from "../components/MasterVideo";

describe("<MasterVideo>", () => {
  it("renders as expected", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo />, {
      attachTo: container
    });
    expect(component).toMatchSnapshot();
    expect(component.instance().video).not.toBe(null);
    expect(component.instance().video).not.toBe(undefined);
  });

  it("updates video currentTime when currentTime prop is set", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo currentTime={10} />, {
      attachTo: container
    });
    component.setProps({ currentTime: 40 });
    expect(component.instance().video.currentTime).toBe(40);
  });

  it("updates video currentTime when currentTime prop is set by a different component", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo currentTime={10} />, {
      attachTo: container
    });
    component.setProps({
      currentTime: 40,
      currentTimeOrigin: "AnotherComponent"
    });
    expect(component.instance().video.currentTime).toBe(40);
  });

  it("does not update video currentTime when currentTime prop is set internally", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo currentTime={10} />, {
      attachTo: container
    });
    component.setProps({ currentTime: 40, currentTimeOrigin: "MasterVideo" });
    expect(component.instance().video.currentTime).toBe(10);
  });

  it("dispatches the right function for updateCurrentTime", () => {
    const event = { target: { currentTime: 10 } };
    const payload = {
      payload: { time: 10, origin: "MasterVideo" },
      type: "SET_CURRENT_TIME"
    };
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updateCurrentTime(event);
    expect(dispatch).toHaveBeenCalledWith(payload);
  });

  describe("HTML5 video playing", () => {
    let wrapper;
    let store;

    beforeEach(() => {
      const initialState = {
        currentTime: { time: 10, origin: "" }
      };
      const mockStore = configureMockStore();

      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <MasterVideo />
        </Provider>
      );
    });

    it("triggers the SET_CURRENT_TIME action with the right payload when seeking", () => {
      const action = {
        type: "SET_CURRENT_TIME",
        payload: { time: 10, origin: "MasterVideo" }
      };
      wrapper.find("video").simulate("seeking");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_CURRENT_TIME action with the right payload when timeupdate", () => {
      const action = {
        type: "SET_CURRENT_TIME",
        payload: { time: 10, origin: "MasterVideo" }
      };
      wrapper.find("video").simulate("timeupdate");
      expect(store.getActions()[0]).toEqual(action);
    });
  });
});
