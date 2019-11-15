import _ from 'lodash';
import {Product} from './product';
import {CartItem} from './cart-item';

export class Transaction {
  readonly id: string;
  readonly amount: number;
  readonly paidOn: Date;
  readonly merchantName: string;
  readonly paymentStatus: string;
  readonly cart: Array<CartItem>;

  constructor(item: any) {
    this.id = _.get(item, 'id', '');
    this.amount = parseFloat(_.get(item, 'amount', 0));
    this.paidOn = new Date(_.get(item, 'paid_on'));
    this.merchantName = _.get(item, 'store.name', '');
    this.paymentStatus = _.get(item, 'payment_status', '');
    this.cart = [];
    _.forEach(item.cart.products, (product) => {
      const cartItem = new CartItem({product: new Product(product), quantity: product.quantity});
      this.cart.push(cartItem);
    });
  }

  calculateTax(): number {
    let subTotal = 0;
    _.forEach(this.cart, (item) => {
        subTotal += item.product.price * item.quantity;
    });
    subTotal = _.round(subTotal, 2);
    return _.round(this.amount - subTotal);
  }
 }
