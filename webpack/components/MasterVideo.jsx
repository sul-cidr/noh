/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentTime, setIsPlaying } from "../actionCreators";

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
          onTimeUpdate={event => this.props.updateCurrentTime(event)}
          onPlaying={this.props.updateIsPlaying}
          onEnded={this.props.updateIsNotPlaying}
          onPlay={this.props.updateIsNotPlaying}
          onPause={this.props.updateIsNotPlaying}
          onStalled={this.props.updateIsNotPlaying}
          onSeeking={this.props.updateIsNotPlaying}
          onWaiting={this.props.updateIsNotPlaying}
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
  startTime: PropTypes.number,
  updateCurrentTime: PropTypes.func,
  updateIsPlaying: PropTypes.func,
  updateIsNotPlaying: PropTypes.func
};

MasterVideo.defaultProps = {
  currentTime: 0,
  videoUrl: "",
  startTime: 0,
  updateCurrentTime: () => {},
  updateIsPlaying: () => {},
  updateIsNotPlaying: () => {}
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  isPlaying: state.isPlaying,
  startTime: state.startTime
});

// The last two functions should be refactored
const mapDispatchToProps = dispatch => ({
  updateCurrentTime: event => {
    dispatch(setCurrentTime(event.target.currentTime));
  },
  updateIsPlaying: () => {
    dispatch(setIsPlaying(true));
  },
  updateIsNotPlaying: () => {
    dispatch(setIsPlaying(false));
  }
});

export const Unwrapped = MasterVideo;
export default connect(mapStateToProps, mapDispatchToProps)(MasterVideo);
