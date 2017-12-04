import React from "react";

// the shodan in here need to be abstracted into a reusable component
const ShodanTimeline = () => (
  <div className="shodan-map">
  {" "}
    <div
      className="shodan-map__item"
      style={{ left: "0%", width: "3%", height: "10%" }}
      data-tooltip="Nanori"
    />
    <div
      className="shodan-map__item"
      style={{ left: "3%", width: "7%", height: "15%" }}
      data-tooltip="Mondo"
    />
    <div
      className="shodan-map__item"
      style={{ left: "10%", width: "7%", height: "80%" }}
      data-tooltip="Ageuta"
    />
    <div
      className="shodan-map__item"
      style={{ left: "17%", width: "2%", height: "10%" }}
      data-tooltip="Ashirai"
    />
    <div
      className="shodan-map__item"
      style={{ left: "19%", width: "2%", height: "10%" }}
      data-tooltip="Yobikake"
    />
    <div
      className="shodan-map__item"
      style={{ left: "21%", width: "5%", height: "15%" }}
      data-tooltip="Yobikake"
    />
    <div
      className="shodan-map__item"
      style={{ left: "26%", width: "7%", height: "75%" }}
      data-tooltip="Mondo"
    />
    <div
      className="shodan-map__item"
      style={{ left: "33%", width: "2%", height: "40%" }}
      data-tooltip="Ageuta"
    />
    <div
      className="shodan-map__item"
      style={{ left: "35%", width: "3%", height: "45%" }}
      data-tooltip="Kuri"
    />
    <div
      className="shodan-map__item"
      style={{ left: "38%", width: "22%", height: "85%" }}
      data-tooltip="Sashi"
    />
    <div
      className="shodan-map__item"
      style={{ left: "60%", width: "2%", height: "15%" }}
      data-tooltip="Iguse"
    />
    <div
      className="shodan-map__item"
      style={{ left: "62%", width: "4%", height: "75%" }}
      data-tooltip="Mondo"
    />
    <div
      className="shodan-map__item"
      style={{ left: "66%", width: "7%", height: "55%" }}
      data-tooltip="Ageuta"
    />
    <div
      className="shodan-map__item"
      style={{ left: "73%", width: "5%", height: "70%" }}
      data-tooltip="Notto"
    />
    <div
      className="shodan-map__item"
      style={{ left: "78%", width: "3%", height: "100%" }}
      data-tooltip="Noriji"
    />
    <div
      className="shodan-map__item"
      style={{ left: "81%", width: "1%", height: "90%" }}
      data-tooltip="Hayafue"
    />
    <div
      className="shodan-map__item"
      style={{ left: "82%", width: "2%", height: "100%" }}
      data-tooltip="Noriji"
    />
    <div
      className="shodan-map__item"
      style={{ left: "84%", width: "6%", height: "70%" }}
      data-tooltip="Maibataraki"
    />
    <div
      className="shodan-map__item"
      style={{ left: "90%", width: "1%", height: "35%" }}
      data-tooltip="Noriji"
    />
    <div
      className="shodan-map__item"
      style={{ left: "91%", width: "9%", height: "95%" }}
      data-tooltip="Kiri"
    />
  </div>
);

export default ShodanTimeline;
