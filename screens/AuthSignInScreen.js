import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor
  }
});

export default class AuthSignInScreen extends React.Component {
  static navigationOptions = {
    title: "Sign In"
  };

  render() {
    const { navigation } = this.props;

    return <View />;
  }
}
