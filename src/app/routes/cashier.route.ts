import {createStackNavigator} from 'react-navigation';
import {PointOfSaleScreen, PaymentModeScreen, QRCodeScreen} from '../screens/cashier';

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
  QRCode: {
    screen: QRCodeScreen,
    navigationOptions: {
      header: null,
    },
  },
});
