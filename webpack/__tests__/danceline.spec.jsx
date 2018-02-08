import React from "react";
import { shallow } from "enzyme";
import DanceLine from "../components/DanceLine";
import phrases from "./__fixtures__/phrases.json";

describe("<DanceLine>", () => {
  it("renders as expected by default", () => {
    const component = shallow(
      <DanceLine grid={phrases.phrases[0].dance.grid} length={13} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected with no dance data", () => {
    const component = shallow(<DanceLine grid={[]} length={13} />);
    expect(component).toMatchSnapshot();
  });
});
