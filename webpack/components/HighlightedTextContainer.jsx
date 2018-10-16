import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HighlightedText from "./HighlightedText";
import { setCurrentPhraseID } from "../actionCreators";

class HighlightedTextContainer extends React.Component {
  componentDidUpdate() {
    const currentPhraseID = this.determineCurrentPhrase();
    this.props.setCurrentPhrase(currentPhraseID);
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
  singingStyle: PropTypes.string,
  currentPhraseID: PropTypes.string.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      phraseID: PropTypes.string,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      transcription: PropTypes.string,
      translation: PropTypes.string
    })
  ).isRequired,
  setCurrentPhrase: PropTypes.func.isRequired
};

HighlightedTextContainer.defaultProps = {
  singingStyle: ""
};

const mapStateToProps = state => ({
  currentTime: state.currentTime.time,
  currentPhraseID: state.currentPhraseID
});

const mapDispatchToProps = dispatch => ({
  setCurrentPhrase: idString => {
    dispatch(setCurrentPhraseID(idString));
  }
});

export const Unwrapped = HighlightedTextContainer;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighlightedTextContainer);
