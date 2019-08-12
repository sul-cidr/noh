import React from "react";
import { shallow, mount } from "enzyme";
import TabbedNarrative from "../components/TabbedNarrative";

describe("<TabbedNarrative>", () => {
  const tabbedAnalysis =
    "<div title='section one with many words in title' class='tabbed-narrative'><p>Lorem ipsum dolor sit amet.</p></div><br /><div title='section two'><p>Different stuff</p></div>";

  it("renders as expected", () => {
    const component = shallow(<TabbedNarrative narrative={tabbedAnalysis} />);
    expect(component).toMatchSnapshot();
  });

  it("ref handler runs with tabs ref", () => {
    const component = mount(
      <div className="narrative" role="presentation">
        <TabbedNarrative narrative={tabbedAnalysis} />
      </div>
    );
    const tabN = component.find("TabbedNarrative");
    tabN.instance().handleDomRef(tabN.getDOMNode());
  });

  it("ref handler runs with null input", () => {
    const component = shallow(<TabbedNarrative narrative={tabbedAnalysis} />);
    component.instance().handleDomRef(null);
  });
});
