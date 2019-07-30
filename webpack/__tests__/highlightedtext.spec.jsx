import React from "react";
import { shallow } from "enzyme";
import HighlightedText from "../components/HighlightedText";

describe("<HighlightedText>", () => {
  it("renders as expected", () => {
    const phrases = [
      {
        phraseID: "I/1",
        startTime: 0,
        endTime: 200,
        transcription: "transcription line 1",
        translation: "translation line 1"
      },
      {
        phraseID: "I/2",
        startTime: 201,
        endTime: 410,
        transcription: "transcription line 2",
        translation: "translation line 2"
      }
    ];
    const component = shallow(
      <HighlightedText phrases={phrases} currentPhraseID="I/1" />
    );
    expect(component).toMatchSnapshot();
  });
});
