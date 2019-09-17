import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';
import {ProductList, Product} from '../../../models';

export interface PointOfSaleScreenState extends ComponentState {
  // subtotal of cart
  subTotal: string;
  // cart is a map of product id and its quantity
  cart: Map<string, number>;
  // products of the store
  productsList: ProductList;
  orientation: Orientation;
}
