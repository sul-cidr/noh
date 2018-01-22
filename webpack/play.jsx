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
    <div className="app-container">
      <aside className="sidebar sidebar--play">
        <div className="sidebar__container">
          <div className="sidebar__header">
            <div className="sidebar__back-link">Back to list</div>
            <h1>{props.title}</h1>
          </div>
          <Narrative narrative={props.narrative} />
        </div>
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
              <TimeMarks
                videoDuration={convertTimeToSeconds(props.videoDuration)}
                numIntervals={10}
              />
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
            <IntermediaTable play={props.title} sections={props.sections} />
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
      play: PropTypes.shape({ value: PropTypes.string }),
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      intensity: PropTypes.shape({ number: PropTypes.string }),
      // videoDuration has to be calculated
      // videoDuration: PropTypes.string,
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number }),
      numberVoices: PropTypes.shape({
        number: PropTypes.string,
        value: PropTypes.string
      }),
      voice: PropTypes.shape({ value: PropTypes.string }),
      text: PropTypes.shape({ value: PropTypes.string }),
      numberOfPercussion: PropTypes.shape({ number: PropTypes.string }),
      percussion: PropTypes.shape({ value: PropTypes.string }),
      nokhanPresent: PropTypes.shape({
        present: PropTypes.string,
        value: PropTypes.string
      }),
      dancePresent: PropTypes.shape({
        present: PropTypes.string,
        value: PropTypes.string
      }),
      captions: PropTypes.Array,
      narrative: PropTypes.shape({ value: PropTypes.string })
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
