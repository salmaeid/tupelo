import React from "react";
import PropTypes from "prop-types";
import {
  AsyncStorage,
  StyleSheet,
  TextInput,
  View,
  Button
} from "react-native";

import Api from "../util/api";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor,
    paddingTop: 15,
    paddingHorizontal: 15,
    flex: 1
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
    password: ""
  };

  signInPress = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;

    try {
      const userToken = (await Api.post("/auth/login", {
        email,
        password
      })).data;

      await AsyncStorage.setItem("userToken", userToken);
      Api.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      navigation.navigate("Main");
    } catch (error) {
      // console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={e => this.setState({ email: e })}
          value={email}
          placeholder="Email Address"
        />
        <TextInput
          onChangeText={p => this.setState({ password: p })}
          value={password}
          secureTextEntry
          placeholder="Password"
        />
        <Button
          title="Sign In"
          color={Colors.tintColor}
          onPress={this.signInPress}
        />
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
