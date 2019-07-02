import axios from "axios";
import { convertTimeToSeconds } from "./utils";

export function getPlay(playName, callback, error) {
  error = error || console.error; // eslint-disable-line no-param-reassign
  axios
    .get(`/data/${playName}.json`)
    .then(res => {
      const props = res.data;
      if (props.acts) {
        props.acts = props.acts.map(act =>
          Object.assign(act, { duration: convertTimeToSeconds(act.duration) })
        );
      }
      axios
        .get(props.narrative)
        .then(resp => {
          props.narrative = resp.data;
          callback(props);
        })
        .catch(err => {
          error(err);
        });
    })
    .catch(err => {
      error(err);
    });
}

export function getSection(playName, sectionName, callback, error) {
  error = error || console.error; // eslint-disable-line no-param-reassign
  axios
    .get(`/data/${playName}/${sectionName}.json`)
    .then(sectionResponse => {
      const props = sectionResponse.data;
      props.startTime = props.startTime.value || 0;
      props.endTime = props.endTime.value;
      props.duration = props.endTime - props.startTime;
      props.videoUrl = `${props.videoUrl.value}#t=${props.startTime},${
        props.endTime
      }`;
      props.videoDuration = convertTimeToSeconds(props.videoDuration.value);
      props.captions = props.captions.map((caption, index) =>
        Object.assign(caption, { phraseID: index.toString() })
      );
      props.playName = props.play.value;
      props.singingStyle = props.voice.value;
      props.title = props.sectionName.value;
      axios
        .get(props.narrative.value)
        .then(narrativeResponse => {
          props.narrative = narrativeResponse.data;
          axios
            .get(`/data/${playName}.json`)
            .then(playResponse => {
              props.sections = playResponse.data.sections;
              props.maxIntensity = playResponse.data.maxIntensity;
              props.tracks = playResponse.data.tracks;
              callback(props);
            })
            .catch(err => {
              error(err);
            });
        })
        .catch(err => {
          error(err);
        });
    })
    .catch(err => {
      error(err);
    });
}

const contents = { play: getPlay, section: getSection };
export default contents;
