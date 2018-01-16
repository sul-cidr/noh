import React from "react";
import { shallow } from "enzyme";
import Acts from "../components/Acts";

describe("<Acts>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<Acts />);
    expect(component).toMatchSnapshot();
  });
});
