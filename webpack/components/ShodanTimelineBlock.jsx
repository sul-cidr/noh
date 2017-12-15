import React from "react";
import PropTypes from "prop-types";

// Rather than passing in style by props, these should be
// calculated from duration of section and intensity
const ShodanTimelineBlock = props => (
  <div
    className="shodan-map__item"
    style={{ left: props.left, width: props.width, height: props.height }}
    data-tooltip={props.name}
  />
);

ShodanTimelineBlock.propTypes = {
  left: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default ShodanTimelineBlock;
