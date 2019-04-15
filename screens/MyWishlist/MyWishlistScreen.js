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

import Api from "../../util/api";
import BookListRow from "../../components/BookListRow";
import Colors from "../../constants/Colors";
import ErrorMessage from "../../components/ErrorMessage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor
  }
});

class MyWishlistScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Wishlist",
      headerRight: (
        <Button
          onPress={() => navigation.navigate("MyWishlistAddOptions")}
          title="Add"
          color={Colors.tintColor}
        />
      )
    };
  };

  state = {
    isLoading: false,
    myWishlist: [],
    error: ""
  };

  loadWishlist = async () => {
    this.setState({ isLoading: true, error: "" });

    try {
      const wishlist = await Api.get("/my-wishlist");
      this.setState({ isLoading: false, myWishlist: wishlist, error: "" });
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to get your wishlist."
        });
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { isLoading, myWishlist, error } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.loadWishlist()} />
        {error.length > 0 && <ErrorMessage message={error} />}
        <FlatList
          data={myWishlist}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <BookListRow
              book={item}
              onPress={() =>
                navigation.navigate("MyWishlistDetail", { id: item._id })
              }
            />
          )}
        />
      </View>
    );
  }
}

MyWishlistScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default MyWishlistScreen;
