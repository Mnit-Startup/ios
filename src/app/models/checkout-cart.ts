import {Product} from './product';
import {ProductList} from './product-list';

export class CheckoutCart {
  readonly cart: Map<string, number>;

  constructor() {
    this.cart = new Map<string, number>();
  }

  addItemToCart(item: Product) {
    if (item.productId) {
      if (this.cart.has(item.productId)) {
        this.incrementItemQuantity(item.productId);
      } else  {
        this.cart.set(item.productId, 1);
      }
    }
  }

  removeItemFromCart(id: string) {
    this.cart.delete(id);
  }

  getItemQuantity(id: string) {
    if (this.cart.has(id)) {
      return this.cart.get(id);
    }
  }

  isCartEmpty() {
    if (this.cart.size === 0) {
      return true;
    }
    return false;
  }

  incrementItemQuantity(id: string) {
    if (this.cart.has(id)) {
      let quantity: number = this.cart.get(id);
      quantity++;
      this.cart.set(id, quantity);
    }
  }

  decrementItemQuantity(id: string) {
    if (this.cart.has(id)) {
      let quantity: number = this.cart.get(id);
      if (quantity === 1) {
        this.removeItemFromCart(id);
      } else {
        quantity--;
        this.cart.set(id, quantity);
      }
    }
  }

  getSubtotal(productList: ProductList): number {
    let subTotal = 0;
    this.cart.forEach((value, key) => {
      const product: Product = productList.getProductById(key);
      subTotal += Number(product.price) * value;
    });
    return subTotal;
  }
}
