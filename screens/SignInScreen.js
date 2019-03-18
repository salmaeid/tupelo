import React from "react";
import {
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
  View
} from "react-native";

import Colors from "../constants/Colors";

export default class SignInScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput/>
        <Button title="Sign In" onPress={this._signInAsync} />
        <Button title="Create A New Account" />
      </View>
    );
  }

  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate("Main");
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors.screenBgColor
    }
  })
