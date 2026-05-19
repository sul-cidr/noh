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
  const fullData = fillGrid(props.textGrid, props.length);
  const textCells = fullData.map((cell, idx) => (
    <CellText
      text={cell.text}
      textIsCongruent={props.textIsCongruent}
      length={cell.length}
      key={`textCell${idx}`} // eslint-disable-line react/no-array-index-key
      voiceType={cell.voices && cell.voices[0] ? cell.voices[0] : ""}
    />
  ));
  return textCells;
};

ScoreTextLine.propTypes = {
  textGrid: PropTypes.arrayOf(
    PropTypes.shape({
      voices: PropTypes.arrayOf(PropTypes.string),
      beginning: PropTypes.bool,
      end: PropTypes.bool,
      start: PropTypes.number
    })
  ).isRequired,
  length: PropTypes.number.isRequired,
  textIsCongruent: PropTypes.bool.isRequired
};

export default ScoreTextLine;
