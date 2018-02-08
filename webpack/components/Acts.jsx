import React, { Component } from "react";
import PropTypes from "prop-types";

class Acts extends Component {
  createActs() {
    return this.props.acts.map(act => {
      const width = 100 * act.duration / this.props.duration;
      const transcription = act.transcription ? (
        <span className="transcription">{act.transcription}</span>
      ) : (
        ""
      );
      const translation = act.translation ? (
        <span className="translation">({act.translation})</span>
      ) : (
        ""
      );
      return (
        <div
          key={`act-${act.translation}-${width}`}
          className="act"
          style={{ width: `${width}%` }}
        >
          {transcription} {translation}
        </div>
      );
    });
  }

  render() {
    const acts = this.createActs();
    return (
      <div className="acts-container">
        {acts}
        <div className="act__first-end" style={{ left: "35%" }} />
      </div>
    );
  }
}

Acts.propTypes = {
  acts: PropTypes.arrayOf(
    PropTypes.shape({
      translation: PropTypes.string.isRequired,
      transcription: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired
    })
  ).isRequired,
  duration: PropTypes.number.isRequired
};

export default Acts;
