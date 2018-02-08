import React from "react";
import PropTypes from "prop-types";
import CellDance from "./CellDance";
import { fillGrid } from "../utils";

const DanceLine = props => {
  if (props.grid.length === 0) {
    return <CellDance text="" length={props.length} />;
  }
  const fullData = fillGrid(props.grid, props.length);
  const danceCells = fullData.map((cell, idx) => (
    <CellDance
      text={cell.text}
      length={cell.length}
      key={`danceCell${idx}`} // eslint-disable-line react/no-array-index-key
    />
  ));
  return danceCells;
};

DanceLine.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  length: PropTypes.number.isRequired
};

export default DanceLine;
