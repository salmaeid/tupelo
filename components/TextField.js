import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, StyleSheet, ViewPropTypes, Text } from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  input: {
    height: 44,
    paddingLeft: 6
  },
  error: {
    paddingLeft: 6,
    color: Colors.tintColor
  }
});

function TextField({ style, error, ...rest }) {
  return (
    <View>
      <TextInput
        selectionColor={Colors.tintColor}
        underlineColorAndroid={Colors.tintColor}
        placeholderTextColor={Colors.inactiveTintColor}
        style={[styles.input, style]}
        {...rest}
      />
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

TextField.defaultProps = {
  error: "",
  style: {}
};

TextField.propTypes = {
  error: PropTypes.string,
  style: ViewPropTypes.style
};

export default TextField;
