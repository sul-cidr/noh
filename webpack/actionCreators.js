import {
  SET_CURRENT_TIME,
  SET_START_TIME,
  SET_CURRENT_PHRASE_ID,
  SET_SCORE_TOGGLES,
  SET_SIDEBAR_STATE,
  SET_NARRATIVE_TAB
} from "./actions";

export function setScoreToggles(word) {
  return { type: SET_SCORE_TOGGLES, payload: word };
}

export function setCurrentTime(word) {
  return { type: SET_CURRENT_TIME, payload: word };
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

export function setNarrativeTab(narrativeTabId) {
  return { type: SET_NARRATIVE_TAB, payload: narrativeTabId };
}
