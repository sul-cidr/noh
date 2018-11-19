import React from "react";
import PropTypes from "prop-types";

const CellNohkan = props => (
  <div
    data-tooltip={props.text}
    className={`cell cell--${props.length} cell--nohkan ${
      props.text.length > 0 ? "cell--tooltip" : ""
    }`}
  >
    <span className="truncate">{props.text}</span>
  </div>
);

CellNohkan.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellNohkan;
