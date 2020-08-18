import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    userId: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId;
    const response = await streams.post("/streams", {
      ...formValues,
      userId,
    });
    dispatch({
      type: CREATE_STREAM,
      stream: response.data,
    });
    history.push("/");
  } catch (error) {}
};

export const fetchStreams = () => async (dispatch) => {
  try {
    const response = await streams.get("/streams");
    dispatch({
      type: FETCH_STREAMS,
      streams: response.data,
    });
  } catch (error) {}
};

export const fetchStream = (id) => async (dispatch) => {
  try {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
      type: FETCH_STREAM,
      stream: response.data,
    });
  } catch (error) {}
};

export const editStream = (id, formValues) => async (dispatch) => {
  try {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({
      type: EDIT_STREAM,
      stream: response.data,
    });
    history.push("/");
  } catch (error) {}
};

export const deleteStream = (id, formValues) => async (dispatch) => {
  try {
    await streams.delete(`/streams/${id}`);
    dispatch({
      type: DELETE_STREAM,
      id: id,
    });
    history.push("/");
  } catch (error) {}
};
