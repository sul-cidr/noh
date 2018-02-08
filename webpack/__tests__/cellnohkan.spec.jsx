import React from "react";
import { shallow } from "enzyme";
import CellNohkan from "../components/CellNohkan";

describe("<CellNohkan>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<CellNohkan text="Naka no takane" length={3} />);
    expect(component).toMatchSnapshot();
  });
});
