import {createStackNavigator} from 'react-navigation';
import {PointOfSaleScreen, PaymentModeScreen} from '../screens/cashier';

export const CashierNavigationStack = createStackNavigator({
  POS: {
    screen: PointOfSaleScreen,
    navigationOptions: {
      header: null,
    },
  },
  PaymentMode: {
    screen: PaymentModeScreen,
    navigationOptions: {
      header: null,
    },
  },
});
