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

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flex: 1,
    flexDirection: "row"
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.inactiveTintColor
  },
  textSection: { marginLeft: 6, flex: 1 },
  text: { flex: 1, color: Colors.inactiveTintColor },
  thumbnail: { width: 35, height: 60 }
});

function BookListRow({ book, style, ...rest }) {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable {...rest}>
      <View style={[styles.container, style]}>
        <Image style={styles.thumbnail} source={{ uri: book.thumbnail }} />
        <View style={styles.textSection}>
          <Text style={styles.title} numberOfLines={1}>
            {book.title}
          </Text>
          {book.authors && (
            <Text style={styles.text} numberOfLines={1}>
              {book.authors.join(", ")}
            </Text>
          )}
        </View>
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
