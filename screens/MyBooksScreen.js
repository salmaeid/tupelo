import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { NavigationEvents } from "react-navigation";

import Api from "../util/api";
import BookListRow from "../components/BookListRow";
import Colors from "../constants/Colors";
import ErrorMessage from "../components/ErrorMessage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor
  }
});

class MyBooksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Books",
      headerRight: (
        <Button
          onPress={() => navigation.navigate("MyBooksAddOptions")}
          title="Add"
          color={Colors.tintColor}
        />
      )
    };
  };

  state = {
    isLoading: false,
    myBooks: [],
    error: ""
  };

  loadBooks = async () => {
    this.setState({ isLoading: true, error: "" });

    try {
      const books = await Api.get("/my-books");
      this.setState({ isLoading: false, myBooks: books, error: "" });
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to get your books."
        });
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { isLoading, myBooks, error } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.loadBooks()} />
        {error.length > 0 && <ErrorMessage message={error} />}
        <FlatList
          data={myBooks}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <BookListRow
              book={item}
              onPress={() =>
                navigation.navigate("MyBooksDetail", { id: item._id })
              }
            />
          )}
        />
      </View>
    );
  }
}

MyBooksScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default MyBooksScreen;
