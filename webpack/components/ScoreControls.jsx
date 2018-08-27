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
    const checkboxIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
      >
        <g fill="#9aa0a6" fillRule="evenodd">
          <path
            fillRule="nonzero"
            d="M6,11.5 C2.96243388,11.5 0.5,9.03756612 0.5,6 C0.5,2.96243388 2.96243388,0.5 6,0.5 C9.03756612,0.5 11.5,2.96243388 11.5,6 C11.5,9.03756612 9.03756612,11.5 6,11.5 Z M6,10.5 C8.48528137,10.5 10.5,8.48528137 10.5,6 C10.5,3.51471863 8.48528137,1.5 6,1.5 C3.51471863,1.5 1.5,3.51471863 1.5,6 C1.5,8.48528137 3.51471863,10.5 6,10.5 Z"
          />
          <path
            d="M4.90165043,6 L7.90165043,6 C8.1777928,6 8.40165043,6.22385763 8.40165043,6.5 C8.40165043,6.77614237 8.1777928,7 7.90165043,7 L4.40165043,7 C4.12550805,7 3.90165043,6.77614237 3.90165043,6.5 L3.90165043,4.5 C3.90165043,4.22385763 4.12550805,4 4.40165043,4 C4.6777928,4 4.90165043,4.22385763 4.90165043,4.5 L4.90165043,6 Z"
            transform="rotate(-45 6.152 5.5)"
          />
        </g>
      </svg>
    );
    return (
      <div className="score-controls">
        <ul className="channel-toggles">
          <li>
            <input
              type="checkbox"
              checked={this.state.isBeatOn}
              onChange={event => this.handleToggle(event, "isBeatOn")}
              onKeyPress={null}
              id="scoreBeat"
            />
            <label htmlFor="scoreBeat">
              {checkboxIcon}
              Beat
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={this.state.isTextOn}
              onChange={event => this.handleToggle(event, "isTextOn")}
              onKeyPress={null}
              id="scoreText"
            />
            <label htmlFor="scoreText">
              {checkboxIcon}
              Text
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={this.state.isPercussionOn}
              onChange={event => this.handleToggle(event, "isPercussionOn")}
              onKeyPress={null}
              id="scorePercussion"
            />
            <label htmlFor="scorePercussion">
              {checkboxIcon}
              Percussion
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={this.state.isNohkanOn}
              onChange={event => this.handleToggle(event, "isNohkanOn")}
              onKeyPress={null}
              id="scoreNohkan"
            />
            <label htmlFor="scoreNohkan">
              {checkboxIcon}
              Nohkan
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={this.state.isDanceOn}
              onChange={event => this.handleToggle(event, "isDanceOn")}
              onKeyPress={null}
              id="scoreDance"
            />
            <label htmlFor="scoreDance">
              {checkboxIcon}
              Dance
            </label>
          </li>
        </ul>
        <div className="video-progress">
          <TimelineIndicator
            startTime={this.props.startTime}
            duration={this.props.duration}
          />
        </div>
        <ul className="measure-toggles">
          <li>
            <input
              type="checkbox"
              checked={this.state.isPrevSentenceOn}
              onChange={event => this.handleToggle(event, "isPrevSentenceOn")}
              onKeyPress={null}
              id="scorePrevSentence"
            />
            <label htmlFor="scorePrevSentence">
              {checkboxIcon}
              Previous Sentence
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              checked={this.state.isNextSentenceOn}
              onChange={event => this.handleToggle(event, "isNextSentenceOn")}
              onKeyPress={null}
              id="scoreNextSentence"
            />
            <label htmlFor="scoreNextSentence">
              {checkboxIcon}
              Next Sentence
            </label>
          </li>
        </ul>
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
