import React from "react";
import PropTypes from "prop-types";

const Line = props => (
  <div
    className={
      props.active ? "transcription__line active" : "transcription__line"
    }
  >
    <p className="transcription__original">{props.transcription}</p>
    <p className="transcription__translation">{props.translation}</p>
  </div>
);

Line.propTypes = {
  transcription: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default Line;
