import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types";

const streamsReducer = (state = {}, action) => {
  if (
    action.type === FETCH_STREAM ||
    action.type === CREATE_STREAM ||
    action.type === EDIT_STREAM
  ) {
    return { ...state, [action.stream.id]: action.stream };
  } else if (action.type === DELETE_STREAM) {
    let newState = { ...state };
    delete newState[action.id];
    return newState;
  } else if (action.type === FETCH_STREAMS) {
    let newState = { ...state };
    for (let stream of action.streams) {
      newState[stream.id] = stream;
    }
    return newState;
  }

  return state;
};

export default streamsReducer;
