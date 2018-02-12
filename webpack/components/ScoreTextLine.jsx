import React from "react";
import PropTypes from "prop-types";
import CellText from "./CellText";
import { fillGrid } from "../utils";

const ScoreTextLine = props => {
  if (props.textGrid.length === 0) {
    return <CellText text="" length={props.length} />;
  }
  // Is voice, such as Jiutai constant across all cells in a section?
  // Have to iterate over grid, and add key with vocal range if that
  // cell's start falls within the range specificed by the vocalrange grid
  // entry start + length - 1
  const fullData = fillGrid(props.textGrid, props.length);
  console.log(fullData);
  const textCells = fullData.map((cell, idx) => (
    <CellText
      text={cell.text}
      length={cell.length}
      key={`textCell${idx}`} // eslint-disable-line react/no-array-index-key
      vocalRange="high"
      voiceType={cell.voices && cell.voices[0] ? cell.voices[0] : ""}
    />
  ));
  return textCells;
};

ScoreTextLine.propTypes = {
  textGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  length: PropTypes.number.isRequired,
  rangeGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default ScoreTextLine;
