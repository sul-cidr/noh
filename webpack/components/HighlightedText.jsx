import React from "react";
import PropTypes from "prop-types";
import TextLine from "./TextLine";

// containing component needs to know about currentTime and
// calculate currentPhraseID to pass into this component
class HighlightedText extends React.Component {
  createTranslationLines() {
    const phrasesData = this.props.phrases;
    const translationLines = [];
    for (let i = 0; i < phrasesData.length; i += 1) {
      let active = false;
      if (phrasesData[i].phraseID === this.props.currentPhraseID) {
        active = true;
      }
      translationLines.push(
        <TextLine
          key={phrasesData[i].phraseID}
          text={phrasesData[i].translation}
          active={active}
        />
      );
    }
    return translationLines;
  }

  createTranscriptionLines() {
    const phrasesData = this.props.phrases;
    const transcriptionLines = [];
    for (let i = 0; i < phrasesData.length; i += 1) {
      let active = false;
      if (phrasesData[i].phraseID === this.props.currentPhraseID) {
        active = true;
      }
      transcriptionLines.push(
        <TextLine
          key={phrasesData[i].phraseID}
          text={phrasesData[i].transcription}
          active={active}
        />
      );
    }
    return transcriptionLines;
  }

  render() {
    const translationLines = this.createTranslationLines();
    const transcriptionLines = this.createTranscriptionLines();
    return (
      <div className="transcription">
        <div className="transcription__title">
          <h3>Text</h3>
          <p>Singing style: {this.props.singingStyle}</p>
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
