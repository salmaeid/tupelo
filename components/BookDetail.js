import React from "react";
import PropTypes from "prop-types";
import { Text, ViewPropTypes, View, Image } from "react-native";

function BookDetail({ book, style, ...rest }) {
  return (
    <View style={style} {...rest}>
      <Image style={{ width: 35, height: 60 }} source={{ uri: book.image }} />
      <Text>{book.isbn10}</Text>
      <Text>{book.isbn13}</Text>
      <Text>{book.title}</Text>
      <Text>{book.authors.join(", ")}</Text>
      <Text>{book.publisher}</Text>
      <Text>{book.pageCount}</Text>
      <Text>{book.categories.join(", ")}</Text>
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
