import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';
import {ProductList, CheckoutCart} from '../../../models';

export interface PointOfSaleScreenState extends ComponentState {
  // products of the store
  productsList: ProductList;
  // cart is a map of product id and its quantity
  checkoutCart: CheckoutCart;
  // subtotal of cart
  subTotal: number;
  // total tax on cart items
  totalTax: number;
  storeLogo: string;
  loadingLogo: boolean;
  orientation: Orientation;
}
