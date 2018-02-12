import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasureLabelContainer from "./MeasureLabelContainer";
import CellBeat from "./CellBeat";
import CellPercussion from "./CellPercussion";
import NohkanLine from "./NohkanLine";
import DanceLine from "./DanceLine";
import ScoreTextLine from "./ScoreTextLine";

function createBeatsArray(grid) {
  const beatsArray = [];
  for (let i = 0; i < grid.length; i += 1) {
    beatsArray[grid[i].start] = grid[i].text;
  }
  return [...Array(beatsArray.length).keys()].map(i => beatsArray[i] || "");
}

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousPhrase: null,
      currentPhrase: this.props.phrases[0],
      nextPhrase: this.props.phrases[1]
    };
  }

  componentWillReceiveProps() {
    const currentPhraseId = this.determineCurrentPhrase();
    const previousPhraseId = Math.max(currentPhraseId - 1, 0);
    const nextPhraseId = Math.min(
      currentPhraseId + 1,
      this.props.phrases.length
    );
    this.setState({
      previousPhrase: this.props.phrases[previousPhraseId],
      currentPhrase: this.props.phrases[currentPhraseId],
      nextPhrase: this.props.phrases[nextPhraseId]
    });
  }

  determineCurrentPhrase() {
    if (this.props.currentTime > 0) {
      return (
        this.props.phrases.length -
        1 -
        this.props.phrases
          .filter(Boolean)
          .reverse()
          .findIndex(phrase => this.props.currentTime >= phrase.startTime.value)
      );
    }
    return 0;
  }

  render() {
    console.log(this.props.phrases[0]);
    console.log(this.props.phrases[1]);

    const prevBeatNums = this.state.previousPhrase
      ? createBeatsArray(this.state.previousPhrase.beat.grid)
      : [];
    const currentBeatNums = this.state.currentPhrase
      ? createBeatsArray(this.state.currentPhrase.beat.grid)
      : [];
    const nextBeatNums = this.state.nextPhrase
      ? createBeatsArray(this.state.nextPhrase.beat.grid)
      : [];

    const prevBeats = prevBeatNums.map((num, idx) => (
      <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
    ));
    const currentBeats = currentBeatNums.map((num, idx) => (
      <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
    ));
    const nextBeats = nextBeatNums.map((num, idx) => (
      <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
    ));
    const prevPercussion = this.state.previousPhrase
      ? this.state.previousPhrase.percussion.value
      : "None";
    const currentPercussion = this.state.currentPhrase
      ? this.state.currentPhrase.percussion.value
      : "None";
    const nextPercussion = this.state.nextPhrase
      ? this.state.nextPhrase.percussion.value
      : "None";
    return (
      <div className="score">
        <div className="measure measure--prev">
          <MeasureLabelContainer previous />
          <div className="measure__grid-container">
            <div className="measure__channel">{prevBeats}</div>
            <div className="measure__channel measure__channel--large">
              <ScoreTextLine
                grid={
                  this.state.previousPhrase
                    ? this.state.previousPhrase.syllableText.grid
                    : []
                }
                length={prevBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <CellPercussion
                text={prevPercussion}
                length={prevBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <NohkanLine
                grid={
                  this.state.previousPhrase
                    ? this.state.previousPhrase.nohkan.grid
                    : []
                }
                length={prevBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <DanceLine
                grid={
                  this.state.previousPhrase
                    ? this.state.previousPhrase.dance.grid
                    : []
                }
                length={prevBeatNums.length}
              />
            </div>
          </div>
        </div>
        <div className="measure measure--current">
          <MeasureLabelContainer />
          <div className="measure__grid-container">
            <div className="measure__channel">{currentBeats}</div>
            <div className="measure__channel measure__channel--large">
              <ScoreTextLine
                grid={
                  this.state.currentPhrase
                    ? this.state.currentPhrase.syllableText.grid
                    : []
                }
                length={currentBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <CellPercussion
                text={currentPercussion}
                length={currentBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <NohkanLine
                grid={
                  this.state.currentPhrase
                    ? this.state.currentPhrase.nohkan.grid
                    : []
                }
                length={currentBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <DanceLine
                grid={
                  this.state.currentPhrase
                    ? this.state.currentPhrase.dance.grid
                    : []
                }
                length={currentBeatNums.length}
              />
            </div>
          </div>
        </div>
        <div className="measure measure--next">
          <MeasureLabelContainer next />
          <div className="measure__grid-container">
            <div className="measure__channel">{nextBeats}</div>
            <div className="measure__channel measure__channel--large">
              <ScoreTextLine
                grid={
                  this.state.nextPhrase
                    ? this.state.nextPhrase.syllableText.grid
                    : []
                }
                length={nextBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <CellPercussion
                text={nextPercussion}
                length={nextBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <NohkanLine
                grid={
                  this.state.nextPhrase ? this.state.nextPhrase.nohkan.grid : []
                }
                length={nextBeatNums.length}
              />
            </div>
            <div className="measure__channel">
              <DanceLine
                grid={
                  this.state.nextPhrase ? this.state.nextPhrase.dance.grid : []
                }
                length={nextBeatNums.length}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  currentTime: PropTypes.number.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      startTime: PropTypes.shape({}),
      beat: PropTypes.shape({
        grid: PropTypes.arrayOf(PropTypes.shape({}))
      }),
      dance: PropTypes.shape({}),
      nohkan: PropTypes.shape({}),
      percussion: PropTypes.shape({ value: PropTypes.string.isRequired }),
      phrase: PropTypes.string,
      syllableNumber: PropTypes.shape({}),
      syllableText: PropTypes.shape({}),
      text: PropTypes.shape({}),
      vocalRange: PropTypes.shape({})
    })
  ).isRequired
};

const mapStateToProps = state => ({
  currentTime: state.currentTime
});

export const Unwrapped = Score;
export default connect(mapStateToProps)(Score);
