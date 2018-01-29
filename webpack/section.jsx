import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";

import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import HighlightedTextContainer from "./components/HighlightedTextContainer";
import Score from "./components/Score";
import ScoreControls from "./components/ScoreControls";
import ShodanTimeline from "./components/ShodanTimeline";

import store from "./store";
import contents from "./contents";

const App = props => (
  <Provider store={store}>
    <div className="app-container">
      <aside className="sidebar sidebar--section">
        <div className="sidebar__container">
          <div className="sidebar__header">
            <div className="sidebar__back-link">{props.playName}</div>
            <h1>{props.title}</h1>
          </div>
          <Narrative narrative={props.narrative} />
        </div>
        <div className="sidebar__extras">
          <HighlightedTextContainer
            singingStyle={props.singingStyle}
            phrases={props.captions}
            currentPhraseID="I/1"
          />
          <ShodanTimeline
            sections={props.sections}
            maxIntensity={props.maxIntensity}
            totalDuration={props.videoDuration}
          />
        </div>
      </aside>
      <main>
        <div className="video-player">
          <div className="video-container">
            <MasterVideo videoUrl={props.videoUrl} />
          </div>
          <Score videoUrl={props.videoUrl} />
          <ScoreControls />
        </div>
      </main>
    </div>
  </Provider>
);

App.propTypes = {
  // currentTime: PropTypes.number,
  // isPlaying: PropTypes.bool,
  maxIntensity: PropTypes.number.isRequired,
  narrative: PropTypes.string.isRequired,
  captions: PropTypes.arrayOf(
    PropTypes.shape({
      phraseID: PropTypes.string,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      transcription: PropTypes.string,
      translation: PropTypes.string
    })
  ).isRequired,
  playName: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number })
    })
  ).isRequired,
  singingStyle: PropTypes.string.isRequired,
  // startTime: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  videoDuration: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired
};

App.defaultProps = {
  // currentTime: 0.0,
  // startTime: 0.0,
  // isPlaying: false
};

const playName = window.location.pathname.trim().split("/")[1];
const sectionName = window.location.pathname.trim().split("/")[2];

contents.section(playName, sectionName, props => {
  render(<App {...props} />, document.getElementById("section"));
});
