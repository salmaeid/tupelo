import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, View, Button } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1
  }
});

class AuthSignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Create Account"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TextInput placeholder="Email Address" />
        <TextInput placeholder="Display Name" />
        <TextInput secureTextEntry placeholder="Password" />
        <TextInput secureTextEntry placeholder="Confirm Password" />
        <Button
          title="Create Account"
          color={Colors.tintColor}
          onPress={() => navigation.navigate("Main")}
        />
      </View>
    );
  }
}

AuthSignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthSignUpScreen;
