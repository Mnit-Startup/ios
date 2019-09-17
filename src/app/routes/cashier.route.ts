import {createStackNavigator} from 'react-navigation';
import {PointOfSaleScreen} from '../screens/cashier';

export const CashierNavigationStack = createStackNavigator({
  POS: {
    screen: PointOfSaleScreen,
    navigationOptions: {
      header: null,
    },
  },
});
