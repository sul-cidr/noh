import React from "react";
import PropTypes from "prop-types";

const CellDance = props => (
  <div className={`cell cell--${props.length} cell--dance`}>{props.text}</div>
);

CellDance.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellDance;
