import React from "react";
import { shallow } from "enzyme";
import ShodanTimeline from "../components/ShodanTimeline";

describe("<ShodanTimeline>", () => {
  const sections = [
    {
      name: "Noriji",
      left: "82%",
      intensity: 17,
      duration: "00:05:00"
    },
    {
      name: "Maibataraki",
      left: "84%",
      intensity: 12,
      duration: "00:16:45"
    }
  ];
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimeline
        sections={sections}
        maxIntensity={21}
        totalDuration={2700}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
