import React from "react";
import { shallow } from "enzyme";
import Narrative from "../components/Narrative";

describe("<Narrative>", () => {
  it("renders as expected", () => {
    const component = shallow(<Narrative />);
    expect(component).toMatchSnapshot();
  });
});
