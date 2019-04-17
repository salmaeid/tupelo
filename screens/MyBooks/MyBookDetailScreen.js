import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert
} from "react-native";

import Api from "../../util/api";
import Colors from "../../constants/Colors";
import ErrorMessage from "../../components/ErrorMessage";
import BookDetail from "../../components/BookDetail";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.screenBgColor
  },
  barcodeButton: {
    marginVertical: 15
  }
});

class MyBookDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Book Info",
      headerRight: (
        <Button
          onPress={() =>
            Alert.alert(
              "Remove Book",
              "Are you sure you want to remove this book from your collection?",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel"
                },
                { text: "OK", onPress: navigation.state.params.remove }
              ],
              { cancelable: false }
            )
          }
          title="Remove"
          color={Colors.tintColor}
        />
      )
    };
  };

  state = {
    book: null,
    isLoading: false,
    error: ""
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;

    navigation.setParams({ remove: this.remove });

    this.setState({
      book: null,
      isLoading: true,
      error: ""
    });

    try {
      const book = await Api.get(`/my-books/${id}`);

      this.setState({
        book,
        isLoading: false,
        error: ""
      });
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to load a book."
        });
      }
    }
  }

  remove = async () => {
    const { navigation } = this.props;
    const { id } = navigation.state.params;

    this.setState({
      isLoading: true,
      error: ""
    });

    try {
      await Api.delete(`/my-books/${id}`);

      navigation.goBack();
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to delete the book."
        });
      }
    }
  };

  render() {
    const { isLoading, error, book } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <ScrollView style={styles.container}>
        {error.length > 0 && <ErrorMessage message={error} />}
        {book && <BookDetail book={book} />}
      </ScrollView>
    );
  }
}

MyBookDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default MyBookDetailScreen;
