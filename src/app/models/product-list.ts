import _ from 'lodash';
import {Product} from './product';

export class ProductList {
  readonly products: Array<Product>;

  constructor(list: Array<any> = []) {
    this.products = [];
    _.forEach(list, (item) => {
      this.products.push(new Product(item));
    });
    this.products.sort(this.compareByName);
  }

  getProductById(id: string) {
    return _.find(this.products, (product) => product.productId === id);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.products.sort(this.compareByName);
  }

  removeProduct(id: string) {
    _.remove(this.products, (product) => product.productId === id);
  }

  updateProduct(editedProduct: Product) {
    const index = _.findIndex(this.products, (product) => product.productId === editedProduct.productId);
    if (index !== -1) {
      this.products.splice(index, 1, editedProduct);
    }
    this.products.sort(this.compareByName);
  }

  compareByName(productA: Product, productB: Product) {
    const productNameA = productA.name.toUpperCase();
    const productNameB = productB.name.toUpperCase();
    let comparison = 0;
    if (productNameA > productNameB) {
      comparison = 1;
    } else if (productNameA < productNameB) {
      comparison = -1;
    }
    return comparison;
  }
}
