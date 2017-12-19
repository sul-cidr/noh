import React from "react";
import { shallow } from "enzyme";
import TimeMarks from "../components/TimeMarks";

describe("<TimeMarks>", () => {
  it("renders as expected", () => {
    const component = shallow(<TimeMarks videoDuration={3600} />);
    expect(component).toMatchSnapshot();
  });
});
