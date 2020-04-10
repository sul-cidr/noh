import React from "react";
import { shallow } from "enzyme";
import ShodanTimeline from "../components/ShodanTimeline";

import fixtures from "./__fixtures__/play.json";

describe("<ShodanTimeline>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimeline
        sections={fixtures.sections}
        maxIntensity={21}
        totalDuration={1800}
        acts={fixtures.acts}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
