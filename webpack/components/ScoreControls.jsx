import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setScoreToggles } from "../actionCreators";
import TimelineIndicator from "./TimelineIndicator";

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

  render() {
    return (
      <div className="score-controls">
        <div className="sentence-control">
          <div className="sentence-control__prev">
            <i className="fas fa-step-backward" />
          </div>
          <div className="sentence-control__status">
            <span className="sentence-control__title">Sentence:</span>
            <span className="sentence-control__current">13/55</span>
          </div>
          <div className="sentence-control__next">
            <i className="fas fa-step-forward" />
          </div>
        </div>
        <div className="video-progress">
          <TimelineIndicator
            startTime={this.props.startTime}
            duration={this.props.duration}
          />
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
  duration: PropTypes.number.isRequired
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

const mapDispatchToProps = dispatch => ({
  updateScoreToggles: toggles => dispatch(setScoreToggles(toggles))
});

export const Unwrapped = ScoreControls;
export default connect(
  null,
  mapDispatchToProps
)(ScoreControls);
