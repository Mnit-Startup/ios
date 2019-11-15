import _ from 'lodash';
import {Product} from './product';

export class CartItem {
  readonly product: Product;
  readonly quantity: number;

  constructor(item: any) {
    this.product = _.get(item, 'product', null);
    this.quantity = _.get(item, 'quantity', 0);
  }
}
