import {createStackNavigator} from 'react-navigation';
import {MerchantDashboardScreen, ManageStoreScreen, CreateStoreScreen,
  StoreDashboardScreen, CreateProductScreen, ProductsDashboardScreen, EditProductScreen} from '../screens/merchant';

export const MerchantNavigationStack = createStackNavigator({
  MerchantDashboard: {
    screen: MerchantDashboardScreen,
    navigationOptions: {
      header: null,
    },
  },
  StoreDashboard: {
    screen: StoreDashboardScreen,
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
  CreateProduct: {
    screen: CreateProductScreen,
    navigationOptions: {
      header: null,
    },
  },
  EditProduct: {
    screen: EditProductScreen,
    navigationOptions: {
      header: null,
    },
  },
  ProductsDashboard: {
    screen: ProductsDashboardScreen,
    navigationOptions: {
      header: null,
    },
  },
});
