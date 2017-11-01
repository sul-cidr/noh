import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TimelineHeader from "./TimelineHeader";
import TimelineRow from "./TimelineRow";
import TimelineControls from "./TimelineControls";

const Timeline = props => (
  <div className="timeline">
    <TimelineHeader title="Timeline" />
    <TimelineRow currentTime={props.currentTime} label="Sound" />
    <TimelineControls />
  </div>
);
Timeline.propTypes = {
  currentTime: PropTypes.number
};

Timeline.defaultProps = {
  currentTime: 0
};

const mapStateToProps = state => ({ currentTime: state.currentTime });

export const UnwrappedTimeline = Timeline;
export default connect(mapStateToProps)(Timeline);
