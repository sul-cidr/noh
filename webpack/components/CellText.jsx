import React from "react";
import PropTypes from "prop-types";

const CellText = props => {
  let typeSpan = null;
  let tooltipSpan = null;
  if (props.voiceType !== "") {
    typeSpan = <span className={`cell__character--${props.voiceType}`} />;
    tooltipSpan = (
      <span
        className={`cell__tooltip${
          props.textIsCongruent ? " cell__tooltip--centered" : ""
        }`}
      >
        {props.voiceType}
      </span>
    );
  }
  return (
    <div
      className={`cell cell--${props.length} cell--text${
        props.voiceType ? " cell__character" : ""
      }`}
    >
      {props.textIsCongruent ? (
        props.text
      ) : (
        <span className="truncate">{props.text}</span>
      )}
      {typeSpan}
      {tooltipSpan}
    </div>
  );
};

CellText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  voiceType: PropTypes.string,
  textIsCongruent: PropTypes.bool
};

CellText.defaultProps = {
  voiceType: "",
  textIsCongruent: false
};

export default CellText;
