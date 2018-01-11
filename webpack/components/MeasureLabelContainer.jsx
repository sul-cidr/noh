import React from "react";
import propTypes from "prop-types";

const MeasureLabelContainer = props => {
  let labels = "";
  if (props.previous === true) {
    labels = <div className="measure__label-container">Previous sentence</div>;
  } else if (props.next === true) {
    labels = <div className="measure__label-container">Next sentence</div>;
  } else {
    labels = (
      <div className="measure__label-container">
        <div className="measure__channel measure__channel--beat">Beat</div>
        <div className="measure__channel measure__channel--text measure__channel--large">
          Text
        </div>
        <div className="measure__channel measure__channel--percussion">
          Percussion
        </div>
        <div className="measure__channel measure__channel--nohkan">Nohkan</div>
        <div className="measure__channel measure__channel--dance">Dance</div>
      </div>
    );
  }
  return labels;
};

MeasureLabelContainer.PropTypes = {
  previous: propTypes.Bool,
  next: propTypes.Bool
};

MeasureLabelContainer.defaultProps = {
  previous: false,
  next: false
};

export default MeasureLabelContainer;
