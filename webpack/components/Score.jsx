import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasureLabelContainer from "./MeasureLabelContainer";
import CellBeat from "./CellBeat";

function createBeatsArray(grid) {
  const beatsArray = [];
  for (let i = 0; i < grid.length; i += 1) {
    beatsArray[grid[i].start] = grid[i].text;
  }
  for (let i = 0; i < beatsArray.length; i += 1) {
    if (typeof beatsArray[i] === "undefined") {
      beatsArray[i] = "";
    }
  }
  return beatsArray;
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
    return (
      <div className="score">
        <div className="measure measure--prev">
          <MeasureLabelContainer previous />
          <div className="measure__grid-container">
            <div className="measure__channel">{prevBeats}</div>
            <div className="measure__channel measure__channel--large">
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text">ke</div>
              <div className="cell cell--1 cell--text">i</div>
              <div className="cell cell--1 cell--text">ko</div>
              <div className="cell cell--1 cell--text">o</div>
              <div className="cell cell--1 cell--text">te</div>
              <div className="cell cell--1 cell--text">n</div>
              <div className="cell cell--1 cell--text">no</div>
              <div className="cell cell--1 cell--text">o</div>
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
            </div>
            <div className="measure__channel">
              <div className="cell cell--14">Tsuzuke</div>
            </div>
            <div className="measure__channel">
              <div className="cell cell--2 cell--dance" />
              <div className="cell cell--9 cell--dance">grid</div>
              <div className="cell cell--3 cell--dance" />
            </div>
            <div className="measure__channel">
              <div className="cell cell--3" />
              <div className="cell cell--6 cell--dance">
                Sits back on his knee (9)
              </div>
              <div className="cell cell--5" />
            </div>
          </div>
        </div>
        <div className="measure measure--current">
          <MeasureLabelContainer />
          <div className="measure__grid-container">
            <div className="measure__channel">{currentBeats}</div>
            <div className="measure__channel measure__channel--large">
              <div className="cell cell--2 cell--text" />
              <div className="cell cell--5 cell--text">
                Tachibana no michinari to wa,
                <span className="cell__character cell__character--begin cell__character--jiutai" />
                <span className="cell__tooltip">jiutai</span>
                <span className="cell__range--low" />
              </div>
              <div className="cell cell--1 cell--text">
                waga
                <span className="cell__character cell__character--end cell__character--jiutai" />
                <span className="cell__tooltip">jiutai</span>
                <span className="cell__range--medium" />
              </div>
              <div className="cell cell--2 cell--text">
                koto nari.
                <span className="cell__character cell__character--begin cell__character--end cell__character--shite" />
                <span className="cell__tooltip">shite</span>
                <span className="cell__range--high" />
              </div>
              <div className="cell cell--6 cell--text" />
            </div>
            <div className="measure__channel">
              <div className="cell cell--2" />
              <div className="cell cell--12">Tsuzuke</div>
              <div className="cell cell--2" />
            </div>
            <div className="measure__channel">
              <div className="cell cell--2 cell--nohkan">grid</div>
              <div className="cell cell--8 cell--nohkan">grid</div>
              <div className="cell cell--6 cell--nohkan">grid</div>
            </div>
            <div className="measure__channel">
              <div className="cell cell--3" />
              <div className="cell cell--6 cell--dance">
                Sits back on his knee (9)
              </div>
              <div className="cell cell--7" />
            </div>
          </div>
        </div>
        <div className="measure measure--next">
          <MeasureLabelContainer next />
          <div className="measure__grid-container">
            <div className="measure__channel">{nextBeats}</div>
            <div className="measure__channel measure__channel--large">
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text">ke</div>
              <div className="cell cell--1 cell--text">i</div>
              <div className="cell cell--1 cell--text">ko</div>
              <div className="cell cell--1 cell--text">o</div>
              <div className="cell cell--1 cell--text">te</div>
              <div className="cell cell--1 cell--text">n</div>
              <div className="cell cell--1 cell--text">no</div>
              <div className="cell cell--1 cell--text">o</div>
              <div className="cell cell--1 cell--text" />
              <div className="cell cell--1 cell--text" />
            </div>
            <div className="measure__channel">
              <div className="cell cell--14">Tsuzuke</div>
            </div>
            <div className="measure__channel">
              <div className="cell cell--2 cell--dance" />
              <div className="cell cell--9 cell--dance">grid</div>
              <div className="cell cell--3 cell--dance" />
            </div>
            <div className="measure__channel">
              <div className="cell cell--3" />
              <div className="cell cell--6 cell--dance">
                Sits back on his knee (9)
              </div>
              <div className="cell cell--5" />
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
      percussion: PropTypes.shape({}),
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
