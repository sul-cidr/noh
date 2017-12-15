import React from "react";
import { shallow } from "enzyme";
import ShodanTimelineBlock from "../components/ShodanTimelineBlock";

describe("<ShodanTimelineBlock>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimelineBlock name="Kiri" left="8%" width="10%" height="90%" />
    );
    expect(component).toMatchSnapshot();
  });
});
