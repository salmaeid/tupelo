import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Button } from "react-native";
import Validator from "validator";

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
  signUpButton: {
    marginVertical: 15
  }
});

class AuthSignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Create Account"
  };

  constructor(props) {
    super(props);

    this.signUpPress = this.signUpPress.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateDisplayName = this.validateDisplayName.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
  }

  state = {
    email: "",
    emailError: "",
    displayName: "",
    displayNameError: "",
    password: "",
    passwordError: "",
    confirmPassword: "",
    confirmPasswordError: "",
    error: ""
  };

  signUpPress = async () => {
    const { navigation } = this.props;
    const { email, displayName, password, confirmPassword } = this.state;

    const validation = {
      emailError: this.validateEmail(),
      displayNameError: this.validateDisplayName(),
      passwordError: this.validatePassword(),
      confirmPasswordError: this.validateConfirmPassword()
    };

    if (Object.entries(validation).every(([, value]) => value === "")) {
      try {
        await Api.post("/auth/register", {
          email,
          displayName,
          password,
          confirmPassword
        });

        navigation.goBack();
      } catch (error) {
        if (error && error.message) {
          this.setState({ error: error.message });
        } else {
          this.setState({
            error: "An unknown error occured while trying to register."
          });
        }
      }
    } else {
      this.setState(validation);
    }
  };

  validateEmail = () => {
    const { email } = this.state;

    if (Validator.isEmpty(email) || !Validator.isEmail(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  validateDisplayName = () => {
    const { displayName } = this.state;

    if (Validator.isEmpty(displayName)) {
      return "Please enter a display name";
    }

    if (!Validator.isLength(displayName, { min: 2, max: 30 })) {
      return "Display name must contain between 2 and 30 characters";
    }

    if (
      !Validator.matches(
        displayName,
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
      )
    ) {
      return "Display name cannot contain numbers or special characters";
    }

    return "";
  };

  validatePassword = () => {
    const { password } = this.state;

    if (Validator.isEmpty(password)) {
      return "Please enter a password";
    }

    if (!Validator.isLength(password, { min: 6, max: undefined })) {
      return "Password must contain at least 6 characters";
    }

    return "";
  };

  validateConfirmPassword = () => {
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  };

  render() {
    const {
      email,
      emailError,
      displayName,
      displayNameError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
      error
    } = this.state;

    return (
      <View style={styles.container}>
        {error.length > 0 && <ErrorMessage message={error} />}
        <TextField
          onChangeText={e => this.setState({ email: e })}
          onBlur={() => this.setState({ emailError: this.validateEmail() })}
          value={email}
          error={emailError}
          placeholder="Email Address"
        />
        <TextField
          onChangeText={d => this.setState({ displayName: d })}
          onBlur={() =>
            this.setState({ displayNameError: this.validateDisplayName() })
          }
          value={displayName}
          error={displayNameError}
          placeholder="Display Name"
        />
        <TextField
          onChangeText={p => this.setState({ password: p })}
          onBlur={() =>
            this.setState({ passwordError: this.validatePassword() })
          }
          value={password}
          error={passwordError}
          secureTextEntry
          placeholder="Password"
        />
        <TextField
          onChangeText={p => this.setState({ confirmPassword: p })}
          onBlur={() =>
            this.setState({
              confirmPasswordError: this.validateConfirmPassword()
            })
          }
          value={confirmPassword}
          error={confirmPasswordError}
          secureTextEntry
          placeholder="Confirm Password"
        />
        <View style={styles.signUpButton}>
          <Button
            title="Create Account"
            color={Colors.tintColor}
            onPress={this.signUpPress}
          />
        </View>
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
