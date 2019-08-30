import React, { Component } from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";
import throttle from "lodash.throttle";

import Acts from "./components/Acts";
import IntermediaTable from "./components/IntermediaTable";
import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import TimelineIndicator from "./components/TimelineIndicator";
import ShodanTimeline from "./components/ShodanTimeline";

import contents from "./contents";
import initializeStore from "./store";
import { setCurrentTime } from "./actionCreators";
import {
  convertTimeToSeconds,
  parseUrlFragment,
  validateTimestamp
} from "./utils";
import { saveState as saveStateToSessionStorage } from "./sessionStorage";

export default class App extends Component {
  constructor(props) {
    super(props);
    const sharedStorageKey = "shared";
    const playStorageKey = "play";
    this.store = initializeStore([sharedStorageKey, playStorageKey]);
    const { title: origin, currentTime } = this.props;
    const {
      currentTime: { origin: storedOrigin }
    } = this.store.getState();

    this.store.subscribe(
      throttle(() => {
        const {
          currentTime: { time },
          narrativeTab
        } = this.store.getState();
        saveStateToSessionStorage(
          { currentTime: { time, origin } },
          sharedStorageKey
        );
        saveStateToSessionStorage({ narrativeTab }, playStorageKey);
      }, 2000)
    );

    // override currentTime stored in sessionStorage if it
    //  doesn't come from an appropriate context
    if (storedOrigin.split("/")[0] !== origin) {
      this.store.dispatch(setCurrentTime({ time: currentTime, origin }));
    }

    // set up a listener for hashchange events, and then process any URL frag that
    //  may have been included at page-load time
    window.addEventListener(
      "hashchange",
      this.updateTimeFromUrlFrag.bind(this),
      false
    );
    this.updateTimeFromUrlFrag();
  }

  updateTimeFromUrlFrag() {
    // check for a URL fragment of the form `#startTime=<timestamp>` and
    // proceed accordingly
    const urlFragParams = parseUrlFragment();
    const seekToTime = validateTimestamp(urlFragParams.startTime); // returns false on absent or unparseable timestamp
    if (seekToTime)
      this.store.dispatch(
        setCurrentTime({ time: seekToTime, origin: "URL_FRAG" })
      );
  }

  render() {
    const {
      acts,
      currentTime,
      maxIntensity,
      narrative,
      sections,
      startTime,
      title,
      tracks,
      videoDuration,
      videoUrl
    } = this.props;

    return (
      <Provider store={this.store}>
        <div className="app-container">
          <aside className="sidebar sidebar--play">
            <div className="sidebar__header">
              <div className="sidebar__back-link">
                <a href="/plays" title="Plays">
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
                  Back to plays
                </a>
              </div>
              <h1>{title}</h1>
            </div>
            <div className="sidebar__container">
              <Narrative narrative={narrative} />
            </div>
          </aside>
          <main>
            <div className="video-player">
              <div className="video-container">
                <MasterVideo
                  videoUrl={videoUrl}
                  startTime={startTime}
                  tracks={tracks}
                />
              </div>
              <div className="timeline">
                <div className="timeline__container">
                  <Acts
                    acts={acts}
                    duration={convertTimeToSeconds(videoDuration)}
                  />
                  <div className="shodan-map__container">
                    <TimelineIndicator
                      startTime={10}
                      currentTime={currentTime}
                      duration={convertTimeToSeconds(videoDuration)}
                    />
                    <ShodanTimeline
                      sections={sections}
                      maxIntensity={maxIntensity}
                      totalDuration={convertTimeToSeconds(videoDuration)}
                    />
                  </div>
                </div>
                {/* These have to update based on current time */}
                <IntermediaTable play={title} sections={sections} />
              </div>
            </div>
          </main>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  narrative: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  videoDuration: PropTypes.string.isRequired,
  currentTime: PropTypes.number,
  startTime: PropTypes.number,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      play: PropTypes.shape({ value: PropTypes.string }),
      sectionUrl: PropTypes.string.isRequired,
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
      dan: PropTypes.shape({
        number: PropTypes.string,
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
  startTime: 0.0
  // isPlaying: false
};

// If main app
/* istanbul ignore if */
if (!module.parent) {
  const playName = window.location.pathname.trim().split("/")[1];
  contents.play(playName, props => {
    render(<App {...props} />, document.getElementById("play"));
  });
}
