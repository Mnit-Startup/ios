import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AuthLoadingScreen} from '../screens';
import {UnauthenticatedStack} from './unauthenticated.route';

export const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Unauthenticated: UnauthenticatedStack,
}, {
  initialRouteName: 'AuthLoading',
}));
