import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Button
} from "react-native";

import Api from "../util/api";
import BookListRow from "../components/BookListRow";
import Colors from "../constants/Colors";
import ErrorMessage from "../components/ErrorMessage";
import TextField from "../components/TextField";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor
  }
});

class SearchBookScreen extends React.Component {
  static navigationOptions = {
    title: "Search Books"
  };

  state = {
    isLoading: false,
    search: "",
    books: [],
    error: ""
  };

  search = async () => {
    const { search } = this.state;
    this.setState({ isLoading: true, error: "" });

    try {
      const books = await Api.get(
        `/books/search/${encodeURIComponent(search)}`
      );
      this.setState({ isLoading: false, books, error: "" });
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
    const { isLoading, books, search, error } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        {error.length > 0 && <ErrorMessage message={error} />}
        <TextField
          onChangeText={e => this.setState({ search: e })}
          value={search}
          placeholder="Search"
        />
        <Button title="Search" color={Colors.tintColor} onPress={this.search} />
        <FlatList
          data={books}
          keyExtractor={(item, index) => `list-item-${index}`}
          renderItem={({ item }) => (
            <BookListRow
              book={item}
              onPress={() => {
                navigation.goBack();
                navigation.state.params.onSelected(item.isbn13 || item.isbn10);
              }}
            />
          )}
        />
      </View>
    );
  }
}

SearchBookScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default SearchBookScreen;
