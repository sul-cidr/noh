import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HighlightedText from "./HighlightedText";
import store from "../store";
import { setCurrentPhraseID } from "../actionCreators";

function setCurrentPhrase(idString) {
  store.dispatch(setCurrentPhraseID(idString));
}

class HighlightedTextContainer extends React.Component {
  componentWillReceiveProps() {
    const currentPhraseID = this.determineCurrentPhrase();
    setCurrentPhrase(currentPhraseID);
  }

  determineCurrentPhrase() {
    let currentPhraseID = "";
    for (let i = 0; i < this.props.phrases.length; i += 1) {
      if (
        this.props.currentTime >= this.props.phrases[i].startTime &&
        this.props.currentTime <= this.props.phrases[i].endTime
      ) {
        currentPhraseID = this.props.phrases[i].phraseID;
      }
    }
    return currentPhraseID;
  }

  render() {
    return (
      <div>
        <p>Current phraseID: {this.props.currentPhraseID}</p>
        <p>Current time: {this.props.currentTime}</p>
        <HighlightedText
          singingStyle={this.props.singingStyle}
          phrases={this.props.phrases}
          currentPhraseID={this.props.currentPhraseID}
        />
      </div>
    );
  }
}

HighlightedTextContainer.propTypes = {
  currentTime: PropTypes.number.isRequired,
  singingStyle: PropTypes.string.isRequired,
  currentPhraseID: PropTypes.string.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      phraseID: PropTypes.string,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      transcription: PropTypes.string,
      translation: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  currentPhraseID: state.currentPhraseID
});

export const Unwrapped = HighlightedTextContainer;
export default connect(mapStateToProps)(HighlightedTextContainer);
