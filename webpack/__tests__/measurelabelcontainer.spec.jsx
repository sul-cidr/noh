import React from "react";
import { shallow } from "enzyme";
import MeasureLabelContainer from "../components/MeasureLabelContainer";

describe("<MeasureLabelContainer>", () => {
  it("renders as expected by default", () => {
    const component = shallow(<MeasureLabelContainer />);
    expect(component).toMatchSnapshot();
  });
  it("renders as expected for previous", () => {
    const component = shallow(<MeasureLabelContainer previous />);
    expect(component).toMatchSnapshot();
  });
  it("renders as expected for next", () => {
    const component = shallow(<MeasureLabelContainer next />);
    expect(component).toMatchSnapshot();
  });
});
