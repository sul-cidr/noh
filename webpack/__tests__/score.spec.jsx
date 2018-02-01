import React from "react";
import { shallow } from "enzyme";
import phrases from "./__fixtures__/phrases.json";
import { Unwrapped as UnwrappedScore } from "../components/Score";

describe("<UnwrappedScore>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <UnwrappedScore phrases={phrases.phrases} currentTime={1193} />
    );
    expect(component).toMatchSnapshot();
  });

  it("determines the correct phrase", () => {
    const component = shallow(
      <UnwrappedScore phrases={phrases.phrases} currentTime={1193} />
    );
    const calculatedPhraseIndex = component.instance().determineCurrentPhrase();
    expect(calculatedPhraseIndex).toBe(0);
    const component2 = shallow(
      <UnwrappedScore phrases={phrases.phrases} currentTime={1216} />
    );
    const calculatedPhraseIndex2 = component2
      .instance()
      .determineCurrentPhrase();
    expect(calculatedPhraseIndex2).toBe(2);
    const component3 = shallow(
      <UnwrappedScore phrases={phrases.phrases} currentTime={0} />
    );
    const calculatedPhraseIndex3 = component3
      .instance()
      .determineCurrentPhrase();
    expect(calculatedPhraseIndex3).toBe(0);
  });

  it("sets state correctly on componentWillReceiveProps", () => {
    const component = shallow(
      <UnwrappedScore phrases={phrases.phrases} currentTime={1213} />
    );
    component.instance().componentWillReceiveProps();
    expect(component.state().previousPhrase.phrase).toBe("1");
    expect(component.state().currentPhrase.phrase).toBe("2");
    expect(component.state().nextPhrase.phrase).toBe("3");
  });
});
