import React from "react";
import { shallow } from "enzyme";
import Score from "../components/Score";

describe("<Score>", () => {
  it("renders as expected", () => {
    const component = shallow(<Score />);
    expect(component).toMatchSnapshot();
  });
});
