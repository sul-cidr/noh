import React from "react";
import PropTypes from "prop-types";
import CellNohkan from "./CellNohkan";

const NohkanLine = props => {
  if (props.grid.length === 0) {
    return <CellNohkan text="" length={props.length} />;
  }
  const data = props.grid;
  if (data[0].start !== 0) {
    if (data[0].start === 1) {
      data.unshift({ length: 1, text: "", start: 0 });
    } else {
      data.unshift({ length: data[0].start - 1, text: "", start: 0 });
    }
  }
  const fullData = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].start === 0) {
      fullData.push(data[i]);
    } else if (data[i].start === data[i - 1].length + data[i - 1].start) {
      fullData.push(data[i]);
    } else if (data[i].start !== data[i - 1].length + data[i - 1].start) {
      fullData.push({
        length: data[i].start - (data[i - 1].start + data[i - 1].length),
        text: "",
        start: data[i - 1].start + data[i - 1].length
      });
      fullData.push(data[i]);
    }
  }
  let sumLengths = 0;
  const lastItem = fullData[fullData.length - 1];
  for (let i = 0; i < fullData.length; i += 1) {
    sumLengths += fullData[i].length;
  }
  if (sumLengths !== props.length) {
    fullData.push({
      length: props.length - sumLengths,
      text: "",
      start: lastItem.start + lastItem.length + 1
    });
  }
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
