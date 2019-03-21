import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor
  }
});

export default class AuthSignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Create Account"
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content
          padder
          contentContainerStyle={{
            paddingTop: 30,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      </Container>
    );
  }
}
