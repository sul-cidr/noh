/* eslint-disable array-callback-return */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ShodanTimelineBlock from "./ShodanTimelineBlock";

const slug = string => string.toLocaleLowerCase().replace(" ", "-");

class ShodanTimeline extends Component {
  createSectionBlocksForDan(danBlocks, danDuration) {
    const sectionBlocks = [];
    danBlocks.forEach(danBlock => {
      const section = danBlock;
      const position = 0;
      const lastEndTime = 0;
      const duration = section.endTime.value - lastEndTime;
      const sectionStartTime = section.startTime.value || 0;
      const blockProps =
        this.props.mode === "url"
          ? { url: section.sectionUrl }
          : { startTime: sectionStartTime };
      sectionBlocks.push(
        <ShodanTimelineBlock
          {...blockProps}
          key={section.sectionName.value}
          name={section.sectionName.value}
          left={`${position}%`}
          maxIntensity={this.props.maxIntensity}
          intensity={section.intensity.number || "0"}
          duration={duration}
          totalDuration={danDuration}
          dan={section.dan}
          shodanIndex={section.shodanIndex}
        />
      );
    });
    return sectionBlocks;
  }

  createDanBlocksForAct(act) {
    const danBlocks = [];
    let currentDan;
    let currentDanBlock;

    this.props.sections.forEach(section => {
      if (act.shodanIndices.includes(+section.shodanIndex.number)) {
        if ((section.dan.value || "") !== currentDan) {
          currentDan = section.dan.value || "";
          if (currentDanBlock) danBlocks.push(currentDanBlock);
          currentDanBlock = [];
        }
        currentDanBlock.push(section);
      }
    });
    if (currentDanBlock) danBlocks.push(currentDanBlock);
    return danBlocks.map(danBlock => {
      const danDuration = danBlock.reduce(
        (accumulator, section) =>
          accumulator +
          (section.endTime.value - (section.startTime.value || 0)),
        0
      );
      return (
        <div
          className={`dan dan-${slug(danBlock[0].dan.value || "")} dan-${
            danBlock[0].dan.number
          }`}
          style={{
            width: `${100 * (danDuration / act.duration)}%`,
            height: "100%"
          }}
        >
          {this.createSectionBlocksForDan(danBlock, danDuration)}
        </div>
      );
    });
  }

  createActBlocks() {
    const actBlocks = [];
    this.props.acts.forEach(act => {
      actBlocks.push(
        <div
          className={`act ${slug(act.translation)}`}
          style={{
            width: `${100 * (act.duration / this.props.totalDuration)}%`,
            height: "100%"
          }}
        >
          <span>{act.translation}</span>
          {this.createDanBlocksForAct(act)}
        </div>
      );
    });
    return actBlocks;
  }

  render() {
    const actBlocks = this.createActBlocks();
    return <div className="shodan-map">{actBlocks}</div>;
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
  acts: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxIntensity: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
  mode: PropTypes.string
};

ShodanTimeline.defaultProps = {
  mode: "startTime"
};

export default ShodanTimeline;
