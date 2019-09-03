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
    if (this.props.startTime !== null) {
      this.props.updateStartTime(this.props.startTime);
    } else if (this.props.url) {
      window.location.assign(this.props.url);
    }
  }

  render() {
    // should actually check to be sure that intensity is not greater than max
    const heightNum =
      (parseInt(this.props.intensity, 10) / this.props.maxIntensity) * 100;
    const durationNum = (this.props.duration / this.props.totalDuration) * 100;
    const pointer = this.props.url ? "pointer" : "";
    const danClass = this.props.dan.number
      ? `dan-${this.props.dan.number}`
      : "";
    const active =
      window.location.pathname === this.props.url
        ? "shodan-map__item--active"
        : "";
    const tooltipText = this.props.dan.value
      ? `${this.props.dan.value}: ${this.props.name}`
      : `${this.props.name}`;
    return (
      <div
        className={`shodan-map__item ${pointer} ${active} ${danClass}`}
        style={{
          width: `${durationNum}%`,
          height: `${heightNum}%`
        }}
        data-index={this.props.shodanIndex.number}
        data-tooltip={tooltipText}
        onClick={() => this.handleClick()}
        role="link"
        tabIndex={0}
        onKeyPress={null}
      />
    );
  }
}

ShodanTimelineBlock.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  startTime: PropTypes.number,
  maxIntensity: PropTypes.number.isRequired,
  intensity: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  updateStartTime: PropTypes.func,
  dan: PropTypes.shape({ number: PropTypes.string, value: PropTypes.string }),
  shodanIndex: PropTypes.shape({ number: PropTypes.string })
};

ShodanTimelineBlock.defaultProps = {
  url: "",
  startTime: null,
  updateStartTime: null,
  dan: { number: "", value: "" },
  shodanIndex: { number: "" }
};

const mapDispatchToProps = dispatch => ({
  updateStartTime: time =>
    dispatch(setCurrentTime({ time, origin: "ShodanTimelineBlock" }))
});

export const Unwrapped = ShodanTimelineBlock;
export default connect(
  null,
  mapDispatchToProps
)(ShodanTimelineBlock);
