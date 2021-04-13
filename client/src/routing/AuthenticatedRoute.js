import React from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router";
import { isLoggedIn } from "../api/Authentication";
import { loadAuthData } from "../store/Authentication";

export const AuthenticatedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  if (isLoggedIn()) {
    const auth = {
      token: localStorage.getItem("jwtToken"),
      tokenExpirationTime: parseInt(
        localStorage.getItem("jwtTokenExpirationTime")
      ),
    };
    dispatch(loadAuthData({ auth: auth }));

    return <Route {...rest} render={() => children} />;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
