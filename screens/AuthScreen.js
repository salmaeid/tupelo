import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, View } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    paddingTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: "https://facebook.github.io/react/logo-og.png" }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }
}

AuthScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthScreen;
