import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextLine from "./TextLine";

class HighlightedText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPhraseID: 1
    };
  }

  createTranslationLines() {
    const phrasesData = this.props.phrases;
    const translationLines = [];
    for (let i = 0; i < phrasesData.length; i += 1) {
      let active = false;
      if (phrasesData[i].phraseID === this.state.currentPhraseID) {
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
      if (phrasesData[i].phraseID === this.state.currentPhraseID) {
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
      <div className="highlighted-text">
        <h3>Text</h3>
        <p>Singing style: {this.props.singingStyle}</p>
        <p>{this.props.currentTime}</p>
        <div className="translation-lines">{translationLines}</div>
        <div className="transcription-lines">{transcriptionLines}</div>
      </div>
    );
  }
}

HighlightedText.propTypes = {
  currentTime: PropTypes.number.isRequired,
  singingStyle: PropTypes.string.isRequired,
  phrases: PropTypes.arrayOf(
    PropTypes.shape({
      phraseID: PropTypes.number,
      startTime: PropTypes.number,
      endTime: PropTypes.number,
      transcription: PropTypes.string,
      translation: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({ currentTime: state.currentTime });

export const Unwrapped = HighlightedText;
export default connect(mapStateToProps)(HighlightedText);
