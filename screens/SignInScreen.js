import React from "react";
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

import Colors from "../constants/Colors";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={{ paddingTop: 30, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
            style={{ width: 200, height: 200 }} />
          <Button block onPress={this._signInAsync} style={{marginVertical: 10}}>
            <Text>Sign In</Text>
          </Button>
          <Button block transparent>
            <Text>Create A New Account</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate("Main");
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor
  }
})
