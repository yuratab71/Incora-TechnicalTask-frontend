import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/authReducer";
import mainReducer from "./reducers/mainReducer";
import detailReducer from "./reducers/detailsReducer";

const reducers = combineReducers({
  auth: authReducer,
  main: mainReducer,
  details: detailReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
