import React from "react";
import { shallow } from "enzyme";
import ShodanTimeline from "../components/ShodanTimeline";

describe("<ShodanTimeline>", () => {
  it("renders as expected", () => {
    const component = shallow(<ShodanTimeline />);
    expect(component).toMatchSnapshot();
  });
});
