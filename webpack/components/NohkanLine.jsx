import React from "react";
import PropTypes from "prop-types";
import CellNohkan from "./CellNohkan";
import { fillGrid } from "../utils";

const NohkanLine = props => {
  if (props.grid.length === 0) {
    return <CellNohkan text="" length={props.length} />;
  }
  const fullData = fillGrid(props.grid, props.length);
  const nohkanCells = fullData.map((cell, idx) => (
    <CellNohkan
      text={cell.text}
      length={cell.length}
      key={`nohkanCell${idx}`} // eslint-disable-line react/no-array-index-key
    />
  ));
  return nohkanCells;
};

NohkanLine.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  length: PropTypes.number.isRequired
};

export default NohkanLine;
