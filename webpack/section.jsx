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
            {props.playName}
          </div>
          <h1>{props.title}</h1>
        </div>
        <div className="sidebar__container">
          <Narrative narrative={props.narrative} />
        </div>
        <div className="sidebar__extras">
          <div className="highlighted-text__container is-open">
            <div className="sidebar__collapsable-title sidebar__collapsable-title--libretto">
              <h3>Libretto</h3>
            </div>
            <HighlightedTextContainer
              singingStyle={props.singingStyle}
              phrases={props.captions}
              currentPhraseID="I/1"
            />
          </div>

          <div className="shodan-timeline__container is-open">
            <div className="sidebar__collapsable-title sidebar__collapsable-title--map">
              <h3>Section map</h3>
            </div>
            <ShodanTimeline
              sections={props.sections}
              maxIntensity={props.maxIntensity}
              totalDuration={props.videoDuration}
            />
          </div>
        </div>
      </aside>
      <main>
        <div className="video-player">
          <div className="video-container">
            <MasterVideo videoUrl={props.videoUrl} tracks={props.tracks} />
          </div>
          <Score phrases={props.phrases} />
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
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      kind: PropTypes.string,
      lang: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  videoDuration: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      startTime: PropTypes.shape({}),
      beat: PropTypes.shape({}),
      dance: PropTypes.shape({}),
      nohkan: PropTypes.shape({}),
      percussion: PropTypes.shape({}),
      phrase: PropTypes.string,
      syllableNumber: PropTypes.shape({}),
      syllableText: PropTypes.shape({}),
      text: PropTypes.shape({}),
      vocalRange: PropTypes.shape({})
    })
  ).isRequired
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
