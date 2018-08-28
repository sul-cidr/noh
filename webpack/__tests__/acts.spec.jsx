import React from "react";
import { shallow } from "enzyme";
import Acts from "../components/Acts";

describe("<Acts>", () => {
  it("renders as expected by default", () => {
    const acts = [
      { translation: "Musicians", transcription: "", duration: 360 },
      { translation: "First Act", transcription: "Mae ba", duration: 1293 },
      { translation: "Second Act", transcription: "Nochi ba", duration: 2400 },
      { translation: "", transcription: "Oshirabe", duration: 360 }
    ];
    const component = shallow(<Acts acts={acts} duration={4413} />);
    expect(component).toMatchSnapshot();
  });
});
