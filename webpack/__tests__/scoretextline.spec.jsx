import React from "react";
import { shallow } from "enzyme";
import ScoreTextLine from "../components/ScoreTextLine";
import phrases from "./__fixtures__/phrases.json";

describe("<ScoreTextLine>", () => {
  it("renders as expected by default", () => {
    const component = shallow(
      <ScoreTextLine
        textGrid={phrases.phrases[0].syllableText.grid}
        length={13}
        rangeGrid={phrases.phrases[0].vocalRange.grid}
        textIsCongruent
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected by default", () => {
    const component = shallow(
      <ScoreTextLine
        textGrid={[]}
        length={13}
        rangeGrid={phrases.phrases[0].vocalRange.grid}
        textIsCongruent={false}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
