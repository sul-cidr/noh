import React from "react";
import PropTypes from "prop-types";

const CellBeat = props => (
  <div
    className={`cell cell--${props.length} cell--${
      props.beatText.toLowerCase() === "unmetered" ? "unmetered" : "beat"
    }`}
  >
    {props.beatText}
  </div>
);

CellBeat.propTypes = {
  beatText: PropTypes.string.isRequired,
  length: PropTypes.number
};

CellBeat.defaultProps = {
  length: 1
};

export default CellBeat;
