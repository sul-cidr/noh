import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { setCurrentTime } from "../actionCreators";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

class TimelineScrubber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseDown: false,
      progress: 0
    };

    this.scrubberContainer = React.createRef();
    this.scrubberHandle = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);

    this.resetScrubber = this.resetScrubber.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      "mouseup",
      () => {
        if (this.state.mouseDown) this.handleMouseUp();
      },
      false
    );

    // this is read at component mount time so that it can be set in (S)CSS
    this.handleWidth = this.scrubberHandle.current.offsetWidth;

    // this prevents a little jankiness observable in FF
    // (related: https://bugzilla.mozilla.org/show_bug.cgi?id=1507193)
    this.updateCurrentTime = debounce(this.props.updateCurrentTime, 5);

    this.updateScrubberHandle();
  }

  componentDidUpdate(prevProps) {
    if (this.state.mouseDown) return;
    if (prevProps.currentTime !== this.props.currentTime)
      this.updateScrubberHandle();
  }

  updateScrubberHandle() {
    const { duration, currentTime, startTime } = this.props;
    const progress = clamp((currentTime - startTime) / duration, 0, 1);
    this.setState({ progress });
  }

  calculateProgress(pageX) {
    const container = this.scrubberContainer.current;
    const incrementPx =
      pageX - container.offsetParent.offsetLeft - this.handleWidth / 2;
    return clamp(incrementPx / container.offsetWidth, 0, 1);
  }

  updateTime() {
    const { duration, startTime } = this.props;
    this.updateCurrentTime(startTime + this.state.progress * duration);
  }

  resetScrubber() {
    this.setState({ mouseDown: false });
  }

  handleMouseDown({ pageX }) {
    this.setState({
      mouseDown: true,
      progress: this.calculateProgress(pageX)
    });
    this.updateTime();
  }

  handleMouseMove({ pageX }) {
    if (!this.state.mouseDown) return;
    this.setState({ progress: this.calculateProgress(pageX) });
    this.updateTime();
  }

  handleMouseUp() {
    if (!this.state.mouseDown) return;
    this.updateTime();
    this.resetScrubber();
  }

  handleMouseWheel(event) {
    const wheelDown = debounce(() => {
      this.setState({
        progress: clamp(this.state.progress - 0.02, 0, 1)
      });
      this.updateTime();
    }, 5);

    const wheelUp = debounce(() => {
      this.setState({
        progress: clamp(this.state.progress + 0.02, 0, 1)
      });
      this.updateTime();
    }, 5);

    event.persist();
    const { deltaX, deltaY } = event.nativeEvent;
    const [dominant] = [deltaX, -deltaY].sort(
      (a, b) => Math.abs(b) - Math.abs(a)
    );
    if (dominant > 0) {
      // scrolling down (yep...)
      wheelDown();
    } else {
      // scrolling up
      wheelUp();
    }
  }

  render() {
    return (
      <div
        className="timeline-scrubber"
        ref={this.scrubberContainer}
        role="button"
        tabIndex={0}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onBlur={this.resetScrubber}
        onWheel={this.handleMouseWheel}
      >
        <div
          role="button"
          tabIndex={0}
          className="timeline-scrubber__handle"
          style={{ left: `${this.state.progress * 100}%` }}
          ref={this.scrubberHandle}
        />
      </div>
    );
  }
}

TimelineScrubber.propTypes = {
  startTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  updateCurrentTime: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ currentTime: state.currentTime.time });

export const mapDispatchToProps = dispatch => ({
  updateCurrentTime: time =>
    dispatch(setCurrentTime({ time, origin: "TimelineScrubber" }))
});

export const Unwrapped = TimelineScrubber;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineScrubber);
