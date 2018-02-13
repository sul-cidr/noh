/* eslint no-param-reassign: ["error", { "props": false }] */

import React from "react";
import PropTypes from "prop-types";
import CellText from "./CellText";
import { fillGrid } from "../utils";

const ScoreTextLine = props => {
  if (props.textGrid.length === 0) {
    return <CellText text="" length={props.length} />;
  }
  for (let i = 0; i < props.textGrid.length; i += 1) {
    if (props.textGrid[i].voices && props.textGrid[i].voices[0]) {
      if (i === 0) {
        props.textGrid[i].beginning = true;
      }
      if (
        typeof props.textGrid[i - 1] !== "undefined" &&
        props.textGrid[i - 1].voices &&
        (props.textGrid[i - 1].voices.length === 0 ||
          props.textGrid[i].voices[0] !== props.textGrid[i - 1].voices[0])
      ) {
        props.textGrid[i].beginning = true;
      }
      if (
        typeof props.textGrid[i + 1] !== "undefined" &&
        (props.textGrid[i + 1].voices === undefined ||
          props.textGrid[i + 1].voices.length === 0)
      ) {
        props.textGrid[i].end = true;
      }
      if (
        typeof props.textGrid[i + 1] !== "undefined" &&
        props.textGrid[i + 1].voices &&
        props.textGrid[i + 1].voices[0] &&
        props.textGrid[i].voices[0] !== props.textGrid[i + 1].voices[0]
      ) {
        props.textGrid[i].end = true;
      }
      if (typeof props.textGrid[i + 1] === "undefined") {
        props.textGrid[i].end = true;
      }
    }
  }
  // Have to iterate over grid, and add key with vocal range if that
  // cell's start falls within the range specificed by the vocalrange grid
  // entry start + length - 1
  const fullData = fillGrid(props.textGrid, props.length);
  const textCells = fullData.map((cell, idx) => (
    <CellText
      text={cell.text}
      length={cell.length}
      key={`textCell${idx}`} // eslint-disable-line react/no-array-index-key
      vocalRange="high"
      voiceType={cell.voices && cell.voices[0] ? cell.voices[0] : ""}
      beginning={cell.beginning || false}
      end={cell.end || false}
    />
  ));
  return textCells;
};

ScoreTextLine.propTypes = {
  textGrid: PropTypes.arrayOf(
    PropTypes.shape({
      voices: PropTypes.arrayOf(PropTypes.string),
      beginning: PropTypes.bool,
      end: PropTypes.bool
    })
  ).isRequired,
  length: PropTypes.number.isRequired,
  rangeGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default ScoreTextLine;
