import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import data from '../data/kiri-data.json';
import SimpleVideo from './SimpleVideo';

class Dance extends Component {
  currentDance() {
    const chunks = data.kiri.dance;
    let dance = '';
    for (let i = 0; i < chunks.length; i += 1) {
      if (
        this.props.currentTime >= chunks[i].timeStart &&
        this.props.currentTime < chunks[i].timeEnd
      ) {
        dance = chunks[i].name;
      }
    }
    return dance;
  }

  danceVideoUrl() {
    const currentDance = this.currentDance();
    const url = currentDance
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/-/g, '');
    return `./videos/${url}_Front.mov`;
  }

  render() {
    let danceVideo = null;
    if (this.currentDance() !== '') {
      danceVideo = <SimpleVideo src={this.danceVideoUrl()} />;
    }
    return (
      <div className="dance-style">
        <h2>Dance Style: {this.currentDance()}</h2>
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

export default connect(mapStateToProps)(Dance);
