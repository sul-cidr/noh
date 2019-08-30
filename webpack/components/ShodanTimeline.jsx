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
    let lastEndTime = -1;
    const sectionBlocks = [];
    this.props.sections.map(section => {
      // the key here has to change if name is not unique
      const duration = section.endTime.value - lastEndTime;
      let blockProps;
      if (this.props.mode === "url") {
        blockProps = { url: section.sectionUrl };
      } else {
        blockProps = { startTime: section.startTime.value || 0 };
      }
      sectionBlocks.push(
        <ShodanTimelineBlock
          {...blockProps}
          key={section.sectionName.value}
          name={section.sectionName.value}
          left={`${position}%`}
          maxIntensity={this.props.maxIntensity}
          intensity={section.intensity.number || "0"}
          duration={duration}
          totalDuration={this.props.totalDuration}
          dan={section.dan}
          shodanIndex={section.shodanIndex}
        />
      );
      position += (100 * duration) / this.props.totalDuration;
      lastEndTime = section.endTime.value;
    });
    return sectionBlocks;
  }

  render() {
    const sectionBlocks = this.createSectionBlocks();
    return <div className="shodan-map">{sectionBlocks}</div>;
  }
}

ShodanTimeline.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionUrl: PropTypes.string,
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number }),
      dan: PropTypes.shape({
        number: PropTypes.string,
        value: PropTypes.string
      })
    })
  ).isRequired,
  maxIntensity: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  mode: PropTypes.string
};

ShodanTimeline.defaultProps = {
  mode: "startTime"
};

export default ShodanTimeline;
