import React from "react";
import { shallow } from "enzyme";
import phrases from "./__fixtures__/phrases.json";
import Score from "../components/Score";

describe("<Score>", () => {
  it("renders as expected", () => {
    const component = shallow(<Score phrases={phrases.phrases} />);
    expect(component).toMatchSnapshot();
  });
});
