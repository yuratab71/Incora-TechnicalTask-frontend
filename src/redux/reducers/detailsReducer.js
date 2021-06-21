import API from "../../api/api";

const SET_DETAILS = "SET_DETAILS";
const IS_FETCHING = "IS_FETCHING";

let initialState = {
  data: {},
  isFetching: false,
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS:
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

export default detailReducer;

const detailsAC = (data) => {
  return {
    type: SET_DETAILS,
    data,
  };
};

const fetchingAC = (bool) => {
  return {
    type: IS_FETCHING,
    bool,
  };
};

export const setDetails = (token, id, logout) => {
  return (dispatch) => {
    dispatch(fetchingAC(true));
    API.getDetails(token, id)
      .then((data) => {
        dispatch(detailsAC(data));
        dispatch(fetchingAC(false));
      })
      .catch((error) => {
        logout();
        dispatch(fetchingAC(false));
      });
  };
};
