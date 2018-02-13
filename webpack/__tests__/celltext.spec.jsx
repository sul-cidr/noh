import React from "react";
import { shallow } from "enzyme";
import CellText from "../components/CellText";

describe("<CellText>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <CellText
        text="ma"
        length={2}
        voiceType="jiutai"
        vocalRange="high"
        beginning
        end
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected with no vocal range", () => {
    const component = shallow(
      <CellText text="ma" length={2} voiceType="jiutai" beginning end />
    );
    expect(component).toMatchSnapshot();
  });
});
