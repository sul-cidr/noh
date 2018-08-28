import React from "react";
import PropTypes from "prop-types";

const MeasureLabelContainer = props => {
  let labels = "";
  const { isBeatOn, isTextOn, isPercussionOn, isNohkanOn, isDanceOn } = props;
  const hasSomeToggleOn = Object.values({
    isBeatOn,
    isTextOn,
    isPercussionOn,
    isNohkanOn,
    isDanceOn
  }).some(value => !!value);
  if (props.previous === true && hasSomeToggleOn) {
    labels = <div className="measure__label-container">Previous sentence</div>;
  } else if (props.next === true && hasSomeToggleOn) {
    labels = <div className="measure__label-container">Next sentence</div>;
  } else {
    const measures = [
      isBeatOn ? (
        <div
          key="beatLabel"
          className="measure__channel measure__channel--beat"
        >
          Beat
        </div>
      ) : (
        ""
      ),
      isTextOn ? (
        <div
          key="textLabel"
          className="measure__channel measure__channel--text"
        >
          Text
        </div>
      ) : (
        ""
      ),
      isPercussionOn ? (
        <div
          key="percussionLabel"
          className="measure__channel measure__channel--percussion"
        >
          Percussion
        </div>
      ) : (
        ""
      ),
      isNohkanOn ? (
        <div
          key="nohkanLabel"
          className="measure__channel measure__channel--nohkan"
        >
          Nohkan
        </div>
      ) : (
        ""
      ),
      isDanceOn ? (
        <div
          key="danceLabel"
          className="measure__channel measure__channel--dance"
        >
          Dance
        </div>
      ) : (
        ""
      )
    ];
    labels = <div className="measure__label-container">{measures}</div>;
  }
  return labels;
};

MeasureLabelContainer.propTypes = {
  previous: PropTypes.bool,
  next: PropTypes.bool,
  isBeatOn: PropTypes.bool,
  isTextOn: PropTypes.bool,
  isPercussionOn: PropTypes.bool,
  isNohkanOn: PropTypes.bool,
  isDanceOn: PropTypes.bool,
  isPrevSentenceOn: PropTypes.bool,
  isNextSentenceOn: PropTypes.bool
};

MeasureLabelContainer.defaultProps = {
  previous: false,
  next: false,
  isBeatOn: true,
  isTextOn: true,
  isPercussionOn: true,
  isNohkanOn: true,
  isDanceOn: true,
  isPrevSentenceOn: true,
  isNextSentenceOn: true
};

export default MeasureLabelContainer;
