import React from "react";
import PropTypes from "prop-types";
import CellNohkan from "./CellNohkan";

const NohkanLine = props => {
  if (props.grid.length === 0) {
    return <CellNohkan text="" length={props.length} />;
  }
  // Need to rebuild the grid array to account for starting at different points
  // and ending before the end of the full length
  const data = props.grid;
  console.log(props.grid);
  console.log("original data", data);
  if (data[0].start !== 0) {
    data.unshift({ length: data[0].start - 1, text: "", start: 0 });
  }
  console.log("modified data", data);
  const nohkanCells = data.map((cell, idx) => (
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
