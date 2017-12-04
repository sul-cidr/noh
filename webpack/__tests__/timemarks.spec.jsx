import React from "react";
import { shallow } from "enzyme";
import TimeMarks from "../components/TimeMarks";

describe("<TimeMarks>", () => {
  it("renders as expected", () => {
    const component = shallow(<TimeMarks />);
    expect(component).toMatchSnapshot();
  });
});
