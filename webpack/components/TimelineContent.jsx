import React from "react";
import PropTypes from "prop-types";
import TimelineRow from "./TimelineRow";

const TimelineContent = props => (
  <TimelineRow currentTime={props.currentTime} />
);

TimelineContent.propTypes = {
  currentTime: PropTypes.number
};

TimelineContent.defaultProps = {
  currentTime: 0
};

export default TimelineContent;
