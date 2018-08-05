import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IntermediaTitle from "./IntermediaTitle";
import IntermediaElement from "./IntermediaElement";

class IntermediaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSectionIndex: 0
    };
  }

  componentWillReceiveProps() {
    // Whenever props change, e.g. time, check to see if the current section index has changed. If so, update state.
    const currentSectionIndex = this.findCurrentSectionIndex();
    if (currentSectionIndex !== this.state.currentSectionIndex) {
      this.updateIndex(currentSectionIndex);
    }
  }

  findCurrentSectionIndex() {
    // Determine current sectionIndex based on time
    const currentSectionIndex = this.props.sections.findIndex(
      section =>
        this.props.currentTime >= section.startTime.value &&
        this.props.currentTime < section.endTime.value
    );
    // since findIndex returns -1 if it finds nothing, just return the current section index from state
    if (currentSectionIndex === -1) {
      return this.state.currentSectionIndex;
    }
    return currentSectionIndex;
  }

  updateIndex(currentSectionIndex) {
    this.setState({ currentSectionIndex });
  }

  render() {
    // due to lack of data for start and end time, not always finding current section
    const section = this.props.sections[this.state.currentSectionIndex];
    return (
      <div className="intermedia-table">
        <IntermediaTitle
          section={section.sectionName.value}
          sectionUrl={section.sectionUrl}
        />
        <IntermediaElement
          fieldName="Voices"
          fieldValue={section.numberVoices.value}
        />
        <IntermediaElement
          fieldName="Type of voice"
          fieldValue={section.voice.value}
        />
        <IntermediaElement fieldName="Text" fieldValue={section.text.value} />
        <IntermediaElement
          fieldName="Percussion"
          fieldValue={section.percussion.value}
        />
        <IntermediaElement
          fieldName="Type of percussion"
          fieldValue={section.numberOfPercussion.value}
        />
        <IntermediaElement
          fieldName="Nohkan"
          fieldValue={section.nokhanPresent.value}
        />
        <IntermediaElement
          fieldName="Dance"
          fieldValue={section.dancePresent.value}
        />
      </div>
    );
  }
}

IntermediaTable.propTypes = {
  currentTime: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      play: PropTypes.shape({ value: PropTypes.string }),
      sectionName: PropTypes.shape({ value: PropTypes.string }),
      sectionUrl: PropTypes.string.isRequired,
      intensity: PropTypes.shape({ number: PropTypes.string }),
      startTime: PropTypes.shape({ value: PropTypes.number }),
      endTime: PropTypes.shape({ value: PropTypes.number }),
      numberVoices: PropTypes.shape({
        number: PropTypes.string,
        value: PropTypes.string
      }),
      voice: PropTypes.shape({ value: PropTypes.string }),
      text: PropTypes.shape({ value: PropTypes.string }),
      numberOfPercussion: PropTypes.shape({ number: PropTypes.string }),
      percussion: PropTypes.shape({ value: PropTypes.string }),
      nokhanPresent: PropTypes.shape({
        present: PropTypes.string,
        value: PropTypes.string
      }),
      dancePresent: PropTypes.shape({
        present: PropTypes.string,
        value: PropTypes.string
      }),
      captions: PropTypes.Array,
      narrative: PropTypes.shape({ value: PropTypes.string })
    })
  ).isRequired
};

const mapStateToProps = state => ({ currentTime: state.currentTime });

export const Unwrapped = IntermediaTable;
export default connect(mapStateToProps)(IntermediaTable);
