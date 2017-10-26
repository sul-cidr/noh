import { SET_CURRENT_TIME, SET_HEADER_TEXT } from './actions';

export function setCurrentTime(word) {
  return { type: SET_CURRENT_TIME, payload: word };
}

export function setHeaderText(header) {
  return { type: SET_HEADER_TEXT, payload: header };
}
