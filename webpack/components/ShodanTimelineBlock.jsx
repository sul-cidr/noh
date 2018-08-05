import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentTime } from "../actionCreators";

// Rather than passing in style by props, these should be
// calculated from duration of section and intensity
class ShodanTimelineBlock extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.startTime) {
      this.props.updateStartTime(this.props.startTime);
    } else if (this.props.url) {
      window.location.assign(this.props.url);
    }
  }

  render() {
    // should actually check to be sure that intensity is not greater than max
    const heightNum =
      parseInt(this.props.intensity, 10) / this.props.maxIntensity * 100;
    const durationNum = this.props.duration / this.props.totalDuration * 100;
    return (
      <div
        className={`shodan-map__item ${this.props.url ? "pointer" : ""}`}
        style={{
          left: this.props.left,
          width: `${durationNum}%`,
          height: `${heightNum}%`
        }}
        data-tooltip={this.props.name}
        onClick={() => this.handleClick()}
        role="link"
        tabIndex={0}
        onKeyPress={null}
      />
    );
  }
}

ShodanTimelineBlock.propTypes = {
  left: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  startTime: PropTypes.number,
  maxIntensity: PropTypes.number.isRequired,
  intensity: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  updateStartTime: PropTypes.func
};

ShodanTimelineBlock.defaultProps = {
  url: "",
  startTime: null,
  updateStartTime: null
};

const mapDispatchToProps = dispatch => ({
  updateStartTime: time => dispatch(setCurrentTime(time))
});

export const Unwrapped = ShodanTimelineBlock;
export default connect(null, mapDispatchToProps)(ShodanTimelineBlock);
