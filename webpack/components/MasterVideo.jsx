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

  componentDidUpdate() {
    if (this.video.currentTime !== this.props.currentTime) {
      this.video.currentTime = this.props.currentTime;
    }
  }

  createTracks() {
    return this.props.tracks.map(track => (
      <track
        key={track.label}
        label={track.label}
        kind={track.kind}
        srcLang={track.lang}
        src={track.url}
      />
    ));
  }

  render() {
    const tracks = this.createTracks();
    return (
      <div>
        <video
          id="player"
          ref={video => {
            this.video = video;
          }}
          controls
          onTimeUpdate={event => this.props.updateCurrentTime(event)}
          onPlaying={() => this.props.updateIsPlaying(true)}
          onEnded={() => this.props.updateIsPlaying(false)}
          onPlay={() => this.props.updateIsPlaying(false)}
          onPause={() => this.props.updateIsPlaying(false)}
          onStalled={() => this.props.updateIsPlaying(false)}
          onSeeking={() => this.props.updateIsPlaying(false)}
          onWaiting={() => this.props.updateIsPlaying(false)}
        >
          <source src={this.props.videoUrl} type="video/mp4" />
          {tracks}
        </video>
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
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      kind: PropTypes.string,
      lang: PropTypes.string,
      url: PropTypes.string
    })
  )
};

MasterVideo.defaultProps = {
  currentTime: 0,
  videoUrl: "",
  startTime: 0,
  updateCurrentTime: () => {},
  updateIsPlaying: () => {},
  tracks: []
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  isPlaying: state.isPlaying,
  startTime: state.startTime
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentTime: event => {
    dispatch(setCurrentTime(event.target.currentTime));
  },
  updateIsPlaying: isPlaying => {
    dispatch(setIsPlaying(isPlaying));
  }
});

export const Unwrapped = MasterVideo;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterVideo);
