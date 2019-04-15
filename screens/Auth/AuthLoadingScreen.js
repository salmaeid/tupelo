import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";

import Api from "../../util/api";
import Colors from "../../constants/Colors";

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

    if (userToken) {
      Api.setUserToken(userToken);
      navigation.navigate("Main");
    } else {
      navigation.navigate("Auth");
    }
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
