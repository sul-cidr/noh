import React from "react";
import { shallow } from "enzyme";
import Narrative from "../components/Narrative";

describe("<Narrative>", () => {
  const tabbedAnalysis =
    "<div title='section one with many words in title' class='tabbed-narrative'><p>Lorem ipsum dolor sit amet.</p></div><br><div title='section two'><p>Different stuff</p></div>";

  const nonTabbedAnalysis =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";

  it("renders as expected without tabs", () => {
    const component = shallow(<Narrative narrative={nonTabbedAnalysis} />);
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with tabs", () => {
    const component = shallow(<Narrative narrtive={tabbedAnalysis} />);
    expect(component).toMatchSnapshot();
  });
});
