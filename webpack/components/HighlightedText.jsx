import React from "react";
import PropTypes from "prop-types";
import TextLine from "./TextLine";

// containing component needs to know about currentTime and
// calculate currentPhraseID to pass into this component
class HighlightedText extends React.Component {
  createLines(linesType) {
    return this.props.phrases.map(phrase => (
      <TextLine
        key={phrase.phraseID}
        text={phrase[linesType]}
        active={phrase.phraseID === this.props.currentPhraseID}
      />
    ));
  }

  render() {
    const translationLines = this.createLines("translation");
    const transcriptionLines = this.createLines("transcription");
    return (
      <div className="transcription">
        <div className="transcription__title">
          <p>
            Singing style: <span>{this.props.singingStyle}</span>
          </p>
        </div>

        <div className="transcription__text">
          <div className="transcription__original">{transcriptionLines}</div>
          <div className="transcription__translation">{translationLines}</div>
        </div>
      </div>
    );
  }
}

HighlightedText.propTypes = {
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

export default HighlightedText;
