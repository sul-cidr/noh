import React, { Component } from "react";
import PropTypes from "prop-types";

class Acts extends Component {
  createActs() {
    const length = this.props.acts.length - 1;
    let left = 0;
    return this.props.acts.map((act, index) => {
      const width = (100 * act.duration) / this.props.duration;
      const translation = act.translation ? <span>{act.translation}</span> : "";
      left += width;
      const actEnd =
        index < length ? (
          <div
            key={`act-end-${act.translation}-${width}`}
            className="act__first-end"
            style={{ left: `${left}%` }}
          />
        ) : (
          ""
        );
      return [
        <div
          key={`act-${act.translation}-${width}`}
          className="act"
          style={{ width: `${width}%` }}
        >
          {translation}
        </div>,
        actEnd
      ];
    });
  }

  render() {
    const acts = this.createActs();
    return <div className="acts-container">{acts}</div>;
  }
}

Acts.propTypes = {
  acts: PropTypes.arrayOf(
    PropTypes.shape({
      translation: PropTypes.string.isRequired,
      transcription: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired
    })
  ).isRequired,
  duration: PropTypes.number.isRequired
};

export default Acts;
