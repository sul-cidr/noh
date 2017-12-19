import React from "react";
import PropTypes from "prop-types";
import { convertSecondsToHhmmss } from "../utils";

const TimeMarks = props => {
  const interval = props.videoDuration / props.numIntervals;
  const marks = [];
  for (let i = 0; i <= props.numIntervals; i += 1) {
    marks.push(
      <div className="time" key={`marker${i * interval}`}>
        {convertSecondsToHhmmss(i * interval)}
      </div>
    );
  }
  return <div className="time-marks">{marks}</div>;
};

TimeMarks.propTypes = {
  videoDuration: PropTypes.number.isRequired,
  numIntervals: PropTypes.number
};

TimeMarks.defaultProps = {
  numIntervals: 6
};

export default TimeMarks;
