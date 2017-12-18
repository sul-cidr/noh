import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import IntermediaTable, {
  Unwrapped as UnwrappedIntermediaTable
} from "../components/IntermediaTable";

const sections = [
  {
    name: "Nanori",
    intensity: 5,
    duration: "00:02:00",
    timeStart: "00:00:00",
    timeEnd: "00:03:00",
    voices: "Waki/Waki Tsure",
    voiceType: "Sung - Non Congruent",
    text: "Sashinori - Non Congruent",
    percussion: "Otsuzumi + Kotsuzumi + Taiko",
    percussionType: "Non Congruent",
    nohkan: "Non Congruent",
    dance: "Dance to text"
  },
  {
    name: "Mondo",
    intensity: 2,
    duration: "00:03:00",
    timeStart: "00:03:01",
    timeEnd: "00:04:00",
    voices: "Waki/Waki Tsure",
    voiceType: "Spoken",
    text: "Congruent",
    percussion: "Otsuzumi + Kotsuzumi",
    percussionType: "Non Congruent",
    nohkan: "Non Congruent",
    dance: "Not present"
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
    const currentSection = component.instance().currentSection();
    expect(currentSection.name).toBe("Mondo");
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
