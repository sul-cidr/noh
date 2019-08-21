import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CellBeat from "./CellBeat";
import CellPercussion from "./CellPercussion";
import DanceLine from "./DanceLine";
import MeasureLabelContainer from "./MeasureLabelContainer";
import NohkanLine from "./NohkanLine";
import PercussionLine from "./PercussionLine";
import ScoreTextLine from "./ScoreTextLine";

import { createBeatsArray, determinePhraseIndices } from "../utils";

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousPhrase: null,
      currentPhrase: this.props.phrases[0],
      nextPhrase: this.props.phrases[1],
      toggles: this.props.toggles
    };
    this.createMeasure = this.createMeasure.bind(this);
    this.createMeasures = this.createMeasures.bind(this);
    this.createPhrase = this.createPhrase.bind(this);
  }

  componentWillReceiveProps(props) {
    const [
      prevPhraseIndex,
      currentPhraseIndex,
      nextPhraseIndex
    ] = determinePhraseIndices(props);

    this.setState({
      previousPhrase: props.phrases[prevPhraseIndex],
      currentPhrase: props.phrases[currentPhraseIndex],
      nextPhrase: props.phrases[nextPhraseIndex],
      toggles: props.toggles
    });
  }

  createMeasures(phrase) {
    const beatNums = createBeatsArray(phrase.beat.grid);
    const [lastBeat] = beatNums.slice(-1);
    let beats;
    if (lastBeat && lastBeat.toLowerCase() === "unmetered") {
      beats = [
        <CellBeat beatText={lastBeat} length={beatNums.length} key="beatNum0" /> // eslint-disable-line react/no-array-index-key
      ];
    } else {
      beats = beatNums.map((num, idx) => (
        <CellBeat beatText={num} key={`beatNum${idx}`} /> // eslint-disable-line react/no-array-index-key
      ));
    }
    let percussion = <CellPercussion text="" length={beatNums.length} />;
    if (phrase.percussion.grid.length) {
      percussion = (
        <PercussionLine
          grid={phrase.percussion.grid}
          length={beatNums.length}
        />
      );
    } else if (phrase.percussion.value) {
      percussion = (
        <CellPercussion
          text={phrase.percussion.value}
          length={beatNums.length}
        />
      );
    }
    const measureBeats = this.state.toggles.isBeatOn ? (
      <div className="measure__channel" key="measure-beats">
        {beats}
      </div>
    ) : (
      ""
    );
    const measureTextGrid = phrase.text.grid.length
      ? phrase.text.grid
      : phrase.syllableText.grid;
    const measureText = this.state.toggles.isTextOn ? (
      <div className="measure__channel" key="measure-text">
        <ScoreTextLine
          textGrid={measureTextGrid}
          length={beatNums.length}
          rangeGrid={phrase.vocalRange.grid}
          textIsCongruent={this.props.textIsCongruent}
        />
      </div>
    ) : (
      ""
    );
    const measurePercussion = this.state.toggles.isPercussionOn ? (
      <div className="measure__channel" key="measure-percussion">
        {percussion}
      </div>
    ) : (
      ""
    );
    const measureNohkan = this.state.toggles.isNohkanOn ? (
      <div className="measure__channel" key="measure-nohkan">
        <NohkanLine grid={phrase.nohkan.grid} length={beatNums.length} />
      </div>
    ) : (
      ""
    );
    const measureDance = this.state.toggles.isDanceOn ? (
      <div className="measure__channel" key="measure-dance">
        <DanceLine grid={phrase.dance.grid} length={beatNums.length} />
      </div>
    ) : (
      ""
    );
    return [
      measureBeats,
      measureText,
      measurePercussion,
      measureNohkan,
      measureDance
    ];
  }

  createMeasure(phrase) {
    let measure;
    if (!phrase) {
      const toggledCount = [
        this.state.toggles.isBeatOn,
        this.state.toggles.isTextOn,
        this.state.toggles.isPercussionOn,
        this.state.toggles.isNohkanOn,
        this.state.toggles.isDanceOn
      ].filter(Boolean).length;
      measure = (
        <div className="measure__grid-container">
          <div className={`measure__channel measure__channel--${toggledCount}`}>
            <p className="measure__channel-empty">No score in this sentence</p>
          </div>
        </div>
      );
    } else {
      measure = (
        <div className="measure__grid-container">
          {this.createMeasures(phrase)}
        </div>
      );
    }
    return measure;
  }

  createPhrase(phrase, position) {
    return (
      <div className={`measure measure--${position}`}>
        <MeasureLabelContainer
          {...{ [position]: true }}
          {...this.state.toggles}
        />
        <div className="measure__grid-container">
          {this.createMeasure(phrase)}
        </div>
      </div>
    );
  }

  render() {
    const previous = this.state.toggles.isPrevSentenceOn
      ? this.createPhrase(this.state.previousPhrase, "previous")
      : "";
    const current = this.createPhrase(this.state.currentPhrase, "current");
    const next = this.state.toggles.isNextSentenceOn
      ? this.createPhrase(this.state.nextPhrase, "next")
      : "";
    return (
      <div className="score">
        {previous}
        {current}
        {next}
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
  }).isRequired,
  textIsCongruent: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  currentTime: state.currentTime.time,
  toggles: state.toggles
});

export const Unwrapped = Score;
export default connect(mapStateToProps)(Score);
