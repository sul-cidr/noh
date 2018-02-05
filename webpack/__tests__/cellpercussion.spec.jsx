import React from "react";
import { shallow } from "enzyme";
import CellPercussion from "../components/CellPercussion";

describe("<CellPercussion>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<CellPercussion text="mitsuji" length={14} />);
    expect(component).toMatchSnapshot();
  });
});
