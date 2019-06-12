import {createStackNavigator} from 'react-navigation';
import {MerchantDashboardScreen} from '../screens/merchant';

export const MerchantNavigationStack = createStackNavigator({
  MerchantDashboard: {
    screen: MerchantDashboardScreen,
    navigationOptions: {
      header: null,
    },
  },
});
