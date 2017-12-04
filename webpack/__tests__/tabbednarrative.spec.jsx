import React from "react";
import { shallow } from "enzyme";
import TabbedNarrative from "../components/TabbedNarrative";

describe("<TabbedNarrative>", () => {
  const tabbedAnalysis =
    "<div title='section one with many words in title' class='tabbed-narrative'><p>Lorem ipsum dolor sit amet.</p></div><br><div title='section two'><p>Different stuff</p></div>";

  it("renders as expected", () => {
    const component = shallow(<TabbedNarrative narrative={tabbedAnalysis} />);
    expect(component).toMatchSnapshot();
  });
});
