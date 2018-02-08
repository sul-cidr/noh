import React from "react";
import { shallow } from "enzyme";
import NohkanLine from "../components/NohkanLine";
import phrases from "./__fixtures__/phrases.json";

describe("<NohkanLine>", () => {
  it("renders as expected by default", () => {
    const component = shallow(
      <NohkanLine grid={phrases.phrases[0].nohkan.grid} length={13} />
    );
    expect(component).toMatchSnapshot();
  });
  it("renders as expected with no nohkan data", () => {
    const component = shallow(<NohkanLine grid={[]} length={13} />);
    expect(component).toMatchSnapshot();
  });
});
