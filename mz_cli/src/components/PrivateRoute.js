import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Unauthorizated from "../pages/errors/401";
function PrivateRoute({ access, component: Component, ...rest }) {
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
          access === 1 ? (
            access === user.user.admin ? (
              <Component {...props} />
            ) : (
              <Unauthorizated />
            )
          ) : access === 2 ? (
            user.user.admin === 1 || access === user.user.admin ? (
              <Component {...props} />
            ) : (
              <Unauthorizated />
            )
          ) : (
            
              access === 3 && (user.user.admin !== 0 ? (
              <Component {...props} />
              ) : (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
              ))
          
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
