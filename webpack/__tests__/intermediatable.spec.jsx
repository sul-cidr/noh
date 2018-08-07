import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import IntermediaTable, {
  Unwrapped as UnwrappedIntermediaTable
} from "../components/IntermediaTable";

const sections = [
  {
    sectionName: {
      value: "Nanori"
    },
    sectionUrl: "kokaji/nanori",
    intensity: { number: "5" },
    startTime: { value: 0 },
    endTime: { value: 180 },
    numberVoices: { value: "Waki/Waki Tsure" },
    voice: { value: "Sung - Non Congruent" },
    text: { value: "Sashinori - Non Congruent" },
    numberOfPercussion: { value: "Otsuzumi + Kotsuzumi + Taiko" },
    percussion: { value: "Non Congruent" },
    nokhanPresent: { value: "Non Congruent" },
    dancePresent: { value: "Dance to text" }
  },
  {
    sectionName: {
      value: "Mondo"
    },
    sectionUrl: "kokaji/mondo",
    intensity: { number: "5" },
    startTime: { value: 181 },
    endTime: { value: 300 },
    numberVoices: { value: "Waki/Waki Tsure" },
    voice: { value: "Sung - Non Congruent" },
    text: { value: "Sashinori - Non Congruent" },
    numberOfPercussion: { value: "Otsuzumi + Kotsuzumi + Taiko" },
    percussion: { value: "Non Congruent" },
    nokhanPresent: { value: "Non Congruent" },
    dancePresent: { value: "Dance to text" }
  }
];

describe("<UnwrappedIntermediaTable>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <UnwrappedIntermediaTable
        play="hashitomi"
        sections={sections}
        currentTime={10}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("correctly determines current section", () => {
    const component = shallow(
      <UnwrappedIntermediaTable
        play="hashitomi"
        sections={sections}
        currentTime={200}
      />
    );
    const currentSectionIndex = component.instance().findCurrentSectionIndex();
    expect(currentSectionIndex).toBe(1);
  });
  it("handles failing to find a section correctly", () => {
    const component = shallow(
      <UnwrappedIntermediaTable
        play="hashitomi"
        sections={sections}
        currentTime={5000}
      />
    );
    const currentSectionIndex = component.instance().findCurrentSectionIndex();
    expect(currentSectionIndex).toBe(0);
  });
  it("updates state correctly on componentWillReceiveProps", () => {
    const component = mount(
      <UnwrappedIntermediaTable
        play="hashitomi"
        sections={sections}
        currentTime={0}
      />
    );
    component.setProps({ currentTime: 200 });
    component.instance().componentWillReceiveProps();
    expect(component.state().currentSectionIndex).toBe(1);
  });
});

describe("<InterMediaTable>", () => {
  it("renders as expected while connected", () => {
    const initialState = { currentTime: 10 };
    const mockStore = configureMockStore();
    const store = mockStore(initialState);
    const wrapper = shallow(
      <IntermediaTable play="hashitomi" sections={sections} />,
      { context: { store } }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
