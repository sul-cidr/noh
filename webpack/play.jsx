import React, { Component } from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";
import throttle from "lodash.throttle";

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
                  <div className="shodan-map__container" id="stepPlayShodanMap">
                    <TimelineIndicator
                      currentTime={currentTime}
                      duration={convertTimeToSeconds(videoDuration)}
                    />
                    <ShodanTimeline
                      acts={acts}
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
      captions: PropTypes.array,
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
