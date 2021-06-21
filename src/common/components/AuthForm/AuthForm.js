import React from "react";
import { Formik, Field, Form } from "formik";
import "./authForm.css";
import {
  emailValidator,
  passwordValidator,
} from "../../validators/formValidators";

function AuthForm({
  type,
  switchTo,
  switchFn,
  switchMode,
  getAuth,
  message,
  login,
}) {
  return (
    <div className="auth_form_container">
      <div className="auth_form_name">{type}</div>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            if (
              !passwordValidator(values.password) ||
              !emailValidator(values.email)
            ) {
              alert("Invalid parameters");
            } else {
              const data = {
                email: values.email,
                password: values.password,
              };
              getAuth(data, login);
            }
          }}
        >
          <Form className="auth_form">
            <span className="auth_form_input_name">Email</span>
            <Field className="auth_form_input" name="email" type="text" />
            <span className="auth_form_input_name">Password</span>
            <Field
              className="auth_form_input"
              name="password"
              type="password"
            />
            <button className="auth_submit_button" type="submit">
              {type}
            </button>
          </Form>
        </Formik>
        <div className="mode_button_wrapper">
          <button
            className="auth_switch_mode_button"
            onClick={() => switchFn(switchMode)}
          >
            {switchTo}
          </button>
        </div>
        {!!message ? <div className="form_message">{message}</div> : ""}
      </div>
    </div>
  );
}

export default AuthForm;
