import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.screenBgColor
  }
});

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const { navigation } = this.props;
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? "Main" : "Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.tintColor} />
      </View>
    );
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthLoadingScreen;
