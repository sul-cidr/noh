import React from "react";
import { shallow } from "enzyme";
import ShodanTimeline from "../components/ShodanTimeline";

describe("<ShodanTimeline>", () => {
  const sections = [
    {
      name: "Noriji",
      left: "82%",
      width: "2%",
      height: "100%",
      intensity: 17
    },
    {
      name: "Maibataraki",
      left: "84%",
      width: "6%",
      height: "70%",
      intensity: 12
    }
  ];
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimeline sections={sections} maxIntensity={21} />
    );
    expect(component).toMatchSnapshot();
  });
});
