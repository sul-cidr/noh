import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { setCurrentTime } from "../actionCreators";

class TimelineIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playedTime: this.calculateCurrentTime(), // milliseconds
      timer: null,
      beingDragged: false
    };
    this.container = React.createRef();
    this.indicator = React.createRef();
    this.tick = this.tick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
  }

  componentDidMount() {
    this.setupTimer();
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  setupTimer() {
    const timer = setInterval(this.tick, this.props.interval);
    this.setState({ timer });
  }

  calculateCurrentTime() {
    return 1e3 * (this.props.currentTime - this.props.startTime); // currentTime is given in seconds
  }

  calculateRemainingTime() {
    return this.calculateMaxTime() - this.state.playedTime;
  }

  calculateMaxTime() {
    return 1e3 * this.props.duration; // currentTime is given in seconds
  }

  calculateProgress() {
    const progress = this.state.playedTime / this.calculateMaxTime();
    const offset = this.container.current.offsetWidth;
    return Math.min(Math.max(progress * offset, 0), offset);
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

  handleDragStart() {
    this.setState({
      beingDragged: true
    });
  }

  handleDrag() {
    const { duration } = this.props;
    const ratio =
      this.indicator.current.state.x / this.container.current.offsetWidth;
    const progressInSeconds = Math.min(duration, Math.max(0, duration * ratio));
    this.props.updateCurrentTime(progressInSeconds + this.props.startTime);
  }

  handleDragStop() {
    this.setState({
      beingDragged: false
    });
  }

  render() {
    const draggableProps = {};
    if (this.container.current && !this.state.beingDragged) {
      draggableProps.position = { x: this.calculateProgress(), y: 0 };
    }
    return (
      <div ref={this.container} className="time-indicator-container">
        <Draggable
          {...draggableProps}
          ref={this.indicator}
          axis="x"
          bounds="parent"
          handle=".time-indicator"
          onStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onStop={this.handleDragStop}
        >
          <div className="time-indicator" />
        </Draggable>
      </div>
    );
  }
}

TimelineIndicator.propTypes = {
  duration: PropTypes.number.isRequired,
  interval: PropTypes.number,
  currentTime: PropTypes.number,
  startTime: PropTypes.number,
  playing: PropTypes.bool,
  updateCurrentTime: PropTypes.func
};

TimelineIndicator.defaultProps = {
  interval: 10, // down to the millisecond it behaves erratically
  playing: false,
  updateCurrentTime: null,
  currentTime: 0,
  startTime: 0
};

const mapStateToProps = state => ({
  currentTime: state.currentTime,
  playing: state.isPlaying
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentTime: time => dispatch(setCurrentTime(time))
});

export const Unwrapped = TimelineIndicator;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineIndicator);
