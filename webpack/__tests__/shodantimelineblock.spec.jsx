import React from "react";
import { shallow } from "enzyme";
import ShodanTimelineBlock from "../components/ShodanTimelineBlock";

describe("<ShodanTimelineBlock>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimelineBlock
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
});
