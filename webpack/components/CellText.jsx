import React from "react";
import PropTypes from "prop-types";

const CellText = props => {
  let rangeSpan = null;
  let rangeClass = "";
  if (props.vocalRange === "l") {
    rangeClass = "low";
  } else if (props.vocalRange === "m") {
    rangeClass = "medium";
  } else if (props.vocalRange === "h") {
    rangeClass = "high";
  }
  if (props.vocalRange !== "") {
    rangeSpan = <span className={`cell__range--${rangeClass}`} />;
  } else {
    rangeSpan = null;
  }
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
      {rangeSpan}
    </div>
  );
};

CellText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  vocalRange: PropTypes.string,
  voiceType: PropTypes.string,
  textIsCongruent: PropTypes.bool
};

CellText.defaultProps = {
  vocalRange: "",
  voiceType: "",
  textIsCongruent: false
};

export default CellText;
