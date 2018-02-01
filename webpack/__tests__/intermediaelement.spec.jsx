import React from "react";
import { shallow } from "enzyme";
import IntermediaElement from "../components/IntermediaElement";

describe("<IntermediaElement>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <IntermediaElement fieldName="Percussion" fieldValue="Non-congruent" />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders None as expected", () => {
    const component = shallow(<IntermediaElement fieldName="Percussion" />);
    expect(component).toMatchSnapshot();
  });
});
