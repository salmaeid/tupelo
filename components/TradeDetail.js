import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  ViewPropTypes,
  View,
  SectionList
} from "react-native";

import BookListRow from "./BookListRow";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  infoContainer: { paddingHorizontal: 15, paddingBottom: 15 },
  title: { fontSize: 16, fontWeight: "bold", color: Colors.inactiveTintColor },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.inactiveTintColor,
    marginLeft: 15
  },
  boldText: { fontWeight: "bold", color: Colors.inactiveTintColor },
  text: { color: Colors.inactiveTintColor }
});

function TradeDetail({ trade, style, ...rest }) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{trade.displayName}</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            <Text>Contact: </Text>
          </Text>
          {trade.email}
        </Text>
        <Text style={styles.text}>{trade.distance.toFixed(2)} miles away</Text>
      </View>
      <SectionList
        renderItem={({ item }) => <BookListRow book={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionTitle]}>{title}</Text>
        )}
        sections={[
          { title: "Books for Trade", data: trade.has },
          { title: "Books Wanted", data: trade.wants }
        ]}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

TradeDetail.defaultProps = {
  style: {}
};

TradeDetail.propTypes = {
  trade: PropTypes.shape({
    displayName: PropTypes.string
  }).isRequired,
  style: ViewPropTypes.style
};

export default TradeDetail;
