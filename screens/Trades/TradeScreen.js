import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { NavigationEvents } from "react-navigation";

import Api from "../../util/api";
import TradeListRow from "../../components/TradeListRow";
import Colors from "../../constants/Colors";
import ErrorMessage from "../../components/ErrorMessage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor
  }
});

class TradeScreen extends React.Component {
  static navigationOptions = {
    title: "Trades"
  };

  state = {
    isLoading: false,
    trades: [],
    error: ""
  };

  loadTrades = async () => {
    this.setState({ isLoading: true, error: "" });

    try {
      const trades = await Api.get("/trades");
      this.setState({ isLoading: false, trades, error: "" });
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to get your trades."
        });
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { isLoading, trades, error } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.loadTrades()} />
        {error.length > 0 && <ErrorMessage message={error} />}
        <FlatList
          data={trades}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TradeListRow
              trade={item}
              onPress={() =>
                navigation.navigate("TradeDetail", { tradeStub: item })
              }
            />
          )}
        />
      </View>
    );
  }
}

TradeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default TradeScreen;
