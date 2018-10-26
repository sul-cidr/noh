import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import Narrative, {
  Unwrapped as UnwrappedNarrative
} from "../components/Narrative";

const tabbedAnalysis =
  "<div title='section one with many words in title' class='tabbed-narrative'><p>Lorem ipsum dolor sit amet.</p></div><br /><div title='section two'><p>Different stuff</p></div>";

const nonTabbedAnalysis =
  "Lorem ipsum dolor sit <time datetime='00:00:50'>amet</time>, <a datetime='00:00:50'>consectetur</a> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <h2 class='collapsible'>Header 2</h2>Ut enim ad minim veniam.<h2 class='collapsible collapsible-closed'>Header 3</h2>Et al.";

describe("<UnwrappedNarrative>", () => {
  it("renders as expected without tabs", () => {
    const component = shallow(
      <UnwrappedNarrative narrative={nonTabbedAnalysis} />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with tabs", () => {
    const component = shallow(
      <UnwrappedNarrative narrative={tabbedAnalysis} />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("<Narrative>", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = { startTime: 10 };
    const mockStore = configureMockStore();

    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Narrative narrative={nonTabbedAnalysis} />
      </Provider>
    );
  });

  it("triggers the SET_CURRENT_TIME action with the right payload", () => {
    const action = {
      type: "SET_CURRENT_TIME",
      payload: { time: 50, origin: "Narrative" }
    };
    wrapper.find("time").simulate("click");
    expect(store.getActions()[0]).toEqual(action);
  });

  it("does nothing when the element clicked is not a <time> element", () => {
    const action = { type: "SET_CURRENT_TIME", payload: 50 };
    wrapper.find("a").simulate("click");
    expect(store.getActions()[0]).not.toEqual(action);
  });

  it("toggles class of header if collapsible", () => {
    const h2 = wrapper.find("h2").first();
    expect(h2.getDOMNode().className).not.toContain("collapsible-closed");
    h2.simulate("click");
    expect(h2.getDOMNode().className).toContain("collapsible-closed");
  });

  it("toggles class of header if collapsible and closed by default", () => {
    const h2 = wrapper.find("h2").last();
    expect(h2.getDOMNode().className).toContain("collapsible-closed");
    h2.simulate("click");
    expect(h2.getDOMNode().className).not.toContain("collapsible-closed");
  });
});
