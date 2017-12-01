import React from "react";

// the shodan in here need to be abstracted into a reusable component
const ShodanTimeline = () => (
  <div className="tl__channel tl__channel--shodan">
    {" "}
    <div className="tl__channel-label">
      <p>Shodan</p>
    </div>
    <div className="shodan-map">
      <div
        className="shodan-map__item"
        style={{ left: "0%", width: "2%", height: "10px" }}
        data-tooltip="Nanoribue"
      />
      <div
        className="shodan-map__item"
        style={{ left: "2%", width: "5%", height: "20px" }}
        data-tooltip="Nanori"
      />
      <div
        className="shodan-map__item"
        style={{ left: "7%", width: "8%", height: "40px" }}
        data-tooltip="Kakaru-1"
      />
      <div
        className="shodan-map__item"
        style={{ left: "15%", width: "5%", height: "40px" }}
        data-tooltip="Ashirai"
      />
    </div>
  </div>
);

export default ShodanTimeline;
