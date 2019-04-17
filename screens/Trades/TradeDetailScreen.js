import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import Api from "../../util/api";
import Colors from "../../constants/Colors";
import ErrorMessage from "../../components/ErrorMessage";
import TradeDetail from "../../components/TradeDetail";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor
  }
});

class TradeDetailScreen extends React.Component {
  static navigationOptions = {
    title: "Trade Info"
  };

  state = {
    trade: null,
    isLoading: false,
    error: ""
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { tradeStub } = navigation.state.params;

    navigation.setParams({ remove: this.remove });

    this.setState({
      trade: null,
      isLoading: true,
      error: ""
    });

    try {
      const trade = await Api.post(`/trades/book-info`, tradeStub);

      this.setState({
        trade,
        isLoading: false,
        error: ""
      });
    } catch (error) {
      if (error && error.message) {
        this.setState({ isLoading: false, error: error.message });
      } else {
        this.setState({
          isLoading: false,
          error: "An unknown error occured while trying to load a trade."
        });
      }
    }
  }

  render() {
    const { isLoading, error, trade } = this.state;

    if (isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.tintColor} />
        </View>
      );

    return (
      <View style={styles.container}>
        {error.length > 0 && <ErrorMessage message={error} />}
        {trade && <TradeDetail trade={trade} />}
      </View>
    );
  }
}

TradeDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default TradeDetailScreen;
