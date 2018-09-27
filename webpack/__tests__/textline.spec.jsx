import React from "react";
import { mount, shallow } from "enzyme";
import { UnwrappedLine } from "../components/TextLine";

describe("<TextLine>", () => {
  it("renders as expected with active class", () => {
    const component = shallow(
      <UnwrappedLine
        active
        translation="sample string"
        transcription="another sample string"
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
});
