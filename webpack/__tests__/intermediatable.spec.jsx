import React from "react";
import { shallow } from "enzyme";
import IntermediaTable from "../components/IntermediaTable";

describe("<IntermediaTable>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <IntermediaTable play="hashitomi" section="kiri" />
    );
    expect(component).toMatchSnapshot();
  });
});
