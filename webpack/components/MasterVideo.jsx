/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentTime, setIsPlaying } from "../actionCreators";
import store from "../store";

function updateCurrentTime(event) {
  store.dispatch(setCurrentTime(event.target.currentTime));
}

function updateIsPlaying() {
  store.dispatch(setIsPlaying(true));
}

function updateIsNotPlaying() {
  store.dispatch(setIsPlaying(false));
}

const MasterVideo = props => (
  <div>
    <video
      id="player"
      src={props.videoUrl}
      controls
      onTimeUpdate={event => updateCurrentTime(event)}
      onPlaying={updateIsPlaying}
      onEnded={updateIsNotPlaying}
      onPlay={updateIsNotPlaying}
      onPause={updateIsNotPlaying}
      onStalled={updateIsNotPlaying}
      onSeeking={updateIsNotPlaying}
      onWaiting={updateIsNotPlaying}
    />
    <h3>{props.currentTime}</h3>
  </div>
);

MasterVideo.propTypes = {
  currentTime: PropTypes.number,
  videoUrl: PropTypes.string
};

MasterVideo.defaultProps = {
  currentTime: 0,
  videoUrl: ""
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  isPlaying: state.isPlaying
});

export const Unwrapped = MasterVideo;
export default connect(mapStateToProps)(MasterVideo);
