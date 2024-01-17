import { Route, Navigate } from "react-router-dom";
export const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            <Navigate to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};
