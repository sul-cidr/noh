import React from "react";
import PropTypes from "prop-types";

const TimelineHeader = props => (
  <div className="timeline_header">
    <h2>{props.title}</h2>
    <div className="acts">
      {props.acts.map(act => (
        <div className="act-title" key={act}>
          {act}
        </div>
      ))}
    </div>
  </div>
);

TimelineHeader.propTypes = {
  title: PropTypes.string,
  acts: PropTypes.arrayOf(PropTypes.string)
};

TimelineHeader.defaultProps = {
  title: "",
  acts: ["First Act", "Second Act"]
};

export default TimelineHeader;
