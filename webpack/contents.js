import axios from "axios";

export function getPlay(playName, callback, error) {
  error = error || console.error;  // eslint-disable-line no-param-reassign
  axios
    .get(`/data/${playName}.json`)
    .then(res => {
      const props = res.data;
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

const contents = { play: getPlay };
export default contents;
