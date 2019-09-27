import {Product} from './product';
import {ProductList} from './product-list';

export class CheckoutCart {
  readonly cart: Map<string, number>;

  constructor() {
    this.cart = new Map<string, number>();
  }

  addItemToCart(item) {
    this.cart.set(item.productId, 1);
  }

  removeItemFromCart(item) {
    this.cart.delete(item);
  }

  getItemQuantity(item) {
    if (this.cart.has(item)) {
      return this.cart.get(item);
    }
  }

  isCartEmpty() {
    if (this.cart.size === 0) {
      return true;
    }
    return false;
  }

  incrementItemQuantity(item) {
    if (this.cart.has(item)) {
      let quantity: number = this.cart.get(item);
      quantity++;
      this.cart.set(item, quantity);
    }
  }

  decrementItemQuantity(item) {
    if (this.cart.has(item)) {
      let quantity: number = this.cart.get(item);
      if (quantity === 1) {
        this.removeItemFromCart(item);
      } else {
        quantity--;
        this.cart.set(item, quantity);
      }
    }
  }

  getSubtotal(productList: ProductList) {
    let subTotal = 0;
    this.cart.forEach((value, key) => {
      const product: Product = productList.getProductById(key);
      subTotal += Number(product.price) * value;
    });
    return subTotal;
  }
}
