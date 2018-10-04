import React from "react";
import PropTypes from "prop-types";

const CellDance = props => (
  <div
    data-tooltip={props.text}
    className={`cell cell--${props.length} cell--dance ${
      props.text.length > 0 ? "cell--tooltip" : ""
    }`}
  >
    <span className="truncate">{props.text}</span>
  </div>
);

CellDance.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellDance;
