import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";

import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import HighlightedTextContainer from "./components/HighlightedTextContainer";
import Score from "./components/Score";

import store from "./store";
import contents from "./contents";

const App = props => (
  <Provider store={store}>
    <div className="app-container">
      <aside>
        <h1>{props.title}</h1>
        <Narrative narrative={props.narrative} />
        <HighlightedTextContainer
          singingStyle={props.singingStyle}
          phrases={props.phrases}
          currentPhraseID="I/1"
        />
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
  narrative: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  singingStyle: PropTypes.string.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      phraseID: PropTypes.string,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      transcription: PropTypes.string,
      translation: PropTypes.string
    })
  ).isRequired
};

const playName = window.location.pathname.trim().split("/")[1];
const sectionName = window.location.pathname.trim().split("/")[2];

contents.section(playName, sectionName, props => {
  render(<App {...props} />, document.getElementById("section"));
});
