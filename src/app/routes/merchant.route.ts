import {createStackNavigator} from 'react-navigation';
import {MerchantDashboardScreen, ManageStoreScreen, CreateStoreScreen} from '../screens/merchant';

export const MerchantNavigationStack = createStackNavigator({
  MerchantDashboard: {
    screen: MerchantDashboardScreen,
    navigationOptions: {
      header: null,
    },
  },
  ManageStore: {
    screen: ManageStoreScreen,
    navigationOptions: {
      header: null,
    },
  },
  CreateStore: {
    screen: CreateStoreScreen,
    navigationOptions: {
      header: null,
    },
  },
});
