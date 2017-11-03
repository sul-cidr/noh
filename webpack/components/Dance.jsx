import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import data from '../data/kiri-data.json';
import SimpleVideo from './SimpleVideo';

class Dance extends Component {
  currentDance() {
    const chunks = data.kiri.dance;
    const dance = { name: '', url: '' };
    for (let i = 0; i < chunks.length; i += 1) {
      if (
        this.props.currentTime >= chunks[i].timeStart &&
        this.props.currentTime < chunks[i].timeEnd
      ) {
        dance.name = chunks[i].name;
        dance.url = chunks[i].url;
      }
    }
    return dance;
  }

  render() {
    let danceVideo = null;
    const dance = this.currentDance();
    if (dance.name !== '') {
      danceVideo = <SimpleVideo src={dance.url} />;
    }
    return (
      <div className="dance-style">
        <h2>Dance Style: {this.currentDance().name}</h2>
        {danceVideo}
      </div>
    );
  }
}

Dance.propTypes = {
  currentTime: PropTypes.number
};

Dance.defaultProps = {
  currentTime: 0
};

const mapStateToProps = state => ({ currentTime: state.currentTime });

export const Unwrapped = Dance;
export default connect(mapStateToProps)(Dance);
