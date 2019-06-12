import {createStackNavigator} from 'react-navigation';
import {ConsumerDashboardScreen} from '../screens/consumer';

export const ConsumerNavigationStack = createStackNavigator({
  ConsumerDashboard: {
    screen: ConsumerDashboardScreen,
    navigationOptions: {
      header: null,
    },
  },
});
