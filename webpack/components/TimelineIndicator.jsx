import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import { setCurrentTime } from "../actionCreators";

class TimelineIndicator extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.indicator = React.createRef();
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  calculateCurrentTime() {
    return 1e3 * (this.props.currentTime - this.props.startTime); // currentTime is given in seconds
  }

  calculateMaxTime() {
    return 1e3 * this.props.duration; // currentTime is given in seconds
  }

  calculateProgress() {
    const progressTime = this.calculateCurrentTime() / this.calculateMaxTime();
    const offset = this.container.current
      ? this.container.current.offsetWidth
      : 1;
    const progress = Math.ceil(
      Math.min(Math.max(progressTime * offset, 0), offset)
    );
    return progress === 0 ? -1 : progress;
  }

  handleDrag() {
    const { duration } = this.props;
    const ratio =
      this.indicator.current.state.x / this.container.current.offsetWidth;
    const progressInSeconds = Math.min(duration, Math.max(0, duration * ratio));
    this.props.updateCurrentTime(progressInSeconds + this.props.startTime);
  }

  render() {
    return (
      <div ref={this.container} className="time-indicator-container">
        <Draggable
          position={{ x: this.calculateProgress(), y: 0 }}
          ref={this.indicator}
          axis="x"
          bounds="parent"
          handle=".time-indicator"
          onDrag={this.handleDrag}
        >
          <div className="time-indicator" />
        </Draggable>
      </div>
    );
  }
}

TimelineIndicator.propTypes = {
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  startTime: PropTypes.number,
  updateCurrentTime: PropTypes.func
};

TimelineIndicator.defaultProps = {
  updateCurrentTime: null,
  currentTime: 0,
  startTime: 0
};

const mapStateToProps = state => ({
  currentTime: state.currentTime.time
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentTime: time =>
    dispatch(setCurrentTime({ time, origin: "TimelineIndicator" }))
});

export const Unwrapped = TimelineIndicator;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineIndicator);
