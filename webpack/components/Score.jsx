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
    beatsArray[i] = "";
    beatsArray[grid[i].start] = grid[i].text;
  }
  return beatsArray;
}

export const determineCurrentPhrase = props =>
  props.currentTime > 0
    ? props.phrases.length -
      (props.phrases
        .filter(Boolean)
        .reverse()
        .findIndex(phrase => props.currentTime >= phrase.startTime.value) +
        1)
    : 0;

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousPhrase: null,
      currentPhrase: this.props.phrases[0],
      nextPhrase: this.props.phrases[1],
      toggles: this.props.toggles
    };
  }

  componentWillReceiveProps(props) {
    const currentPhraseId = determineCurrentPhrase(props);
    const previousPhraseId = Math.max(currentPhraseId - 1, 0);
    const nextPhraseId = Math.min(currentPhraseId + 1, props.phrases.length);
    this.setState({
      previousPhrase: props.phrases[previousPhraseId],
      currentPhrase: props.phrases[currentPhraseId],
      nextPhrase: props.phrases[nextPhraseId],
      toggles: props.toggles
    });
  }

  createPhrase(phrase, position) {
    const beatNums = phrase ? createBeatsArray(phrase.beat.grid) : [];
    const beats = beatNums.map((num, idx) => (
      <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
    ));
    const percussion = phrase ? phrase.percussion.value : "None";
    const measureBeats = this.state.toggles.isBeatOn ? (
      <div className="measure__channel">{beats}</div>
    ) : (
      ""
    );
    const measureText = this.state.toggles.isTextOn ? (
      <div className="measure__channel measure__channel--large">
        <ScoreTextLine
          textGrid={phrase ? phrase.syllableText.grid : []}
          length={beatNums.length}
          rangeGrid={phrase ? phrase.vocalRange.grid : []}
        />
      </div>
    ) : (
      ""
    );
    const measurePercussion = this.state.toggles.isPercussionOn ? (
      <div className="measure__channel">
        <CellPercussion text={percussion} length={beatNums.length} />
      </div>
    ) : (
      ""
    );
    const measureNohkan = this.state.toggles.isNohkanOn ? (
      <div className="measure__channel">
        <NohkanLine
          grid={phrase ? phrase.nohkan.grid : []}
          length={beatNums.length}
        />
      </div>
    ) : (
      ""
    );
    const measureDance = this.state.toggles.isDanceOn ? (
      <div className="measure__channel">
        <DanceLine
          grid={phrase ? phrase.dance.grid : []}
          length={beatNums.length}
        />
      </div>
    ) : (
      ""
    );
    return (
      <div className={`measure measure--${position}`}>
        <MeasureLabelContainer
          {...{ [position]: true }}
          {...this.state.toggles}
        />
        <div className="measure__grid-container">
          {measureBeats}
          {measureText}
          {measurePercussion}
          {measureNohkan}
          {measureDance}
        </div>
      </div>
    );
  }

  render() {
    let previous = "";
    if (
      this.state.previousPhrase !== this.state.currentPhrase &&
      this.state.toggles.isPrevSentenceOn
    ) {
      previous = this.createPhrase(this.state.previousPhrase, "previous");
    }
    const current = this.createPhrase(this.state.currentPhrase);
    let next = "";
    if (
      this.state.nextPhrase !== this.state.currentPhrase &&
      this.state.toggles.isNextSentenceOn
    ) {
      next = this.createPhrase(this.state.nextPhrase, "next");
    }
    return (
      <div className="score">
        {previous} {current} {next}
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
  ).isRequired,
  toggles: PropTypes.shape({
    isBeatOn: PropTypes.bool,
    isTextOn: PropTypes.bool,
    isPercussionOn: PropTypes.bool,
    isNohkanOn: PropTypes.bool,
    isDanceOn: PropTypes.bool,
    isPrevSentenceOn: PropTypes.bool,
    isNextSentenceOn: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  toggles: state.toggles
});

export const Unwrapped = Score;
export default connect(mapStateToProps)(Score);
