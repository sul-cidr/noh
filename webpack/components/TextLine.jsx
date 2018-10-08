import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentTime } from "../actionCreators";

class Line extends Component {
  constructor(props) {
    super(props);

    this.line = null;
    this.handleLineClick = this.handleLineClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.line.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  handleLineClick() {
    this.props.updateStartTime(this.props.startTime);
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
        <button
          onClick={this.handleLineClick}
          className="transcription__original"
        >
          {this.props.transcription}
        </button>
        <button
          onClick={this.handleLineClick}
          className="transcription__translation"
        >
          {this.props.translation}
        </button>
      </div>
    );
  }
}

Line.propTypes = {
  transcription: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  updateStartTime: PropTypes.func,
  startTime: PropTypes.number.isRequired
};

Line.defaultProps = {
  updateStartTime: null
};

const mapDispatchToProps = dispatch => ({
  updateStartTime: time => dispatch(setCurrentTime(time))
});

export const UnwrappedLine = Line;

export default connect(
  null,
  mapDispatchToProps
)(Line);
