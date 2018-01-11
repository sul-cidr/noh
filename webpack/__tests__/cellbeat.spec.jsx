import React from "react";
import { shallow } from "enzyme";
import CellBeat from "../components/CellBeat";

describe("<CellBeat>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<CellBeat beatText="1" />);
    expect(component).toMatchSnapshot();
  });
});
