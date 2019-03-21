import React from "react";
import { StyleSheet, View } from "react-native";

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
    return <View />;
  }
}
