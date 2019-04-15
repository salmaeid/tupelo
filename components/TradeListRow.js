import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  ViewPropTypes,
  View
} from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});

function TradeListRow({ trade, style, ...rest }) {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable style={[styles.container, style]} {...rest}>
      <View>
        <Text>{trade.displayName}</Text>
        <Text>Has {trade.has.length} wanted books</Text>
        <Text>Wants {trade.wants.length} of your books</Text>
        <Text>{trade.distance} miles away</Text>
      </View>
    </Touchable>
  );
}

TradeListRow.defaultProps = {
  style: {}
};

TradeListRow.propTypes = {
  trade: PropTypes.shape({
    displayName: PropTypes.string
  }).isRequired,
  style: ViewPropTypes.style
};

export default TradeListRow;
