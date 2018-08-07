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

  it("dispatches the right function for updateCurrentTime", () => {
    const event = { target: { currentTime: 10 } };
    const payload = { payload: 10, type: "SET_CURRENT_TIME" };
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updateCurrentTime(event);
    expect(dispatch).toHaveBeenCalledWith(payload);
  });

  it("dispatches the right function for updateIsPlaying", () => {
    const isPlaying = true;
    const payload = { payload: true, type: "SET_IS_PLAYING" };
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updateIsPlaying(isPlaying);
    expect(dispatch).toHaveBeenCalledWith(payload);
  });

  describe("HTML5 video playing", () => {
    let wrapper;
    let store;

    beforeEach(() => {
      const initialState = { currentTime: 10, isPlaying: true };
      const mockStore = configureMockStore();

      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <MasterVideo />
        </Provider>
      );
    });

    it("triggers the SET_IS_PLAYING action with the right payload when play", () => {
      const action = { type: "SET_IS_PLAYING", payload: false };
      wrapper.find("video").simulate("play");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_IS_PLAYING action with the right payload when pause", () => {
      const action = { type: "SET_IS_PLAYING", payload: false };
      wrapper.find("video").simulate("pause");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_IS_PLAYING action with the right payload when ended", () => {
      const action = { type: "SET_IS_PLAYING", payload: false };
      wrapper.find("video").simulate("ended");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_IS_PLAYING action with the right payload when stalled", () => {
      const action = { type: "SET_IS_PLAYING", payload: false };
      wrapper.find("video").simulate("stalled");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_IS_PLAYING action with the right payload when seeking", () => {
      const action = { type: "SET_IS_PLAYING", payload: false };
      wrapper.find("video").simulate("seeking");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_IS_PLAYING action with the right payload when waiting", () => {
      const action = { type: "SET_IS_PLAYING", payload: false };
      wrapper.find("video").simulate("waiting");
      expect(store.getActions()[0]).toEqual(action);
    });

    it("triggers the SET_CURRENT_TIME action with the right payload when timeupdate", () => {
      const action = { type: "SET_CURRENT_TIME", payload: 10 };
      wrapper.find("video").simulate("timeupdate");
      expect(store.getActions()[0]).toEqual(action);
    });
  });

  describe("HTML5 video not playing", () => {
    let wrapper;
    let store;

    beforeEach(() => {
      const initialState = { currentTime: 10, isPlaying: false };
      const mockStore = configureMockStore();

      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <MasterVideo />
        </Provider>
      );
    });

    it("triggers the SET_IS_PLAYING action with the right payload when playing", () => {
      const action = { type: "SET_IS_PLAYING", payload: true };
      wrapper.find("video").simulate("playing");
      expect(store.getActions()[0]).toEqual(action);
    });
  });
});
