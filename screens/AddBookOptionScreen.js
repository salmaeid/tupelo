import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Button, View, ActivityIndicator } from "react-native";

import Api from "../util/api";
import Colors from "../constants/Colors";
import ErrorMessage from "../components/ErrorMessage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: Colors.screenBgColor
  },
  barcodeButton: {
    marginVertical: 15
  }
});

class AddBookOptionScreen extends React.Component {
  static navigationOptions = {
    title: "Add Book"
  };

  state = {
    isLoading: false,
    error: ""
  };

  onSelected = async isbn => {
    const { navigation } = this.props;

    this.setState({
      isLoading: true,
      error: ""
    });

    try {
      await Api.post("/my-books", {
        isbn
      });

      navigation.goBack();
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to add a book."
        });
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { isLoading, error } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        {error.length > 0 && <ErrorMessage message={error} />}
        <View style={styles.barcodeButton}>
          <Button
            title="Scan Barcode"
            color={Colors.tintColor}
            onPress={() =>
              navigation.navigate("MyBooksScanBarcode", {
                onSelected: this.onSelected
              })
            }
          />
        </View>
        <Button title="Search" color={Colors.tintColor} />
      </View>
    );
  }
}

AddBookOptionScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default AddBookOptionScreen;
