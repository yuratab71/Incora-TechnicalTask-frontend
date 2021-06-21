import React, { useEffect } from "react";
import useRoutes from "./common/hooks/useRoutes";
import useAuth from "./common/hooks/useAuth";
import { connect } from "react-redux";
import { previousAuth } from "./redux/reducers/authReducer";

const App = ({ previousAuth, isAuthGlobal }) => {
  const { token, userId, login, logout } = useAuth();
  const isAuth = !!token;

  useEffect(() => {
    previousAuth(token, userId, isAuth, login, logout);
  }, [isAuth]);

  const routes = useRoutes(isAuthGlobal);

  return <div>{routes}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAuthGlobal: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { previousAuth })(App);
