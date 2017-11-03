import React from "react";

// the shodan in here need to be abstracted into a reusable component
const ShodanTimeline = () => (
  <div className="tl__channel tl__channel--shodan">
    {" "}
    <div className="tl__channel-label">
      <p>Shodan</p>
    </div>
    <div className="tl__channel-events">
      <div
        className="tl__shodan"
        style={{ left: "0px", width: "40px", height: "10px" }}
        data-tooltip="Shodan name"
      />
      <div
        className="tl__shodan"
        style={{ left: "40px", width: "100px", height: "20px" }}
        data-tooltip="Shodan name"
      />
      <div
        className="tl__shodan"
        style={{ left: "140px", width: "60px", height: "40px" }}
        data-tooltip="Shodan name"
      />
    </div>
  </div>
);

export default ShodanTimeline;
