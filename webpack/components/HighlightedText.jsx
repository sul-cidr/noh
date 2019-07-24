import React from "react";
import PropTypes from "prop-types";
import TextLine from "./TextLine";

// containing component needs to know about currentTime and
// calculate currentPhraseID to pass into this component
class HighlightedText extends React.Component {
  createLines() {
    return this.props.phrases.map(phrase => (
      <TextLine
        key={phrase.phraseID}
        translation={phrase.translation}
        transcription={phrase.transcription}
        active={phrase.phraseID === this.props.currentPhraseID}
        startTime={phrase.startTime}
      />
    ));
  }

  render() {
    const lines = this.createLines();
    return (
      <div className="transcription">
        <div className="transcription__text">{lines}</div>
      </div>
    );
  }
}

HighlightedText.propTypes = {
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

export default HighlightedText;
