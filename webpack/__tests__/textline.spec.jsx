import React from "react";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import TextLine, { UnwrappedLine } from "../components/TextLine";

describe("<TextLine>", () => {
  it("renders as expected with active class", () => {
    const component = shallow(
      <UnwrappedLine
        active
        translation="[KYŌGEN] sample string"
        transcription="[KYŌGEN] another sample string"
        startTime={10}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected without active class", () => {
    const component = shallow(
      <UnwrappedLine
        active={false}
        translation="sample string"
        transcription="another sample string"
        startTime={10}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("scrolls to line when active", () => {
    const container = document.createElement("div");

    const component = mount(
      <UnwrappedLine
        active
        translation="sample string"
        transcription="another sample string"
        startTime={10}
      />,
      {
        attachTo: container
      }
    ).instance();
    component.line.scrollIntoView = jest.fn();
    component.componentDidUpdate();
    expect(component.line.scrollIntoView.mock.calls.length).toBe(1);
  });

  it("doesn't scroll to line when not active", () => {
    const container = document.createElement("div");

    const component = mount(
      <UnwrappedLine
        active={false}
        translation="sample string"
        transcription="another sample string"
        startTime={10}
      />,
      {
        attachTo: container
      }
    ).instance();
    component.line.scrollIntoView = jest.fn();
    component.componentDidUpdate();
    expect(component.line.scrollIntoView.mock.calls.length).toBe(0);
  });

  it("correctly updates currentTime when the Textline is clicked", () => {
    const initialState = { currentTime: 13 };
    const mockStore = configureMockStore();
    const store = mockStore(initialState);
    const wrapper = mount(
      <TextLine
        active
        translation="sample string"
        transcription="another sample string"
        startTime={40}
      />,
      { context: { store } }
    );

    wrapper
      .find("button")
      .first()
      .simulate("click");
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: 40, origin: "Line" }
    };
    expect(store.getActions()[0]).toEqual(action);
  });
});
