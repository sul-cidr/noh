import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TimelineHeader from "./TimelineHeader";
import TimelineContent from "./TimelineContent";
import TimelineControls from "./TimelineControls";
import TimelineIndicator from "./TimelineIndicator";

const Timeline = props => (
  <div className="timeline">
    <TimelineHeader title="Timeline" />
    <TimelineIndicator
      duration={1 * 60 + 44}
      currentTime={props.currentTime}
      playing={props.isPlaying}
    />
    <TimelineContent currentTime={props.currentTime} />
    <TimelineControls />
  </div>
);

Timeline.propTypes = {
  currentTime: PropTypes.number,
  isPlaying: PropTypes.bool
};

Timeline.defaultProps = {
  currentTime: 0,
  isPlaying: false
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  isPlaying: state.isPlaying
});

export const UnwrappedTimeline = Timeline;
export default connect(mapStateToProps)(Timeline);
