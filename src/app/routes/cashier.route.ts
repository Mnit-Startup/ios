import {createStackNavigator} from 'react-navigation';
import {PointOfSaleScreen, PaymentModeScreen, QRCodeScreen, AmountTenderedScreen,
  CashChangeScreen, ConsumerEmailScreen} from '../screens/cashier';

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
  TenderAmount: {
    screen: AmountTenderedScreen,
    navigationOptions: {
      header: null,
    },
  },
  CashChange: {
    screen: CashChangeScreen,
    navigationOptions: {
      header: null,
    },
  },
  ConsumerEmail: {
    screen: ConsumerEmailScreen,
    navigationOptions: {
      header: null,
    },
  },
});
