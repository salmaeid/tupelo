import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  ViewPropTypes,
  View,
  Image
} from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});

function BookListRow({ book, style, ...rest }) {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable style={[styles.container, style]} {...rest}>
      <View>
        <Image
          style={{ width: 35, height: 60 }}
          source={{ uri: book.thumbnail }}
        />
        <Text>{book.title}</Text>
        <Text>{book.authors.join(", ")}</Text>
      </View>
    </Touchable>
  );
}

BookListRow.defaultProps = {
  style: {}
};

BookListRow.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string
  }).isRequired,
  style: ViewPropTypes.style
};

export default BookListRow;
