import _ from 'lodash';
import {Product} from './product';
import {CartItem} from './cart-item';
import {PaymentMode} from '../shared';

export class Receipt {
  readonly id: string;
  readonly total: number;
  readonly subTotal: number;
  readonly tax: number;
  readonly merchantName: string;
  readonly paymentMode: PaymentMode;
  readonly cart: Array<CartItem>;

  constructor(item: any) {
    this.id = _.get(item, 'id', '');
    this.total = parseFloat(_.get(item, 'total', 0));
    this.subTotal = parseFloat(_.get(item, 'sub_total', 0));
    this.tax = parseFloat(_.get(item, 'tax', 0));
    this.merchantName = _.get(item, 'store.name', '');
    this.paymentMode = _.get(item, 'payment_mode', '');
    this.cart = [];
    _.forEach(item.cart.products, (product) => {
      const cartItem = new CartItem({product: new Product(product), quantity: product.quantity});
      this.cart.push(cartItem);
    });
  }
 }
