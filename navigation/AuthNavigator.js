import { createStackNavigator } from "react-navigation";

import AuthScreen from "../screens/Auth/AuthScreen";
import AuthSignInScreen from "../screens/Auth/AuthSignInScreen";
import AuthSignUpScreen from "../screens/Auth/AuthSignUpScreen";

export default createStackNavigator({
  Auth: AuthScreen,
  AuthSignIn: AuthSignInScreen,
  AuthSignUp: AuthSignUpScreen
});
