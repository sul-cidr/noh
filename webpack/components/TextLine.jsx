import React, { Component } from "react";
import PropTypes from "prop-types";

class Line extends Component {
  constructor(props) {
    super(props);

    this.line = null;
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.line.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  render() {
    return (
      <div
        ref={line => {
          this.line = line;
        }}
        className={
          this.props.active
            ? "transcription__line active"
            : "transcription__line"
        }
      >
        <p className="transcription__original">{this.props.transcription}</p>
        <p className="transcription__translation">{this.props.translation}</p>
      </div>
    );
  }
}

Line.propTypes = {
  transcription: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default Line;
