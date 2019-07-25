import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import HighlightedTextContainer, {
  Unwrapped as UnwrappedHighlightedTextContainer
} from "../components/HighlightedTextContainer";

const phrases = [
  {
    phraseID: "I/1",
    startTime: 0,
    endTime: 10,
    transcription: "transcription line 1",
    translation: "translation line 1"
  },
  {
    phraseID: "I/2",
    startTime: 11,
    endTime: 20,
    transcription: "transcription line 2",
    translation: "translation line 2"
  }
];

describe("<UnwrappedHighlightedTextContainer>", () => {
  it("renders as expected unconnected to redux", () => {
    const setCurrentPhrase = jest.fn();
    const component = shallow(
      <UnwrappedHighlightedTextContainer
        currentTime={13}
        phrases={phrases}
        currentPhraseID="I/1"
        setCurrentPhrase={setCurrentPhrase}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("correctly determines current phrase id", () => {
    const setCurrentPhrase = jest.fn();
    const component = shallow(
      <UnwrappedHighlightedTextContainer
        currentTime={13}
        phrases={phrases}
        currentPhraseID="I/1"
        setCurrentPhrase={setCurrentPhrase}
      />
    );
    const calculatedPhraseID = component.instance().determineCurrentPhrase();
    expect(calculatedPhraseID).toBe("I/2");
  });
});

describe("HighlightedTextContainer", () => {
  it("dispatches the correct action on componentWillReceiveProps", () => {
    const initialState = {
      currentTime: { time: 13, origin: "HighlightedTextContainer" },
      currentPhraseID: ""
    };
    const mockStore = configureMockStore();
    const store = mockStore(initialState);
    const wrapper = mount(<HighlightedTextContainer phrases={phrases} />, {
      context: { store }
    });
    wrapper.setProps({ currentTime: 16 });
    const action = { type: "SET_CURRENT_PHRASE_ID", payload: "I/2" };
    expect(store.getActions()[0]).toEqual(action);
  });
});
