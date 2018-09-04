import React from "react";
import PropTypes from "prop-types";
import CellPercussion from "./CellPercussion";
import { fillGrid } from "../utils";

const PercussionLine = props => {
  if (props.grid.length === 0) {
    return <CellPercussion text="" length={props.length} />;
  }
  const fullData = fillGrid(props.grid, props.length);
  const percussionCells = fullData.map((cell, idx) => (
    <CellPercussion
      text={cell.text}
      length={cell.length}
      key={`percussionCell${idx}`} // eslint-disable-line react/no-array-index-key
    />
  ));
  return percussionCells;
};

PercussionLine.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  length: PropTypes.number.isRequired
};

export default PercussionLine;
