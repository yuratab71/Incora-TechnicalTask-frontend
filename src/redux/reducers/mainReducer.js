import API from "../../api/api";

const SET_DATA = "SET_DATA";
const IS_FETCHING = "IS_FETCHING";

let initialState = {
  data: [],
  isFetching: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
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

export default mainReducer;

const setDataAC = (data) => {
  return {
    type: SET_DATA,
    data,
  };
};

const setFetching = (bool) => {
  return {
    type: IS_FETCHING,
    bool,
  };
};

export const setData = (token, logout) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    API.getData(token).then((data) => {
      if (!data) logout();
      dispatch(setDataAC(data));
      dispatch(setFetching(false));
    });
  };
};

export const setCreate = (token, data, logout) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    API.getCreate(token, data).then((responce) => {
      if (responce.status === 200) {
        API.getData(token).then((data) => {
          dispatch(setDataAC(data));
          dispatch(setFetching(false));
        });
      } else {
        {
          logout();
          dispatch(setFetching(false));
        }
      }
    });
  };
};

export const setDelete = (token, id, logout) => {
  return (dispatch) => {
    API.getDelete(token, id).then((status) => {
      if (status === 200) {
        API.getData(token).then((data) => {
          dispatch(setDataAC(data));
        });
      } else logout();
    });
  };
};

export const setPatch = (token, id, data, logout) => {
  return (dispatch) => {
    API.getPatch(token, id, data).then((status) => {
      if (status === 200) {
        API.getData(token).then((data) => {
          dispatch(setDataAC(data));
        });
      } else logout();
    });
  };
};
