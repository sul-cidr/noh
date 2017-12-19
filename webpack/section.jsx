import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";

import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import HighlightedTextContainer from "./components/HighlightedTextContainer";
import Score from "./components/Score";
import ShodanTimeline from "./components/ShodanTimeline";

import store from "./store";
import contents from "./contents";
import { convertTimeToSeconds } from "./utils";

const App = props => (
  <Provider store={store}>
    <div className="app-container">
      <aside className="sidebar sidebar--section">
        <div className="narrative-container">
          <h1>{props.title}</h1>
          <Narrative narrative={props.narrative} />
        </div>
        <div>
          <HighlightedTextContainer
            singingStyle={props.singingStyle}
            phrases={props.phrases}
            currentPhraseID="I/1"
          />
          <ShodanTimeline
            sections={props.sections}
            maxIntensity={props.maxIntensity}
            totalDuration={convertTimeToSeconds(props.videoDuration)}
          />
        </div>
      </aside>
      <main>
        <div className="video-player">
          <div className="video-container">
            <MasterVideo videoUrl={props.videoUrl} />
          </div>
          <Score videoUrl={props.videoUrl} />
        </div>
      </main>
    </div>
  </Provider>
);

App.propTypes = {
  currentTime: PropTypes.number,
  isPlaying: PropTypes.bool,
  maxIntensity: PropTypes.number.isRequired,
  narrative: PropTypes.string.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      phraseID: PropTypes.string,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      transcription: PropTypes.string,
      translation: PropTypes.string
    })
  ).isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      left: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    })
  ).isRequired,
  singingStyle: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  title: PropTypes.string,
  videoDuration: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired
};

App.defaultProps = {
  title: "",
  currentTime: 0.0,
  startTime: 0.0,
  isPlaying: false
};

const playName = window.location.pathname.trim().split("/")[1];
const sectionName = window.location.pathname.trim().split("/")[2];

contents.section(playName, sectionName, props => {
  render(<App {...props} />, document.getElementById("section"));
});
