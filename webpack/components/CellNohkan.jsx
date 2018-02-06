import React from "react";
import PropTypes from "prop-types";

const CellNohkan = props => (
  <div className={`cell cell--${props.length} cell--nohkan`}>{props.text}</div>
);

CellNohkan.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellNohkan;
