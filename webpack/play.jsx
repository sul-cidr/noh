import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Acts from "./components/Acts";
import IntermediaTable from "./components/IntermediaTable";
import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import TimelineIndicator from "./components/TimelineIndicator";
import TimeMarks from "./components/TimeMarks";
import ShodanTimeline from "./components/ShodanTimeline";

import contents from "./contents";
import store from "./store";
import { convertTimeToSeconds } from "./utils";

const App = props => (
  <Provider store={store}>
    <div className="video-player">
      <aside>
        <h1>{props.title}</h1>
        <Narrative narrative={props.narrative} />
      </aside>
      <main>
        <div className="video-player">
          <div className="video-container">
            <MasterVideo
              videoUrl={props.videoUrl}
              startTime={props.startTime}
            />
          </div>
          <div className="timeline">
            <div className="timeline__container">
              <TimeMarks />
              <Acts />
              <div className="shodan-map__container">
                <TimelineIndicator
                  currentTime={props.currentTime}
                  duration={convertTimeToSeconds(props.videoDuration)}
                  playing={props.isPlaying}
                />
                <ShodanTimeline
                  sections={props.sections}
                  maxIntensity={props.maxIntensity}
                  totalDuration={convertTimeToSeconds(props.videoDuration)}
                />
              </div>
            </div>
            {/* These have to update based on current time */}
            <IntermediaTable play="Hashitomi" section="Kiri" />
          </div>
        </div>
      </main>
    </div>
  </Provider>
);

App.propTypes = {
  title: PropTypes.string,
  narrative: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  videoDuration: PropTypes.string.isRequired,
  currentTime: PropTypes.number,
  startTime: PropTypes.number,
  isPlaying: PropTypes.bool,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      left: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    })
  ).isRequired,
  maxIntensity: PropTypes.number.isRequired
};

App.defaultProps = {
  title: "",
  currentTime: 0.0,
  startTime: 0.0,
  isPlaying: false
};

const playName = window.location.pathname.trim().split("/")[1];

contents.play(playName, props => {
  render(<App {...props} />, document.getElementById("play"));
});
