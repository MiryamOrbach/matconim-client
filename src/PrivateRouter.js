import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute(props) {
  return (
    <>
      {localStorage.getItem("idCustomer") ? (
        <Route path={props.path} component={props.component} />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
