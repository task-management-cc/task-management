import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useTheme, View, Image } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import logo from "./logo.jpg";
import TaskManager from "./TaskManager";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import MyAccount from "./MyAccount";

Amplify.configure(awsExports);

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.small}>
        <Image alt="Task Manager logo" src={logo} height="50%" width="50%" />
      </View>
    );
  },
};

export default function App() {
  return (
    <BrowserRouter>
      <Authenticator
        components={components}
        signUpAttributes={["name"]}
        loginMechanisms={["email"]}
      >
        {({ signOut, user }) => (
          <React.Fragment>
            <CssBaseline />
            <Header logout={signOut} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Container>
                    {console.log(user)}
                    <h1>Hello, {user.attributes.name}</h1>
                    <TaskManager uid={user.attributes.sub} />
                  </Container>
                )}
              />
              <Route path="/profile" component={Profile} />
              <Route
                path="/my-account"
                render={() => <MyAccount uid={user.attributes.sub} />}
              />
            </Switch>
          </React.Fragment>
        )}
      </Authenticator>
    </BrowserRouter>
  );
}
