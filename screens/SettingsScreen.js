import React from "react";
import PropTypes from "prop-types";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Picker
} from "react-native";
import { NavigationEvents } from "react-navigation";
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
  }
});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  state = {
    isLoading: false,
    displayName: "",
    displayNameError: "",
    wishlistRadius: 20,
    error: ""
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

    this.updateDisplayName();

    return "";
  };

  updateDisplayName = async () => {
    const { displayName } = this.state;
    try {
      await Api.put("/settings/display-name", { displayName });
      this.setState({ error: "" });
    } catch (error) {
      if (error && error.message) {
        this.setState({ error: error.message });
      } else {
        this.setState({
          error: "An unknown error occured while trying to update display name."
        });
      }
    }
  };

  updateWishlistRadius = async wishlistRadius => {
    this.setState({ wishlistRadius });
    try {
      await Api.put("/settings/trade-radius", { wishlistRadius });
      this.setState({ error: "" });
    } catch (error) {
      if (error && error.message) {
        this.setState({ error: error.message });
      } else {
        this.setState({
          error: "An unknown error occured while trying to update display name."
        });
      }
    }
  };

  loadSettings = async () => {
    this.setState({ isLoading: true, error: "" });

    try {
      const settings = await Api.get("/settings");
      this.setState({
        isLoading: false,
        displayName: settings.displayName,
        displayNameError: "",
        wishlistRadius: settings.wishlistRadius,
        error: ""
      });
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to get your settings."
        });
      }
    }
  };

  signOutPress = async () => {
    const { navigation } = this.props;

    await AsyncStorage.removeItem("userToken");
    Api.setUserToken(null);
    navigation.navigate("Auth");
  };

  render() {
    const {
      displayName,
      displayNameError,
      wishlistRadius,
      error,
      isLoading
    } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.loadSettings()} />
        {error.length > 0 && <ErrorMessage message={error} />}
        <TextField
          onChangeText={d => this.setState({ displayName: d })}
          onBlur={() =>
            this.setState({ displayNameError: this.validateDisplayName() })
          }
          value={displayName}
          error={displayNameError}
          placeholder="Display Name"
        />
        <Picker
          prompt="Trade Radius"
          selectedValue={wishlistRadius}
          style={{ height: 50 }}
          onValueChange={v => this.updateWishlistRadius(v)}
        >
          <Picker.Item label="5 miles" value={5} />
          <Picker.Item label="10 miles" value={10} />
          <Picker.Item label="15 miles" value={15} />
          <Picker.Item label="20 miles" value={20} />
          <Picker.Item label="30 miles" value={30} />
          <Picker.Item label="40 miles" value={40} />
          <Picker.Item label="50 miles" value={50} />
        </Picker>
        <View style={{ marginTop: 15 }}>
          <Button
            title="Sign Out"
            color={Colors.tintColor}
            onPress={this.signOutPress}
          />
        </View>
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
