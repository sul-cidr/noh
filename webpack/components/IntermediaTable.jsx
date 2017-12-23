import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";
import IntermediaElement from "./IntermediaElement";
import { convertTimeToSeconds } from "../utils";

class IntermediaTable extends Component {
  currentSection() {
    const chunks = this.props.sections;
    const section = {
      name: "",
      voices: "",
      voiceType: "",
      text: "",
      percussion: "",
      percussionType: "",
      nohkan: "",
      dance: ""
    };
    for (let i = 0; i < chunks.length; i += 1) {
      if (
        this.props.currentTime >= convertTimeToSeconds(chunks[i].timeStart) &&
        this.props.currentTime < convertTimeToSeconds(chunks[i].timeEnd)
      ) {
        section.name = chunks[i].name;
        section.voices = chunks[i].voices;
        section.voiceType = chunks[i].voiceType;
        section.text = chunks[i].text;
        section.percussion = chunks[i].percussion;
        section.percussionType = chunks[i].percussionType;
        section.nohkan = chunks[i].nohkan;
        section.dance = chunks[i].dance;
      }
    }
    return section;
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
