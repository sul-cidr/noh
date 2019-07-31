import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentTime, setScoreToggles } from "../actionCreators";
import TimelineScrubber from "./TimelineScrubber";
import { convertSecondsToHhmmss } from "../utils";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

class ScoreControls extends Component {
  constructor(props) {
    super(props);
    const {
      isBeatOn,
      isTextOn,
      isPercussionOn,
      isNohkanOn,
      isDanceOn,
      isPrevSentenceOn,
      isNextSentenceOn
    } = this.props;
    this.state = {
      isBeatOn,
      isTextOn,
      isPercussionOn,
      isNohkanOn,
      isDanceOn,
      isPrevSentenceOn,
      isNextSentenceOn
    };
    this.filtersPopup = null;
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.updateScoreToggles(this.props);
  }

  componentDidUpdate() {
    this.props.updateScoreToggles(this.state);
  }

  handleToggle(event, toggleName) {
    this.setState({
      [toggleName]: event.target.checked
    });
  }

  determinePhraseIndices() {
    const { currentTime, duration, startTime, phrases } = this.props;

    if (currentTime < startTime) {
      return [null, null, 0];
    }
    // The ugly +1 is here to account for fractions of seconds; not 100%
    //  satisfactory, but doing it properly would mean rewriting a lot of code.
    if (currentTime > startTime + duration + 1) {
      return [phrases.length - 1, null, null];
    }

    const currentPhraseIndex =
      phrases.length -
      (phrases
        .filter(Boolean)
        .reverse()
        .findIndex(phrase => currentTime >= phrase.startTime.value) +
        1);

    const lastPhraseStartTime = phrases[phrases.length - 1].startTime.value;
    const nextPhraseIndex =
      currentTime >= lastPhraseStartTime
        ? null
        : Math.min(currentPhraseIndex + 1, phrases.length - 1);
    const prevPhraseIndex = Math.max(currentPhraseIndex - 1, 0);

    return [prevPhraseIndex, currentPhraseIndex, nextPhraseIndex];
  }

  render() {
    const [
      prevPhraseIndex,
      currentPhraseIndex,
      nextPhraseIndex
    ] = this.determinePhraseIndices();
    const remainingTime = convertSecondsToHhmmss(
      clamp(
        this.props.startTime + this.props.duration - this.props.currentTime,
        0,
        this.props.duration
      )
    ).substr(3);
    const elapsedTime = convertSecondsToHhmmss(
      clamp(
        this.props.currentTime - this.props.startTime,
        0,
        this.props.duration
      )
    ).substr(3);
    return (
      <div className="score-controls">
        <div className="sentence-control">
          <button
            className="sentence-control__prev"
            onClick={() =>
              prevPhraseIndex !== null &&
              this.props.updateStartTime(
                this.props.phrases[prevPhraseIndex].startTime.value
              )
            }
          >
            <i className="fas fa-step-backward" />
          </button>
          <div className="sentence-control__status">
            <span className="sentence-control__title">Sentence:</span>
            <span className="sentence-control__current">
              {currentPhraseIndex == null ? "--" : currentPhraseIndex + 1}/{
                this.props.phrases.length
              }
            </span>
          </div>
          <button
            className="sentence-control__next"
            onClick={() =>
              nextPhraseIndex !== null &&
              this.props.updateStartTime(
                this.props.phrases[nextPhraseIndex].startTime.value
              )
            }
          >
            <i className="fas fa-step-forward" />
          </button>
        </div>
        <div className="score-controls__time">
          <div className="score-controls__elapsed-time">{elapsedTime}</div>
          <div className="video-progress">
            <TimelineScrubber
              startTime={this.props.startTime}
              duration={this.props.duration}
            />
          </div>
          <div className="score-controls__remaining-time">{remainingTime}</div>
        </div>
        <div className="score-controls__filters">
          <button
            className="score-controls__filters-button"
            onClick={() => this.filtersPopup.classList.toggle("hidden")}
          >
            Filters
          </button>
          <div
            className="score-controls__filters-popup hidden"
            ref={filtersPopup => {
              this.filtersPopup = filtersPopup;
            }}
          >
            <ul className="channel-toggles">
              <li className="toggles__title">Lines</li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scoreBeat"
                    type="checkbox"
                    checked={this.state.isBeatOn}
                    onChange={event => this.handleToggle(event, "isBeatOn")}
                    onKeyPress={null}
                  />
                  <label htmlFor="scoreBeat">
                    <span className="custom-checkbox__text">Beat</span>
                  </label>
                </div>
              </li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scoreText"
                    type="checkbox"
                    checked={this.state.isTextOn}
                    onChange={event => this.handleToggle(event, "isTextOn")}
                    onKeyPress={null}
                  />
                  <label htmlFor="scoreText">
                    <span className="custom-checkbox__text">Text</span>
                  </label>
                </div>
              </li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scorePercussion"
                    type="checkbox"
                    checked={this.state.isPercussionOn}
                    onChange={event =>
                      this.handleToggle(event, "isPercussionOn")
                    }
                    onKeyPress={null}
                  />
                  <label htmlFor="scorePercussion">
                    <span className="custom-checkbox__text">Percussion</span>
                  </label>
                </div>
              </li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scoreNohkan"
                    type="checkbox"
                    checked={this.state.isNohkanOn}
                    onChange={event => this.handleToggle(event, "isNohkanOn")}
                    onKeyPress={null}
                  />
                  <label htmlFor="scoreNohkan">
                    <span className="custom-checkbox__text">Nohkan</span>
                  </label>
                </div>
              </li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scoreDance"
                    type="checkbox"
                    checked={this.state.isDanceOn}
                    onChange={event => this.handleToggle(event, "isDanceOn")}
                    onKeyPress={null}
                  />
                  <label htmlFor="scoreDance">
                    <span className="custom-checkbox__text">Dance</span>
                  </label>
                </div>
              </li>
            </ul>
            <ul className="measure-toggles">
              <li className="toggles__title">Sentences</li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scorePrevSentence"
                    type="checkbox"
                    checked={this.state.isPrevSentenceOn}
                    onChange={event =>
                      this.handleToggle(event, "isPrevSentenceOn")
                    }
                    onKeyPress={null}
                  />
                  <label htmlFor="scorePrevSentence">
                    <span className="custom-checkbox__text">
                      Previous Sentence
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div className="custom-checkbox">
                  <input
                    id="scoreNextSentence"
                    type="checkbox"
                    checked={this.state.isNextSentenceOn}
                    onChange={event =>
                      this.handleToggle(event, "isNextSentenceOn")
                    }
                    onKeyPress={null}
                  />
                  <label htmlFor="scoreNextSentence">
                    <span className="custom-checkbox__text">Next Sentence</span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ScoreControls.propTypes = {
  isBeatOn: PropTypes.bool,
  isTextOn: PropTypes.bool,
  isPercussionOn: PropTypes.bool,
  isNohkanOn: PropTypes.bool,
  isDanceOn: PropTypes.bool,
  isPrevSentenceOn: PropTypes.bool,
  isNextSentenceOn: PropTypes.bool,
  updateScoreToggles: PropTypes.func,
  startTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      startTime: PropTypes.shape({
        value: PropTypes.number
      })
    })
  ).isRequired,
  updateStartTime: PropTypes.func.isRequired
};

ScoreControls.defaultProps = {
  isBeatOn: true,
  isTextOn: true,
  isPercussionOn: true,
  isNohkanOn: true,
  isDanceOn: true,
  isPrevSentenceOn: true,
  isNextSentenceOn: true,
  updateScoreToggles: () => {},
  startTime: 0
};

const mapStateToProps = state => ({
  currentTime: state.currentTime.time,
  isBeatOn: state.toggles.isBeatOn,
  isTextOn: state.toggles.isTextOn,
  isPercussionOn: state.toggles.isPercussionOn,
  isNohkanOn: state.toggles.isNohkanOn,
  isDanceOn: state.toggles.isDanceOn,
  isPrevSentenceOn: state.toggles.isPrevSentenceOn,
  isNextSentenceOn: state.toggles.isNextSentenceOn
});

const mapDispatchToProps = dispatch => ({
  updateScoreToggles: toggles => dispatch(setScoreToggles(toggles)),
  updateStartTime: time =>
    dispatch(setCurrentTime({ time, origin: "ScoreControls" }))
});

export const Unwrapped = ScoreControls;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreControls);
