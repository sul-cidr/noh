import React from "react";
import PropTypes from "prop-types";
import TimeMarks from "./TimeMarks";
import Acts from "./Acts";

const TimelineHeader = props => (
  <div className="timeline_topbar">
    <h2 className="tl__title">{props.title}</h2>
    <div className="tl__marks">
      <TimeMarks />
      <Acts />
    </div>
  </div>
);

TimelineHeader.propTypes = {
  title: PropTypes.string
};

TimelineHeader.defaultProps = {
  title: ""
};

export default TimelineHeader;
