import React from "react";
import { shallow } from "enzyme";
import MeasureLabelContainer from "../components/MeasureLabelContainer";

describe("<MeasureLabelContainer>", () => {
  const offToggles = {
    isBeatOn: false,
    isTextOn: false,
    isPercussionOn: false,
    isNohkanOn: false,
    isDanceOn: false,
    isPrevSentenceOn: false,
    isNextSentenceOn: false
  };

  it("renders as expected by default", () => {
    const component = shallow(<MeasureLabelContainer />);
    expect(component).toMatchSnapshot();
  });

  it("renders as expected by default with all toggles off", () => {
    const component = shallow(<MeasureLabelContainer {...offToggles} />);
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
