import React from "react";
import PropTypes from "prop-types";

const CellPercussion = props => (
  <div className={`cell cell--${props.length}`}>{props.text}</div>
);

CellPercussion.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellPercussion;
