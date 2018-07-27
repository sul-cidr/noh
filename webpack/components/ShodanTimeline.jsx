/* eslint-disable array-callback-return */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ShodanTimelineBlock from "./ShodanTimelineBlock";

class ShodanTimeline extends Component {
  constructor(props) {
    super(props);
    this.createSectionBlocks = this.createSectionBlocks.bind(this);
  }

  createSectionBlocks() {
    let position = 0;
    let currentWidth = 0;
    const sectionBlocks = [];
    this.props.sections.map(section => {
      // the key here has to change if name is not unique
      const newBlock = (
        <ShodanTimelineBlock
          key={section.sectionName.value}
          name={section.sectionName.value}
          url={section.sectionUrl}
          left={`${position}%`}
          maxIntensity={this.props.maxIntensity}
          intensity={section.intensity.number || "0"}
          // lack of start and end time data means duration isnt always being computed
          duration={section.endTime.value - section.startTime.value || 150}
          totalDuration={this.props.totalDuration}
        />
      );
      sectionBlocks.push(newBlock);
      // lack of start and end time data means duration isnt being computed
      const blockWidth =
        (section.endTime.value - section.startTime.value || 150) /
        this.props.totalDuration *
        100;
      currentWidth = blockWidth;
      position += currentWidth;
    });
    return sectionBlocks;
  }

  render() {
    const sectionBlocks = this.createSectionBlocks();
    return <div className="shodan-map"> {sectionBlocks}</div>;
  }
}

ShodanTimeline.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionUrl: PropTypes.string,
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number })
    })
  ).isRequired,
  maxIntensity: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired
};

export default ShodanTimeline;
