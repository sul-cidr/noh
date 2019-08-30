import React, { Component } from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Provider } from "react-redux";
import throttle from "lodash.throttle";

import MasterVideo from "./components/MasterVideo";
import Narrative from "./components/Narrative";
import HighlightedTextContainer from "./components/HighlightedTextContainer";
import Score from "./components/Score";
import ScoreControls from "./components/ScoreControls";
import SectionControls from "./components/SectionControls";
import ShodanTimeline from "./components/ShodanTimeline";

import initializeStore from "./store";
import contents from "./contents";
import { setCurrentTime, setSidebarState } from "./actionCreators";
import { saveState as saveStateToLocalStorage } from "./localStorage";
import { saveState as saveStateToSessionStorage } from "./sessionStorage";
import { parseUrlFragment, validateTimestamp } from "./utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    const sharedStorageKey = "shared";
    const sectionStorageKey = "section";
    this.store = initializeStore([sharedStorageKey, sectionStorageKey]);
    this.state = this.store.getState().sidebarState;

    const {
      startTime,
      playName,
      sectionName: { value: sectionName }
    } = this.props;
    const {
      currentTime: { origin: storedOrigin }
    } = this.store.getState();
    const origin = `${playName}/${sectionName}`;

    this.store.subscribe(
      throttle(() => {
        const {
          narrativeTab,
          sidebarState,
          toggles,
          currentTime: { time }
        } = this.store.getState();
        saveStateToLocalStorage({ toggles }, sectionStorageKey);
        saveStateToSessionStorage(
          { currentTime: { time, origin } },
          sharedStorageKey
        );
        saveStateToSessionStorage(
          { narrativeTab, sidebarState },
          sectionStorageKey
        );
      }, 2000)
    );

    // override currentTime stored in sessionStorage if it
    //  doesn't come from an appropriate context
    const [play, section] = storedOrigin.split("/");
    if (play !== playName || ![sectionName, undefined].includes(section)) {
      this.store.dispatch(setCurrentTime({ time: startTime, origin }));
    }

    window.addEventListener(
      "hashchange",
      this.updateTimeFromUrlFrag.bind(this),
      false
    );
    this.updateTimeFromUrlFrag();
  }

  getSectionURLS() {
    const sectionIndex = this.props.sections.findIndex(
      section => section.sectionName.value === this.props.sectionName.value
    );
    let prevSectionURL = "";
    let nextSectionURL = "";
    if (sectionIndex !== 0) {
      prevSectionURL = this.props.sections[sectionIndex - 1].sectionUrl;
    }
    if (sectionIndex !== this.props.sections.length - 1) {
      nextSectionURL = this.props.sections[sectionIndex + 1].sectionUrl;
    }

    return [prevSectionURL, nextSectionURL];
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

  handleToggle(event, toggleName) {
    if (["H3", "path", "svg"].includes(event.target.tagName)) {
      this.setState(
        prevState => ({ [toggleName]: !prevState[toggleName] }),
        () => this.store.dispatch(setSidebarState(this.state))
      );
    }
  }

  render() {
    const prevSectionURL = this.getSectionURLS()[0];
    const nextSectionURL = this.getSectionURLS()[1];
    const textIsCongruent = /[^-]congruent/.test(this.props.text.value);
    const score =
      this.props.phrases && this.props.phrases.length > 0
        ? [
            <Score
              key="score"
              startTime={this.props.startTime}
              duration={this.props.duration}
              phrases={this.props.phrases}
              textIsCongruent={textIsCongruent}
            />
          ]
        : [
            <div key="score" className="score score-no-phrases">
              No score in this shōdan
            </div>
          ];
    score.push(
      <ScoreControls
        key="score-controls"
        isPrevSentenceOn={false}
        startTime={this.props.startTime}
        duration={this.props.duration}
        phrases={this.props.phrases}
      />
    );
    const shodanName = this.props.shodanType.value ? (
      <span>
        <a
          className="shodan__outlink"
          href={`/catalog-of-shodan/${this.props.shodanType.value}`}
          title="Definition"
          target="_blank"
          rel="noopener noreferrer"
        >
          {this.props.title}{" "}
          <sup className="shodan__outlink-circlei">
            <i className="fas fa-info-circle" />
          </sup>
        </a>
      </span>
    ) : (
      this.props.title
    );
    const toggle = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="8"
        viewBox="0 0 5 8"
      >
        <path
          fill="currentColor"
          d="M4.85867035,3.69004567 C5.03479817,3.86118721 5.03479817,4.13881279 4.85867035,4.30995433 L1.20566283,7.85972604 C1.02953501,8.03086756 0.743820723,8.03086756 0.567692902,7.85972604 L0.14156508,7.44566211 C-0.0343747624,7.2747032 -0.0347507053,6.99780822 0.140813202,6.82648402 L3.03592599,4 L0.140625238,1.17369863 C-0.0347507053,1.00237443 -0.0345627338,0.725479452 0.141377116,0.554520548 L0.56750493,0.140456621 C0.743632752,-0.0306849315 1.02934704,-0.0306849315 1.20547486,0.140456621 L4.85867035,3.69004567 Z"
        />
      </svg>
    );
    return (
      <Provider store={this.store}>
        <div className="app-container">
          <aside className="sidebar sidebar--section">
            <div className="sidebar__header">
              <div className="sidebar__back-link">
                <a href={this.props.playUrl} title={this.props.playName}>
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
                  {this.props.playName}
                </a>
              </div>
              <h1>{shodanName}</h1>
            </div>
            <div className="sidebar__container">
              <Narrative narrative={this.props.narrative} />
            </div>
            <div className="sidebar__extras">
              <div
                role="presentation"
                className={`highlighted-text__container ${
                  this.state.isHighlightedTextOn && this.props.captions.length
                    ? "is-open"
                    : ""
                }`}
                onClick={event =>
                  this.handleToggle(event, "isHighlightedTextOn")
                }
                onKeyPress={null}
              >
                <div
                  className={`sidebar__collapsable-title sidebar__collapsable-title--libretto ${
                    this.props.captions.length ? "" : "disabled"
                  }`}
                >
                  <h3>{toggle} Text</h3>
                </div>
                <HighlightedTextContainer
                  phrases={this.props.captions}
                  currentPhraseID="I/1"
                />
              </div>
              <div
                role="presentation"
                className={`shodan-timeline__container ${
                  this.state.isShodanTimelineOn ? "is-open" : ""
                }`}
                onClick={event =>
                  this.handleToggle(event, "isShodanTimelineOn")
                }
                onKeyPress={null}
              >
                <div className="sidebar__collapsable-title sidebar__collapsable-title--map">
                  <h3>{toggle} Shōdan map</h3>
                  <ShodanTimeline
                    mode="url"
                    sections={this.props.sections}
                    maxIntensity={this.props.maxIntensity}
                    totalDuration={this.props.videoDuration}
                  />
                </div>
                <ShodanTimeline
                  mode="url"
                  sections={this.props.sections}
                  maxIntensity={this.props.maxIntensity}
                  totalDuration={this.props.videoDuration}
                />
              </div>
              <SectionControls
                prevSectionURL={prevSectionURL}
                nextSectionURL={nextSectionURL}
              />
            </div>
          </aside>
          <main>
            <div className="video-player">
              <div className="video-container">
                <MasterVideo
                  videoUrl={this.props.videoUrl}
                  tracks={this.props.tracks}
                />
              </div>
              {score}
            </div>
          </main>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  // currentTime: PropTypes.number,
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
  playUrl: PropTypes.string.isRequired,
  sectionName: PropTypes.shape({
    value: PropTypes.string
  }).isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      sectionUrl: PropTypes.string.isRequired,
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number }),
      shodanType: PropTypes.shape({ value: PropTypes.string }),
      dan: PropTypes.shape({
        number: PropTypes.string,
        value: PropTypes.string
      })
    })
  ).isRequired,
  shodanType: PropTypes.shape({ value: PropTypes.string }),
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
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
  ).isRequired,
  text: PropTypes.shape({ value: PropTypes.string }).isRequired
};

App.defaultProps = {
  shodanType: { value: "" }
};

// If main app
/* istanbul ignore if */
if (!module.parent) {
  const playName = window.location.pathname.trim().split("/")[1];
  const sectionName = window.location.pathname.trim().split("/")[2];
  contents.section(playName, sectionName, props => {
    render(<App {...props} />, document.getElementById("section"));
  });
}
