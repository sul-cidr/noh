import React from "react";
import { shallow } from "enzyme";
import ScoreControls from "../components/ScoreControls";

describe("<ScoreControls>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<ScoreControls />);
    expect(component).toMatchSnapshot();
  });
});
