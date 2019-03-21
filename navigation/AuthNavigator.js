import { createStackNavigator } from "react-navigation";

import AuthScreen from "../screens/AuthScreen";
import AuthSignInScreen from "../screens/AuthSignInScreen";
import AuthSignUpScreen from "../screens/AuthSignUpScreen";

export default createStackNavigator({
  Auth: AuthScreen,
  AuthSignIn: AuthSignInScreen,
  AuthSignUp: AuthSignUpScreen
});
