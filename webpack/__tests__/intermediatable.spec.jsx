import React from "react";
import { shallow } from "enzyme";
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
});

describe("<InterMediaTable>", () => {
  it("renders as expected while connected", () => {
    const initialState = { currentTime: { time: 10, origin: "" } };
    const mockStore = configureMockStore();
    const store = mockStore(initialState);
    const wrapper = shallow(
      <IntermediaTable play="hashitomi" sections={sections} />,
      { context: { store } }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
