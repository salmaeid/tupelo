import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MyBooksScreen from "../screens/MyBooksScreen";
import MyWishlistScreen from "../screens/MyWishlistScreen";
import ChatScreen from "../screens/ChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Explore",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      tintColor={tintColor}
      name={
        Platform.OS === "ios"
          ? `ios-search"}`
          : "md-search"
      }
    />
  )
};

const MyBooksStack = createStackNavigator({
  Links: MyBooksScreen
});

MyBooksStack.navigationOptions = {
  tabBarLabel: "My Books",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      tintColor={tintColor}
      name={Platform.OS === "ios" ? "ios-book" : "md-book"}
    />
  )
};

const MyWishlistStack = createStackNavigator({
  Links: MyWishlistScreen
});

MyWishlistStack.navigationOptions = {
  tabBarLabel: "My Wishlist",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      tintColor={tintColor}
      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
    />
  )
};

const ChatStack = createStackNavigator({
  Links: ChatScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: "Chat",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      tintColor={tintColor}
      name={Platform.OS === "ios" ? "ios-mail" : "md-mail"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <TabBarIcon
      tintColor={tintColor}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
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
