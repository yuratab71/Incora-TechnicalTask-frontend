import React from "react";
import "./auth.css";
import AuthForm from "../../common/components/AuthForm/AuthForm";
import Progress from "../../common/components/CircularProgress/CircularProgress";
import {
  setMode,
  getLogin,
  getRegister,
} from "../../redux/reducers/authReducer";
import { connect } from "react-redux";

const Auth = ({
  authMode,
  message,
  setMode,
  getLogin,
  getRegister,
  login,
  isFetching,
}) => {
  return (
    <div className="auth_container">
      {isFetching ? (
        <Progress />
      ) : authMode ? (
        <AuthForm
          type="LOGIN"
          switchTo="Register"
          switchMode={authMode}
          switchFn={setMode}
          getAuth={getLogin}
          message={message}
          login={login}
        />
      ) : (
        <AuthForm
          type="REGISTER"
          switchMode={authMode}
          switchTo="Login"
          switchFn={setMode}
          getAuth={getRegister}
          message={message}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authMode: state.auth.authMode,
    message: state.auth.message,
    login: state.auth.login,
    isFetching: state.auth.isFetching,
  };
};

export default connect(mapStateToProps, { setMode, getRegister, getLogin })(
  Auth
);
