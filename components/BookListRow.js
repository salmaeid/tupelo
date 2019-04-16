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
  }
});

function BookListRow({ book, style, ...rest }) {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable {...rest}>
      <View style={[styles.container, style]}>
        <Image
          style={{ width: 35, height: 60 }}
          source={{ uri: book.thumbnail }}
        />
        <View style={{ marginLeft: 6, flex: 1 }}>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: "bold",
              color: Colors.inactiveTintColor
            }}
            numberOfLines={1}
          >
            {book.title}
          </Text>
          {book.authors && (
            <Text
              style={{ flex: 1, color: Colors.inactiveTintColor }}
              numberOfLines={1}
            >
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
