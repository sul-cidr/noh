import React from "react";
import PropTypes from "prop-types";

const TimelineRow = props => (
  <div className="row">
    <div className="row-label">
      <h4>{props.label}</h4>
    </div>
    currenttime: {props.currentTime}
  </div>
);

TimelineRow.propTypes = {
  currentTime: PropTypes.number,
  label: PropTypes.string
};

TimelineRow.defaultProps = {
  currentTime: 0,
  label: ""
};

export default TimelineRow;
