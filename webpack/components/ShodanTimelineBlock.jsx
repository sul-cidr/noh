import React from "react";
import PropTypes from "prop-types";

// Rather than passing in style by props, these should be
// calculated from duration of section and intensity
const ShodanTimelineBlock = props => {
  // should actually check to be sure that intensity is not greater than max
  const heightNum = parseInt(props.intensity, 10) / props.maxIntensity * 100;
  const durationNum = props.duration / props.totalDuration * 100;
  return (
    <div
      className={`shodan-map__item ${props.url ? "pointer" : ""}`}
      style={{
        left: props.left,
        width: `${durationNum}%`,
        height: `${heightNum}%`
      }}
      data-tooltip={props.name}
      onClick={() => props.url && window.location.assign(props.url)}
      role="link"
      tabIndex={0}
      onKeyPress={null}
    />
  );
};

ShodanTimelineBlock.propTypes = {
  left: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  maxIntensity: PropTypes.number.isRequired,
  intensity: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired
};

ShodanTimelineBlock.defaultProps = {
  url: ""
};

export default ShodanTimelineBlock;
