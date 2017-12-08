import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import MasterVideo from "./components/MasterVideo";
import IntermediaTable from "./components/IntermediaTable";
import ShodanTimeline from "./components/ShodanTimeline";
import TimeMarks from "./components/TimeMarks";
import Acts from "./components/Acts";
import TimelineIndicator from "./components/TimelineIndicator";
import store from "./store";

const App = props => (
  <Provider store={store}>
    <div className="video-player">
      <div className="video-container">
        <MasterVideo videoUrl="https://www.dropbox.com/s/r1kcgknu22b6iao/hashitomi-kiri-dance-part1.mov?dl=1" />
      </div>
      <div className="timeline">
        <div className="timeline__container">
          <TimeMarks />
          <Acts />
          <div className="shodan-map__container">
            <TimelineIndicator
              duration={1 * 60 + 44}
              currentTime={props.currentTime}
              playing={props.isPlaying}
            />
            <ShodanTimeline />
          </div>
        </div>
        <IntermediaTable />
      </div>
    </div>
  </Provider>
);

App.propTypes = {
  currentTime: PropTypes.number,
  isPlaying: PropTypes.bool
};

App.defaultProps = {
  currentTime: 0,
  isPlaying: false
};

render(<App />, document.getElementById("playerFirst"));
