import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useSelector(selectUser);

  function isAuth() {
    let ret = false;
    if (user) {
      ret = user.isLogged ? true : false;
    } else {
      ret = false;
    }
    return ret;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
export default ProtectedRoute;
