import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage, StyleSheet, View, Button } from "react-native";

import Api from "../util/api";
import Colors from "../constants/Colors";
import ErrorMessage from "../components/ErrorMessage";
import TextField from "../components/TextField";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1
  },
  signInButton: {
    marginVertical: 15
  }
});

class AuthSignInScreen extends React.Component {
  static navigationOptions = {
    title: "Sign In"
  };

  constructor(props) {
    super(props);

    this.signInPress = this.signInPress.bind(this);
  }

  state = {
    email: "",
    password: "",
    error: ""
  };

  signInPress = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;

    try {
      const userToken = await Api.post("/auth/login", {
        email,
        password
      });

      await AsyncStorage.setItem("userToken", userToken);
      Api.setUserToken(userToken);
      navigation.navigate("Main");
    } catch (error) {
      if (error && error.message) {
        this.setState({ error: error.message });
      } else {
        this.setState({
          error: "An unknown error occured while trying to log in."
        });
      }
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <View style={styles.container}>
        {error.length > 0 && <ErrorMessage message={error} />}
        <TextField
          onChangeText={e => this.setState({ email: e })}
          value={email}
          placeholder="Email Address"
        />
        <TextField
          onChangeText={p => this.setState({ password: p })}
          value={password}
          secureTextEntry
          placeholder="Password"
        />
        <View style={styles.signInButton}>
          <Button
            title="Sign In"
            color={Colors.tintColor}
            onPress={this.signInPress}
            disabled={!email || !password}
          />
        </View>
      </View>
    );
  }
}

AuthSignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthSignInScreen;
