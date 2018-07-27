import React from "react";
import { mount, shallow } from "enzyme";
import ShodanTimelineBlock from "../components/ShodanTimelineBlock";

describe("<ShodanTimelineBlock>", () => {
  it("renders as expected", () => {
    const component = shallow(
      <ShodanTimelineBlock
        name="Kiri"
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("renders as expected with url", () => {
    const component = shallow(
      <ShodanTimelineBlock
        name="Kiri"
        url="/kokaji/kiri"
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("navigates if clicked and url", () => {
    window.location.assign = jest.fn();
    const url = "/kokaji/kiri";
    const wrapper = mount(
      <ShodanTimelineBlock
        name="Kiri"
        url={url}
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    wrapper.find("div").simulate("click");
    expect(window.location.assign).toBeCalledWith(url);
  });

  it("does not navigate if clicked and no url", () => {
    window.location.assign = jest.fn();
    const wrapper = mount(
      <ShodanTimelineBlock
        name="Kiri"
        url=""
        left="8%"
        intensity="15"
        maxIntensity={21}
        duration={10}
        totalDuration={30}
      />
    );
    wrapper.find("div").simulate("click");
    expect(window.location.assign).not.toBeCalled();
  });
});
