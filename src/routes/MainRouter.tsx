import { observer } from "mobx-react";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useStore } from "../hooks/stores";
import { UserDetails } from "../stores/Auth/types";
import API from "../utils/api";
import Firebase from "../utils/Firebase";
import ShoppingList from "./shoppingList";
import SignIn from "./singin";

const MainRouter: React.FunctionComponent = (): React.ReactElement => {
  const {
    auth: { setUserDetails, isLoggedIn },
  } = useStore();

  React.useEffect(() => {
    Firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const details = await API.getUserDetails(user.uid);
        if (details) {
          setUserDetails(details as UserDetails);
        }
      }
    });
  }, [setUserDetails]);

  return (
    <>
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/signin">
            {isLoggedIn ? <Redirect to="/app" /> : <SignIn />}
          </Route>
          <Route path="/app">
            {isLoggedIn ? <ShoppingList /> : <Redirect to="/signin" />}
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default observer(MainRouter);
