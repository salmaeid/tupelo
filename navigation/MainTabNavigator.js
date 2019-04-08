import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MyBooksScreen from "../screens/MyBooksScreen";
import MyWishlistScreen from "../screens/MyWishlistScreen";
import AddBookOptionScreen from "../screens/AddBookOptionScreen";
import ScanBarcodeScreen from "../screens/ScanBarcodeScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const HomeIcon = ({ tintColor }) => (
  <TabBarIcon
    tintColor={tintColor}
    name={Platform.OS === "ios" ? `ios-search"}` : "md-search"}
  />
);

HomeIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

HomeStack.navigationOptions = {
  tabBarLabel: "Explore",
  tabBarIcon: HomeIcon
};

const MyBooksStack = createStackNavigator({
  MyBooks: MyBooksScreen,
  MyBooksAddOptions: AddBookOptionScreen,
  MyBooksScanBarcode: ScanBarcodeScreen
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
  Links: MyWishlistScreen
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

const ChatStack = createStackNavigator({
  Links: ChatScreen
});

const ChatIcon = ({ tintColor }) => (
  <TabBarIcon
    tintColor={tintColor}
    name={Platform.OS === "ios" ? "ios-mail" : "md-mail"}
  />
);

ChatIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

ChatStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ChatIcon
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
    HomeStack,
    MyBooksStack,
    MyWishlistStack,
    ChatStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.inactiveTintColor
    }
  }
);
