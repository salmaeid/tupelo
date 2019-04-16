import React from "react";
import PropTypes from "prop-types";
import { Button, StyleSheet, Image, View } from "react-native";

import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    paddingTop: 45,
    paddingHorizontal: 15,
    flex: 1
  },
  image: {
    alignSelf: "center",
    width: 300,
    height: 300
  },
  signInButton: {
    marginVertical: 15
  }
});

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;

    /* eslint-disable global-require */
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/tupelo.png")}
          style={styles.image}
        />
        <View style={styles.signInButton}>
          <Button
            title="Sign In"
            color={Colors.tintColor}
            onPress={() => navigation.navigate("AuthSignIn")}
          />
        </View>
        <Button
          title="Create A New Account"
          color={Colors.tintColor}
          onPress={() => navigation.navigate("AuthSignUp")}
        />
      </View>
    );
    /* eslint-enable global-require */
  }
}

AuthScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthScreen;
