import API from "../../api/api";

const SET_MODE = "SET_MODE";
const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const PREV_AUTH = "PREV_AUTH";
const IS_FETCHING = "IS_FETCHING";

let initalState = {
  authMode: true, //bool for switching between login and register
  message: null,
  isAuth: false,
  token: null,
  userId: null,
  login: null, //functions for login and logout from page
  logout: null,
  isFetching: false,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        authMode: !action.bool,
      };
    case REGISTER:
      return {
        ...state,
        message: action.message,
      };
    case LOGIN:
      return {
        ...state,
        isAuth: action.bool,
        token: action.token,
        userId: action.id,
      };
    case PREV_AUTH:
      return {
        ...state,
        token: action.token,
        login: action.login,
        logout: action.logout,
        userId: action.userId,
        isAuth: action.bool,
      };
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.bool,
      };
    default:
      return state;
  }
};

export default authReducer;

export const fetchingAC = (bool) => {
  return {
    type: IS_FETCHING,
    bool,
  };
};

export const authModeAC = (bool) => {
  return {
    type: SET_MODE,
    bool,
  };
};

const loginAC = (token, id, bool) => {
  return {
    type: LOGIN,
    token,
    id,
    bool,
  };
};

const registerAC = (message) => {
  return {
    type: REGISTER,
    message,
  };
};

const previousAuthAC = (token, userId, bool, login, logout) => {
  return {
    type: PREV_AUTH,
    token,
    userId,
    bool,
    login,
    logout,
  };
};

export const previousAuth = (token, userId, bool, login, logout) => {
  return (dispatch) => {
    dispatch(previousAuthAC(token, userId, bool, login, logout));
  };
};

export const setMode = (bool) => {
  return (dispatch) => {
    dispatch(authModeAC(bool));
  };
};

export const getLogin = (data, login) => {
  return (dispatch) => {
    dispatch(fetchingAC(true));
    API.getLogin(data).then((data) => {
      if (!data.token && !data.userId) {
        dispatch(registerAC(data.message));
        dispatch(fetchingAC(false));
      } else {
        login(data.token, data.userId);
        dispatch(loginAC(data.token, data.userId, !!data.token));
        dispatch(fetchingAC(false));
      }
    });
  };
};

export const getRegister = (data, ...login) => {
  return (dispatch) => {
    dispatch(fetchingAC(true));
    API.getRegister(data).then((data) => {
      dispatch(registerAC(data.message));
      dispatch(fetchingAC(false));
    });
  };
};
