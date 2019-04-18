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

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 6
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.inactiveTintColor
  },
  text: { flex: 1, color: Colors.inactiveTintColor }
});

function TradeListRow({ trade, style, ...rest }) {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable {...rest}>
      <View style={[styles.container, style]}>
        <Text style={styles.title} numberOfLines={1}>
          {trade.displayName}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          Has {trade.has.length} books on your wishlist
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          {trade.distance.toFixed(2)} miles away
        </Text>
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
