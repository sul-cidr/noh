import React from "react";
import { shallow } from "enzyme";
import SectionControls from "../components/SectionControls";

describe("<SectionControls>", () => {
  it("renders as expected by default", () => {
    const component = shallow(
      <SectionControls prevSectionURL="kiri" nextSectionURL="kuse" />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders a disabled button as expected", () => {
    const component = shallow(
      <SectionControls prevSectionURL="" nextSectionURL="kuse" />
    );
    expect(component).toMatchSnapshot();
  });
});
