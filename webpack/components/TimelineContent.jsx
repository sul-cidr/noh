import React from "react";
import CurrentPositionMarker from "./CurrentPositionMarker";
import ShodanTimeline from "./ShodanTimeline";

const TimelineContent = () => (
  <div>
    <CurrentPositionMarker />
    <div className="tl__channels-container">
      <ShodanTimeline />
    </div>
  </div>
);

export default TimelineContent;
