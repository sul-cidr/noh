import React from "react";
import PropTypes from "prop-types";

const CellBeat = props => (
  <div className="cell cell--1 cell--beat">{props.beatText}</div>
);

CellBeat.propTypes = {
  beatText: PropTypes.string.isRequired
};

export default CellBeat;
