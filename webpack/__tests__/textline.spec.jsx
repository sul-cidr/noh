import React from "react";
import { mount, shallow } from "enzyme";
import TextLine from "../components/TextLine";

describe("<TextLine>", () => {
  it("renders as expected with active class", () => {
    const component = shallow(
      <TextLine
        active
        translation="sample string"
        transcription="another sample string"
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected without active class", () => {
    const component = shallow(
      <TextLine
        active={false}
        translation="sample string"
        transcription="another sample string"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("scrolls to line when active", () => {
    const container = document.createElement("div");

    const component = mount(
      <TextLine
        active
        translation="sample string"
        transcription="another sample string"
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
