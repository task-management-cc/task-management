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
    <Authenticator
      components={components}
      signUpAttributes={["name"]}
      loginMechanisms={["email"]}
    >
      {({ signOut, user }) => (
        <React.Fragment>
          <CssBaseline />
          <Header logout={signOut} />
          <Container>
            <h1>Hello, {user.attributes.name}</h1>
            <TaskManager email={user.username} />
          </Container>
        </React.Fragment>
      )}
    </Authenticator>
  );
}
