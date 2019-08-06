import {createStackNavigator} from 'react-navigation';
import {ConsumerDashboardScreen} from '../screens/consumer/dashboard/dashboard.screen';
import {PayScreen} from '../screens/consumer/pay/pay.screen';

export const ConsumerNavigationStack = createStackNavigator({
  ConsumerDashboard: {
    screen: ConsumerDashboardScreen,
    navigationOptions: {
      header: null,
    },
  },
  Pay: {
    screen: PayScreen,
    navigationOptions: {
      header: null,
    },
  },
});
