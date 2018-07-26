import React from "react";
import { shallow } from "enzyme";
import ShodanTimeline from "../components/ShodanTimeline";

describe("<ShodanTimeline>", () => {
  const sections = [
    {
      sectionName: { value: "Noriji" },
      sectionUrl: "/noriji",
      intensity: { number: "17" },
      startTime: { value: 0 },
      endTime: { value: 300 }
    },
    {
      sectionName: { value: "Maibataraki" },
      sectionUrl: "/maibataraki",
      intensity: { number: "12" },
      startTime: { value: 301 },
      endTime: { value: 1500 }
    }
  ];
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimeline
        sections={sections}
        maxIntensity={21}
        totalDuration={1800}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
