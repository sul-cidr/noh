import React from "react";
import { shallow } from "enzyme";
import CellDance from "../components/CellDance";

describe("<CellDance>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<CellDance text="Naka no takane" length={3} />);
    expect(component).toMatchSnapshot();
  });
});
