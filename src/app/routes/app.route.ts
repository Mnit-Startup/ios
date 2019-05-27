import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AuthLoadingScreen} from '../screens';

export const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen
}, {
  initialRouteName: 'AuthLoading',
}));