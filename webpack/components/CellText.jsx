import React from "react";
import PropTypes from "prop-types";

const CellText = props => (
  <div className={`cell cell--${props.length} cell--text`}>{props.text}</div>
);

CellText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellText;
