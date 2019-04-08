import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  Image
} from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});

function BookListRow({ book, style, ...rest }) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Image
        style={{ width: 35, height: 60 }}
        source={{ uri: book.thumbnail }}
      />
      <Text>{book.title}</Text>
      <Text>{book.authors.join(", ")}</Text>
    </TouchableOpacity>
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
