import React from "react";
import { shallow } from "enzyme";
import NonTabbedNarrative from "../components/NonTabbedNarrative";

describe("<NonTabbedNarrative>", () => {
  const nonTabbedAnalysis =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";

  it("renders as expected", () => {
    const component = shallow(
      <NonTabbedNarrative narrative={nonTabbedAnalysis} />
    );
    expect(component).toMatchSnapshot();
  });
});
