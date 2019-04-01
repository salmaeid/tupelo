import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tintColor,
    padding: 6,
    borderRadius: 3
  },
  message: {
    color: "#fff"
  }
});

function ErrorMessage({ message, style, ...rest }) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

ErrorMessage.defaultProps = {
  message: "",
  style: styles.container
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  style: ViewPropTypes.style
};

export default ErrorMessage;
