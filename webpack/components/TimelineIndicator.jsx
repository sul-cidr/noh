import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TimelineIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playedTime: this.calculateCurrentTime(), // milliseconds
      timer: null
    };
  }

  componentDidMount() {
    this.setupTimer();
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  setupTimer() {
    const timer = setInterval(() => {
      this.tick();
    }, this.props.interval);
    this.setState({ timer });
  }

  calculateCurrentTime() {
    return 1e3 * this.props.currentTime; // currentTime is given in seconds
  }

  calculateRemainingTime() {
    return this.calculateMaxTime() - this.state.playedTime;
  }

  calculateMaxTime() {
    return 1e3 * this.props.duration; // currentTime is given in seconds
  }

  calculateProgress() {
    return 100 * this.state.playedTime / this.calculateMaxTime();
  }

  tick() {
    if (this.props.playing) {
      this.setState({
        playedTime: this.state.playedTime + this.props.interval
      });
    } else {
      this.setState({
        playedTime: this.calculateCurrentTime()
      });
    }
    if (this.calculateRemainingTime() <= 0) {
      clearInterval(this.state.timer);
    }
  }

  render() {
    return (
      <div className="tl__time-indicator">
        <div
          style={{ left: `${this.calculateProgress()}%`, position: "relative" }}
        >
          <span role="img" aria-label="time-indicator">
            ▲
          </span>
        </div>
      </div>
    );
  }
}

TimelineIndicator.propTypes = {
  duration: PropTypes.number.isRequired,
  interval: PropTypes.number,
  currentTime: PropTypes.number.isRequired,
  playing: PropTypes.bool
};

TimelineIndicator.defaultProps = {
  interval: 10, // down to the millisecond it behaves erratically
  playing: false
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  playing: state.isPlaying
});

export const Unwrapped = TimelineIndicator;
export default connect(mapStateToProps)(TimelineIndicator);
