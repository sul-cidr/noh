import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import debounce from "lodash.debounce";
import { setCurrentTime } from "../actionCreators";

class TimelineIndicator extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.indicator = React.createRef();
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    this.updateCurrentTime = debounce(this.props.updateCurrentTime, 20);
    this.width = this.container.current
      ? this.container.current.offsetWidth
      : 1;
    this.forceUpdate();
  }

  calculateCurrentTime() {
    return 1e3 * this.props.currentTime; // currentTime is given in seconds
  }

  calculateMaxTime() {
    return 1e3 * this.props.duration; // duration is given in seconds
  }

  calculateProgress() {
    const progressTime = this.calculateCurrentTime() / this.calculateMaxTime();
    const progress = Math.ceil(
      Math.min(Math.max(progressTime * this.width, 0), this.width)
    );
    return progress === 0 ? -1 : progress;
  }

  handleDrag() {
    const { duration } = this.props;
    const ratio =
      this.indicator.current.state.x / this.container.current.offsetWidth;
    const progressInSeconds = Math.min(duration, Math.max(0, duration * ratio));
    this.updateCurrentTime(progressInSeconds);
  }

  render() {
    return (
      <div ref={this.container}>
        <Draggable
          position={{ x: this.calculateProgress(), y: 0 }}
          ref={this.indicator}
          axis="x"
          bounds={{
            left: -1, // for the width of the line
            right: this.width
          }}
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
  updateCurrentTime: PropTypes.func
};

TimelineIndicator.defaultProps = {
  updateCurrentTime: null,
  currentTime: 0
};

const mapStateToProps = state => ({
  currentTime: state.currentTime.time
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentTime: time =>
    dispatch(setCurrentTime({ time, origin: "TimelineIndicator" }))
});

export const Unwrapped = TimelineIndicator;
export default connect(mapStateToProps, mapDispatchToProps)(TimelineIndicator);
