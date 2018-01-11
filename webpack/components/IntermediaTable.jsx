import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";
import IntermediaElement from "./IntermediaElement";
import { convertTimeToSeconds } from "../utils";

class IntermediaTable extends Component {
  currentSection() {
    return this.props.sections.find(
      section =>
        this.props.currentTime >= convertTimeToSeconds(section.timeStart) &&
        this.props.currentTime < convertTimeToSeconds(section.timeEnd)
    );
  }
  render() {
    const section = this.currentSection();
    return (
      <div className="intermedia-table">
        <IntermediaTitle section={section.name} play={this.props.play} />
        <IntermediaElement fieldName="Voices" fieldValue={section.voices} />
        <IntermediaElement
          fieldName="Type of voice"
          fieldValue={section.voiceType}
        />
        <IntermediaElement fieldName="Text" fieldValue={section.text} />
        <IntermediaElement
          fieldName="Percussion"
          fieldValue={section.percussion}
        />
        <IntermediaElement
          fieldName="Type of percussion"
          fieldValue={section.percussionType}
        />
        <IntermediaElement fieldName="Nohkan" fieldValue={section.nohkan} />
        <IntermediaElement fieldName="Dance" fieldValue={section.dance} />
      </div>
    );
  }
}

IntermediaTable.propTypes = {
  play: PropTypes.string.isRequired,
  currentTime: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      timeStart: PropTypes.string,
      timeEnd: PropTypes.string,
      voices: PropTypes.string,
      voiceType: PropTypes.string,
      text: PropTypes.string,
      percussion: PropTypes.string,
      percussionType: PropTypes.string,
      nohkan: PropTypes.string,
      dance: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({ currentTime: state.currentTime });

export const Unwrapped = IntermediaTable;
export default connect(mapStateToProps)(IntermediaTable);
