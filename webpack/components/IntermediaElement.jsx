import React from "react";
import PropTypes from "prop-types";

const IntermediaElement = props => {
  const fieldValue = props.fieldValue || (
    <span className="intermedia__value__none">None</span>
  );
  return (
    <div className="intermedia__element">
      <div className="intermedia__label">{props.fieldName}</div>
      <div className="intermedia__value">{fieldValue}</div>
    </div>
  );
};

IntermediaElement.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string
};

IntermediaElement.defaultProps = {
  fieldValue: null
};

export default IntermediaElement;
