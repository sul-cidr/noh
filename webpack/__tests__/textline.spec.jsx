import React from "react";
import { shallow } from "enzyme";
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
});
