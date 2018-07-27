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

  it("updates video currentTime when currentTime prop is set", () => {
    const container = document.createElement("div");
    const component = mount(<UnwrappedMasterVideo currentTime={10} />, {
      attachTo: container
    });
    component.setProps({ currentTime: 40 });
    expect(component.instance().video.currentTime).toBe(40);
  });
});
