import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image } from "react-native";
import { Container, Content, Button, Text } from "native-base";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.screenBgColor
  }
});

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;

    return (
      <Container style={styles.container}>
        <Content
          padder
          contentContainerStyle={{
            paddingTop: 30,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={{ uri: "https://facebook.github.io/react/logo-og.png" }}
            style={{ width: 200, height: 200 }}
          />
          <Button
            block
            onPress={() => navigation.navigate("AuthSignIn")}
            style={{ marginVertical: 10 }}
          >
            <Text>Sign In</Text>
          </Button>
          <Button
            block
            transparent
            onPress={() => navigation.navigate("AuthSignUp")}
          >
            <Text>Create A New Account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

AuthScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AuthScreen;
