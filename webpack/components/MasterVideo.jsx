/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from "react";
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

class MasterVideo extends Component {
  constructor(props) {
    super(props);

    this.video = null;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    const { startTime } = this.props;

    if (startTime && prevProps.startTime !== startTime && startTime >= 0) {
      this.video.currentTime = startTime;
    }
  }

  render() {
    return (
      <div>
        <video
          id="player"
          src={this.props.videoUrl}
          ref={video => {
            this.video = video;
          }}
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
        <h3>{this.props.currentTime}</h3>
        <span>{this.props.startTime}</span>
      </div>
    );
  }
}
MasterVideo.propTypes = {
  currentTime: PropTypes.number,
  videoUrl: PropTypes.string,
  startTime: PropTypes.number
};

MasterVideo.defaultProps = {
  currentTime: 0,
  videoUrl: "",
  startTime: 0
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  isPlaying: state.isPlaying,
  startTime: state.startTime
});

export const Unwrapped = MasterVideo;
export default connect(mapStateToProps)(MasterVideo);
