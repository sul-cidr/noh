import React from "react";
import { shallow } from "enzyme";
import PercussionLine from "../components/PercussionLine";
import phrases from "./__fixtures__/phrases.json";

describe("<PercussionLine>", () => {
  it("renders as expected by default", () => {
    const component = shallow(
      <PercussionLine grid={phrases.phrases[2].percussion.grid} length={5} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected with no percussion data", () => {
    const component = shallow(<PercussionLine grid={[]} length={13} />);
    expect(component).toMatchSnapshot();
  });
});
