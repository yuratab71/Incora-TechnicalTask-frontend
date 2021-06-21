import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "../../pages/Main/Main";
import Register from "../../pages/Auth/Auth";
import Details from "../../pages/Details/Details";

const Routes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/item/:id" component={Details} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Register} />
      <Redirect to={Main} />
    </Switch>
  );
};

export default Routes;
