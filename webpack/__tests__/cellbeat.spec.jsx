import React from "react";
import { shallow } from "enzyme";
import CellBeat from "../components/CellBeat";

describe("<CellBeat>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<CellBeat beatText="1" />);
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with unmetered as text", () => {
    const component = shallow(<CellBeat beatText="Unmetered" />);
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with length", () => {
    const component = shallow(<CellBeat beatText="1" length={5} />);
    expect(component).toMatchSnapshot();
  });
});
