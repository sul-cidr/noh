import React from "react";
import PropTypes from "prop-types";
import ShodanTimelineBlock from "./ShodanTimelineBlock";

// Rather than passing in style info from props
// should calculate in subcomponent from passed in duration
// and intensity
const ShodanTimeline = props => {
  const sectionBlocks = props.sections.map(section => (
    // the key here has to change if name is not unique
    <ShodanTimelineBlock
      key={section.name}
      name={section.name}
      left={section.left}
      width={section.width}
      height={section.height}
      maxIntensity={props.maxIntensity}
      intensity={section.intensity}
    />
  ));
  return <div className="shodan-map"> {sectionBlocks}</div>;
};

ShodanTimeline.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      left: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    })
  ).isRequired,
  maxIntensity: PropTypes.number.isRequired
};

export default ShodanTimeline;
