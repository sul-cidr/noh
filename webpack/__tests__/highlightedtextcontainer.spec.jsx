import React from "react";
import { shallow } from "enzyme";
import { Unwrapped as HighlightedTextContainer } from "../components/HighlightedTextContainer";

describe("<HighlightedTextContainer>", () => {
  it("renders as expected unconnected to redux", () => {
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
    const component = shallow(
      <HighlightedTextContainer
        currentTime={13}
        singingStyle="spoken"
        phrases={phrases}
        currentPhraseID="I/1"
      />
    );
    expect(component).toMatchSnapshot();
  });
});
