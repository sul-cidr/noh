import {
  SET_CURRENT_TIME,
  SET_IS_PLAYING,
  SET_START_TIME,
  SET_CURRENT_PHRASE_ID,
  SET_SCORE_TOGGLES,
  SET_SIDEBAR_STATE
} from "./actions";

export function setScoreToggles(word) {
  return { type: SET_SCORE_TOGGLES, payload: word };
}

export function setCurrentTime(word) {
  return { type: SET_CURRENT_TIME, payload: word };
}

export function setIsPlaying(word) {
  return { type: SET_IS_PLAYING, payload: word };
}

export function setStartTime(word) {
  return { type: SET_START_TIME, payload: word };
}

export function setCurrentPhraseID(idString) {
  return { type: SET_CURRENT_PHRASE_ID, payload: idString };
}

export function setSidebarState(sidebarState) {
  return { type: SET_SIDEBAR_STATE, payload: sidebarState };
}
