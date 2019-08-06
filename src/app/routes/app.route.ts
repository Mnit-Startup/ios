import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AuthLoadingScreen} from '../screens';
import {UnauthenticatedStack} from './unauthenticated.route';
import {ConsumerNavigationStack} from './consumer.route';
import {MerchantNavigationStack} from './merchant.route';

export const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Unauthenticated: UnauthenticatedStack,
  ConsumerNavigationStack: ConsumerNavigationStack,
  MerchantNavigationStack: MerchantNavigationStack,
}, {
  initialRouteName: 'AuthLoading',
}));
