import {createStackNavigator} from 'react-navigation';
import {SignInScreen, SignUpScreen} from '../screens';

/**
 * The navigation screen for the application
 */
export const UnauthenticatedStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
    },
  },
});
