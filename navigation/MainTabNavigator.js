import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MyBooksScreen from "../screens/MyBooks/MyBooksScreen";
import AddMyBookOptionScreen from "../screens/MyBooks/AddMyBookOptionScreen";
import MyBookDetailScreen from "../screens/MyBooks/MyBookDetailScreen";
import MyWishlistScreen from "../screens/MyWishlist/MyWishlistScreen";
import AddMyWishlistOptionScreen from "../screens/MyWishlist/AddMyWishlistOptionScreen";
import MyWishlistDetailScreen from "../screens/MyWishlist/MyWishlistDetailScreen";
import ScanBarcodeScreen from "../screens/ScanBarcodeScreen";
import SearchBookScreen from "../screens/SearchBookScreen";
import TradeScreen from "../screens/Trades/TradeScreen";
import TradeDetailScreen from "../screens/Trades/TradeDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Colors from "../constants/Colors";

const MyBooksStack = createStackNavigator({
  MyBooks: MyBooksScreen,
  MyBooksAddOptions: AddMyBookOptionScreen,
  MyBooksDetail: MyBookDetailScreen,
  MyBooksScanBarcode: ScanBarcodeScreen,
  MyBooksSearchBookScreen: SearchBookScreen
});

const MyBooksIcon = ({ tintColor }) => (
  <TabBarIcon
    tintColor={tintColor}
    name={Platform.OS === "ios" ? "ios-book" : "md-book"}
  />
);

MyBooksIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

MyBooksStack.navigationOptions = {
  tabBarLabel: "My Books",
  tabBarIcon: MyBooksIcon
};

const MyWishlistStack = createStackNavigator({
  MyWishlist: MyWishlistScreen,
  MyWishlistAddOptions: AddMyWishlistOptionScreen,
  MyWishlistDetail: MyWishlistDetailScreen,
  MyWishlistScanBarcode: ScanBarcodeScreen,
  MyWishlistSearchBookScreen: SearchBookScreen
});

const MyWishlistIcon = ({ tintColor }) => (
  <TabBarIcon
    tintColor={tintColor}
    name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
  />
);

MyWishlistIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

MyWishlistStack.navigationOptions = {
  tabBarLabel: "My Wishlist",
  tabBarIcon: MyWishlistIcon
};

const TradeStack = createStackNavigator({
  Trades: TradeScreen,
  TradeDetail: TradeDetailScreen
});

const TradeIcon = ({ tintColor }) => (
  <TabBarIcon
    tintColor={tintColor}
    name={Platform.OS === "ios" ? "ios-repeat" : "md-repeat"}
  />
);

TradeIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

TradeStack.navigationOptions = {
  tabBarLabel: "Trades",
  tabBarIcon: TradeIcon
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

const SettingsIcon = ({ tintColor }) => (
  <TabBarIcon
    tintColor={tintColor}
    name={Platform.OS === "ios" ? "ios-options" : "md-options"}
  />
);

SettingsIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: SettingsIcon
};

export default createBottomTabNavigator(
  {
    MyBooksStack,
    MyWishlistStack,
    TradeStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.inactiveTintColor
    }
  }
);
