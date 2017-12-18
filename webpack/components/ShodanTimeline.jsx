/* eslint-disable array-callback-return */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ShodanTimelineBlock from "./ShodanTimelineBlock";
import { convertTimeToSeconds } from "../utils";

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
          key={section.name}
          name={section.name}
          left={`${position}%`}
          maxIntensity={this.props.maxIntensity}
          intensity={section.intensity}
          duration={convertTimeToSeconds(section.duration)}
          totalDuration={this.props.totalDuration}
        />
      );
      sectionBlocks.push(newBlock);
      const blockWidth =
        convertTimeToSeconds(section.duration) / this.props.totalDuration * 100;
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
      name: PropTypes.string,
      left: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string
    })
  ).isRequired,
  maxIntensity: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired
};

export default ShodanTimeline;
