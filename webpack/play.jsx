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
        <div className="sidebar__header">
          <div className="sidebar__back-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="11"
              viewBox="0 0 7 11"
            >
              <path
                fill="currentColor"
                d="M0.197894737,5.07381279 L5.31236842,0.193127854 C5.55894737,-0.0421917808 5.95894737,-0.0421917808 6.20552632,0.193127854 L6.80210526,0.762465753 C7.04842105,0.997534247 7.04868421,1.37826484 6.80315789,1.61383562 L2.74973684,5.5 L6.80289474,9.38641553 C7.04868421,9.6219863 7.04815789,10.0027169 6.80184211,10.2377854 L6.20526316,10.8071233 C5.95868421,11.0424429 5.55868421,11.0424429 5.31210526,10.8071233 L0.197894737,5.92618721 C-0.0486842105,5.69086758 -0.0486842105,5.30913242 0.197894737,5.07381279 Z"
              />
            </svg>
            Back to list
          </div>
          <h1>{props.title}</h1>
        </div>
        <div className="sidebar__container">
          <Narrative narrative={props.narrative} />
        </div>
      </aside>
      <main>
        <div className="video-player">
          <div className="video-container">
            <MasterVideo
              videoUrl={props.videoUrl}
              startTime={props.startTime}
              tracks={props.tracks}
            />
          </div>
          <div className="timeline">
            <div className="timeline__container">
              <TimeMarks
                videoDuration={convertTimeToSeconds(props.videoDuration)}
                numIntervals={10}
              />
              <Acts
                acts={props.acts}
                duration={convertTimeToSeconds(props.videoDuration)}
              />
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
  maxIntensity: PropTypes.number.isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      kind: PropTypes.string,
      lang: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  acts: PropTypes.arrayOf(
    PropTypes.shape({
      translation: PropTypes.string.isRequired,
      transcription: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired
    })
  ).isRequired
};

App.defaultProps = {
  title: "",
  currentTime: 0.0,
  startTime: 0.0,
  isPlaying: false
};

// If main app
/* istanbul ignore if */
if (!module.parent) {
  const playName = window.location.pathname.trim().split("/")[1];
  contents.play(playName, props => {
    console.log(JSON.stringify(props));
    render(<App {...props} />, document.getElementById("play"));
  });
}

export default App;
