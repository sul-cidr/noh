import React from "react";
import { mount } from "enzyme";
import { Unwrapped as UnwrappedMasterVideo } from "../components/MasterVideo";

describe("<MasterVideo>", () => {
  it("renders as expected", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo />, {
      attachTo: container
    });
    expect(component).toMatchSnapshot();
    expect(component.instance().video).not.toBe(null);
    expect(component.instance().video).not.toBe(undefined);
  });

  it("updates currentTime when startTime is set", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo startTime={10} />, {
      attachTo: container
    }).instance();
    component.componentDidUpdate({ startTime: 0 });
    expect(component.video.currentTime).toBe(10);
  });
});
