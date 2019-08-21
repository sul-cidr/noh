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
        vocalRange="l"
        beginning
        end
        textIsCongruent
      />
    );
    expect(component).toMatchSnapshot();
    const component2 = shallow(
      <CellText
        text="ma"
        length={2}
        voiceType="jiutai"
        vocalRange="m"
        beginning={false}
        end
        textIsCongruent={false}
      />
    );
    expect(component2).toMatchSnapshot();
    const component3 = shallow(
      <CellText
        text="ma"
        length={2}
        voiceType="jiutai"
        vocalRange="h"
        beginning
        end={false}
        textIsCongruent
      />
    );
    expect(component3).toMatchSnapshot();
  });
  it("renders as expected with no vocal range", () => {
    const component = shallow(
      <CellText
        text="ma"
        length={2}
        voiceType="jiutai"
        beginning
        end
        textIsCongruent
      />
    );
    expect(component).toMatchSnapshot();
  });
});
