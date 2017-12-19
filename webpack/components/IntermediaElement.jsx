import React from "react";
import PropTypes from "prop-types";

const IntermediaElement = props => (
  <div className="intermedia__element">
    <div className="intermedia__label">{props.fieldName}</div>
    <div className="intermedia__value">{props.fieldValue}</div>
  </div>
);

IntermediaElement.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired
};

export default IntermediaElement;
