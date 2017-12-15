import React from "react";
import { shallow } from "enzyme";
import ShodanTimeline from "../components/ShodanTimeline";

describe("<ShodanTimeline>", () => {
  const sections = [
    {
      name: "Noriji",
      left: "82%",
      width: "2%",
      height: "100%"
    },
    {
      name: "Maibataraki",
      left: "84%",
      width: "6%",
      height: "70%"
    }
  ];
  it("renders as expected", () => {
    const component = shallow(<ShodanTimeline sections={sections} />);
    expect(component).toMatchSnapshot();
  });
});
