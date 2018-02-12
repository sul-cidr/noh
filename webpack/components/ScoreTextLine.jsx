import React from "react";
import PropTypes from "prop-types";
import CellText from "./CellText";
import { fillGrid } from "../utils";

const ScoreTextLine = props => {
  if (props.grid.length === 0) {
    return <CellText text="" length={props.length} />;
  }
  const fullData = fillGrid(props.grid, props.length);
  const textCells = fullData.map((cell, idx) => (
    <CellText
      text={cell.text}
      length={cell.length}
      key={`textCell${idx}`} // eslint-disable-line react/no-array-index-key
    />
  ));
  return textCells;
};

ScoreTextLine.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  length: PropTypes.number.isRequired
};

export default ScoreTextLine;
