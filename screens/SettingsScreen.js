import React from "react";
import PropTypes from "prop-types";
import { AsyncStorage, StyleSheet, View, Button } from "react-native";

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

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  constructor(props) {
    super(props);

    this.signOutPress = this.signOutPress.bind(this);
  }

  signOutPress = async () => {
    const { navigation } = this.props;

    await AsyncStorage.removeItem("userToken");
    Api.setUserToken(null);
    navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
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
