import React from "react";
import PropTypes from "prop-types";

// We should only create the inside spans if the data is there
const CellText = props => {
  let rangeSpan = null;
  if (props.vocalRange !== "") {
    rangeSpan = <span className={`cell__range--${props.vocalRange}`} />;
  } else {
    rangeSpan = null;
  }
  let typeSpan = null;
  let tooltipSpan = null;
  if (props.voiceType !== "") {
    typeSpan = (
      <span className={`cell__character cell__character--${props.voiceType}`} />
    );
    tooltipSpan = <span className="cell__tooltip">{props.voiceType}</span>;
  }
  return (
    <div className={`cell cell--${props.length} cell--text`}>
      {props.text}
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
  voiceType: PropTypes.string
};

CellText.defaultProps = {
  vocalRange: "",
  voiceType: ""
};

export default CellText;
