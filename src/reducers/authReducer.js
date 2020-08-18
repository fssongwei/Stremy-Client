const INIT_AUTH_STATE = {
  isLogIn: null,
  userId: null,
};

const authReducer = (state = INIT_AUTH_STATE, action) => {
  if (action.type === "SIGN_IN") {
    return { ...state, isLogIn: true, userId: action.userId };
  }

  if (action.type === "SIGN_OUT") {
    return { ...state, isLogIn: false, userId: null };
  }

  return state;
};

export default authReducer;
