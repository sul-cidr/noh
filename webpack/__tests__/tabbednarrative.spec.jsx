import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { DEFAULT_STATE } from "../reducers";
import TabbedNarrative, {
  Unwrapped as UnwrappedTabbedNarrative
} from "../components/TabbedNarrative";

describe("<TabbedNarrative>", () => {
  const tabbedAnalysis =
    "<section title='section one with many words in title' class='tabbed-narrative'><p>Lorem ipsum dolor sit amet.</p></section><br /><section title='section two'><p>Different stuff</p></section>";

  it("renders as expected", () => {
    const component = shallow(
      <UnwrappedTabbedNarrative
        narrative={tabbedAnalysis}
        narrativeTab={0}
        updateNarrativeTab={() => jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("ref handler runs with tabs ref", () => {
    const component = mount(
      <div className="narrative" role="presentation">
        <UnwrappedTabbedNarrative
          narrative={tabbedAnalysis}
          narrativeTab={0}
          updateNarrativeTab={() => jest.fn()}
        />
      </div>
    );
    const tabN = component.find("TabbedNarrative");
    tabN.instance().handleDomRef(tabN.getDOMNode());
  });

  it("ref handler runs with null input", () => {
    const component = shallow(
      <UnwrappedTabbedNarrative
        narrative={tabbedAnalysis}
        narrativeTab={0}
        updateNarrativeTab={() => jest.fn()}
      />
    );
    component.instance().handleDomRef(null);
  });

  it("updates store correctly on tab change", () => {
    const mockStore = configureMockStore();
    const defaultState = DEFAULT_STATE;
    const store = mockStore(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <TabbedNarrative
          narrative={tabbedAnalysis}
          narrativeTab={0}
          updateNarrativeTab={() => jest.fn()}
        />
      </Provider>
    );

    const action = { type: "SET_NARRATIVE_TAB", payload: 1 };
    const button = wrapper.find("li.react-tabs__tab").last();
    button.simulate("click");
    expect(store.getActions()[0]).toEqual(action);
  });

  it("shows a tab even when received `narrativeTab` is out of range", () => {
    const storedNarrativeTabIndex = 7; // arbitrary value > # tabs in fixture,
    // to simulate navigating from shōdan with
    // more tabs
    const component = mount(
      <div className="narrative" role="presentation">
        <UnwrappedTabbedNarrative
          narrative={tabbedAnalysis}
          narrativeTab={storedNarrativeTabIndex}
          updateNarrativeTab={() => jest.fn()}
        />
      </div>
    );
    const tabsComponent = component.find("Tabs");
    const tabs = component.find("Tab");
    const maxAcceptableNarrativeTabIndex = tabs.length - 1;

    expect(tabs.last().props().selected).toEqual(true);
    expect(tabsComponent.props().selectedIndex).toEqual(
      maxAcceptableNarrativeTabIndex
    );
  });
});
