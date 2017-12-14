import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import HighlightedTextContainer from "./components/HighlightedTextContainer";
import store from "./store";
import sampleData from "./data/sample-section-data.json";

const sectionData = sampleData;

const App = props => (
  <Provider store={store}>
    <div className="app">
      <Narrative narrative={props.narrative} />
      <MasterVideo videoUrl={props.videoUrl} />
      <HighlightedTextContainer
        singingStyle={props.singingStyle}
        phrases={props.phrases}
        currentPhraseID="I/1"
      />
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

render(<App {...sectionData} />, document.getElementById("section"));
