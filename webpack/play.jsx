import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MasterVideo from "./components/MasterVideo";
import Dance from "./components/Dance";
import TimelineIndicator from "./components/TimelineIndicator";
import Narrative from "./components/Narrative";
import store from "./store";
import contents from "./contents";

const App = props => (
  <Provider store={store}>
    <div className="app">
      <Narrative narrative={props.narrative} />
      <MasterVideo videoUrl={props.videoUrl} />
      <Dance />
      <TimelineIndicator
        currentTime={props.currentTime}
        duration={props.videoDuration}
        playing={props.isPlaying}
      />
    </div>
  </Provider>
);

App.propTypes = {
  narrative: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  videoDuration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  isPlaying: PropTypes.bool
};

App.defaultProps = {
  currentTime: 0.0,
  isPlaying: false
};

const playName = window.location.pathname.trim().split("/")[1];

contents.play(playName, props => {
  render(<App {...props} />, document.getElementById("play"));
});
