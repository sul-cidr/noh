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
    const beginClass = props.beginning === true ? "cell__character--begin" : "";
    const endClass = props.end === true ? "cell__character--end" : "";
    typeSpan = (
      <span
        className={`cell__character cell__character--${
          props.voiceType
        } ${beginClass} ${endClass}`}
      />
    );
    tooltipSpan = <span className="cell__tooltip">{props.voiceType}</span>;
  }
  return (
    <div className={`cell cell--${props.length} cell--text`}>
      <span
        title={props.text}
        className={`truncate ${props.voiceType !== "" ? "voice__label" : ""}`}
      >
        {props.text}
      </span>
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
  beginning: PropTypes.bool,
  end: PropTypes.bool
};

CellText.defaultProps = {
  vocalRange: "",
  voiceType: "",
  beginning: false,
  end: false
};

export default CellText;
