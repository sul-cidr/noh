import React from "react";
import { shallow } from "enzyme";
import IntermediaTitle from "../components/IntermediaTitle";

describe("<IntermediaTitle>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <IntermediaTitle sectionUrl="hashitomi/kiri" section="kiri" />
    );
    expect(component).toMatchSnapshot();
  });
});
