import React from "react";
import PropTypes from "prop-types";

const CellPercussion = props => {
  const percussionClass = props.text.startsWith("#")
    ? `cell--percussion-${props.text.slice(1)}`
    : "";
  const percussionContent = props.text.startsWith("#") ? "" : props.text;
  return (
    <div
      className={`cell cell--${
        props.length
      } cell--percussion ${percussionClass}`}
    >
      {percussionContent}
    </div>
  );
};

CellPercussion.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
};

export default CellPercussion;
