import React from "react";
import PropTypes from "prop-types";

const CellPercussion = props => {
  let percussionClass = "";
  let percussionContent = <span className="truncate">{props.text}</span>;
  if (props.text.startsWith("#")) {
    percussionClass = `cell--percussion-${props.text.slice(1)}`;
    percussionContent = "";
  }
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
