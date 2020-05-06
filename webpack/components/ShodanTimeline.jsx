/* eslint-disable array-callback-return */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ShodanTimelineBlock from "./ShodanTimelineBlock";

const slug = string => string.toLocaleLowerCase().replace(" ", "-");

class ShodanTimeline extends Component {
  createSectionBlocksForDan(danBlock, danDuration) {
    const sectionBlocks = [];
    danBlock.forEach((section, index, array) => {
      const position = 0;
      const sectionStartTime = section.startTime.value || 0;

      const duration =
        index + 1 in array
          ? array[index + 1].startTime.value - sectionStartTime
          : (danBlock[0].startTime.value || 0) + danDuration - sectionStartTime;

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
          intensity={section.intensity.number}
          duration={duration}
          totalDuration={danDuration}
          dan={section.dan.number}
          shodanIndex={section.shodanIndex.number}
          isShodan={section.shodanType.value !== undefined}
        />
      );
    });
    return sectionBlocks;
  }

  createDanBlocks(sections, actEndTime, actDuration) {
    const danBlocks = [];
    let currentDan;
    let currentDanBlock;

    sections.forEach(section => {
      if ((section.dan.value || "") !== currentDan) {
        currentDan = section.dan.value || "";
        if (currentDanBlock) danBlocks.push(currentDanBlock);
        currentDanBlock = [];
      }
      currentDanBlock.push(section);
    });

    danBlocks.push(currentDanBlock);

    return danBlocks.map((danBlock, index, array) => {
      const danDuration =
        index + 1 in array
          ? array[index + 1][0].startTime.value - danBlock[0].startTime.value
          : actEndTime - (danBlock[0].startTime.value || 0);
      return (
        <div
          key={`dan-block-${danBlock[0].dan.number}`}
          className={`dan dan-${slug(
            danBlock[0].dan.value || "no-tooltip"
          )} dan-${danBlock[0].dan.number}`}
          data-tooltip={danBlock[0].dan.value}
          style={{
            width: `${100 * (danDuration / actDuration)}%`,
            height: "100%"
          }}
        >
          {this.createSectionBlocksForDan(danBlock, danDuration)}
        </div>
      );
    });
  }

  createActBlocks(acts) {
    const actBlocks = [];
    acts.forEach(({ act, endTime, duration }) => {
      const actSections = this.props.sections.filter(section =>
        act.shodanIndices.includes(+section.shodanIndex.number)
      );

      actBlocks.push(
        <div
          key={`act-block-${slug(act.translation)}`}
          className={`act ${slug(act.translation)}`}
          style={{
            width: `${100 * (duration / this.props.totalDuration)}%`,
            height: "100%"
          }}
        >
          <span>{act.translation}</span>
          {this.createDanBlocks(actSections, endTime, duration)}
        </div>
      );
    });
    return actBlocks;
  }

  render() {
    const acts = this.props.acts.map((act, index, array) => {
      const startTime =
        this.props.sections.find(
          section => +section.shodanIndex.number === act.shodanIndices[0]
        ).startTime.value || 0;
      if (index + 1 in array) {
        const nextSection = this.props.sections.find(
          section =>
            +section.shodanIndex.number === array[index + 1].shodanIndices[0]
        );
        return {
          act,
          endTime: +nextSection.startTime.value,
          duration: +nextSection.startTime.value - startTime
        };
      }
      return {
        act,
        endTime: this.props.totalDuration,
        duration: this.props.totalDuration - startTime
      };
    });

    const actBlocks = this.createActBlocks(acts);
    return <div className="act-map">{actBlocks}</div>;
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
