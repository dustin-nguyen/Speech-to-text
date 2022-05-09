import { useAuth } from "./db/firebase";
import { Route, Navigate } from "react-router-dom";
import React from "react";

export function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  if (auth.loading) return "authenticating";

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
