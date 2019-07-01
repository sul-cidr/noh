import React from "react";
import { shallow } from "enzyme";
import phrases from "./__fixtures__/phrases.json";
import { Unwrapped as UnwrappedScore } from "../components/Score";
import { determineCurrentPhrase } from "../utils";

describe("<UnwrappedScore>", () => {
  const allTogglesOn = {
    isBeatOn: true,
    isTextOn: true,
    isPercussionOn: true,
    isNohkanOn: true,
    isDanceOn: true,
    isPrevSentenceOn: true,
    isNextSentenceOn: true
  };

  const allTogglesOff = {
    isBeatOn: false,
    isTextOn: false,
    isPercussionOn: false,
    isNohkanOn: false,
    isDanceOn: false,
    isPrevSentenceOn: false,
    isNextSentenceOn: false
  };

  it("renders as expected", () => {
    const component = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1193}
        toggles={allTogglesOn}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with all filters off", () => {
    const component = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1193}
        toggles={allTogglesOff}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected", () => {
    const component = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1193}
        toggles={allTogglesOn}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with unmetered phrases", () => {
    const fixturesPhrases = phrases.phrases.slice();
    fixturesPhrases[0].beat = {
      value: "",
      grid: [
        {
          text: "unmetered",
          voices: [],
          start: 12,
          style: "normal",
          length: 1
        }
      ]
    };
    const component = shallow(
      <UnwrappedScore
        phrases={fixturesPhrases}
        currentTime={1193}
        toggles={allTogglesOn}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("determines the correct phrase", () => {
    const component = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1193}
        toggles={allTogglesOn}
      />
    );
    const calculatedPhraseIndex = determineCurrentPhrase(
      component.instance().props.currentTime,
      component.instance().props.phrases
    );
    expect(calculatedPhraseIndex).toBe(0);
    const component2 = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1216}
        toggles={allTogglesOn}
      />
    );
    const calculatedPhraseIndex2 = determineCurrentPhrase(
      component2.instance().props.currentTime,
      component2.instance().props.phrases
    );
    expect(calculatedPhraseIndex2).toBe(2);
    const component3 = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={0}
        toggles={allTogglesOn}
      />
    );
    const calculatedPhraseIndex3 = determineCurrentPhrase(
      component3.instance().props.currentTime,
      component3.instance().props.phrases
    );
    expect(calculatedPhraseIndex3).toBe(0);
  });

  it("sets state correctly on componentWillReceiveProps", () => {
    const component = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1213}
        toggles={allTogglesOn}
      />
    );
    component.instance().componentWillReceiveProps(component.instance().props);
    expect(component.state().previousPhrase.phrase).toBe("1");
    expect(component.state().currentPhrase.phrase).toBe("2");
    expect(component.state().nextPhrase.phrase).toBe("3");
  });

  it("handles null state correctly", () => {
    const component = shallow(
      <UnwrappedScore
        phrases={phrases.phrases}
        currentTime={1213}
        toggles={allTogglesOn}
      />
    );
    component.state().currentPhrase = null;
    component.state().nextPhrase = null;
    component.instance().render();
    expect(component).toMatchSnapshot();
  });
});
