import React from "react";
import PropTypes from "prop-types";
import { Text, ViewPropTypes, View, Image, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "bold", color: Colors.inactiveTintColor },
  boldText: { fontWeight: "bold", color: Colors.inactiveTintColor },
  text: { color: Colors.inactiveTintColor },
  image: {
    width: 140,
    height: 240,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10
  }
});

function BookDetail({ book, style, ...rest }) {
  return (
    <View style={style} {...rest}>
      {book.image && (
        <Image style={styles.image} source={{ uri: book.image }} />
      )}
      <Text style={styles.title}>{book.title}</Text>
      {book.isbn10 && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>ISBN 10: </Text>
          {book.isbn10}
        </Text>
      )}
      {book.isbn13 && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>ISBN 13: </Text>
          {book.isbn13}
        </Text>
      )}
      {book.authors && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Authors: </Text>
          {book.authors.join(", ")}
        </Text>
      )}
      {book.publisher && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Publisher: </Text>
          {book.publisher}
        </Text>
      )}
      {book.pageCount && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Page Count: </Text>
          {book.pageCount}
        </Text>
      )}
      {book.categories && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Categories: </Text>
          {book.categories.join(", ")}
        </Text>
      )}
    </View>
  );
}

BookDetail.defaultProps = {
  style: {}
};

BookDetail.propTypes = {
  book: PropTypes.shape({
    isbn10: PropTypes.string,
    isbn13: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    publisher: PropTypes.string,
    pageCount: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string
  }).isRequired,
  style: ViewPropTypes.style
};

export default BookDetail;
