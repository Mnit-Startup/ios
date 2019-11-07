import _ from 'lodash';

export class Product {
  readonly productId?: string;
  readonly name: string;
  readonly price: Number;
  readonly skuNumber: string;
  readonly taxable: boolean;
  readonly image?: string;
  readonly active: boolean;
  readonly tax: Number;

  constructor(item: any) {
    this.productId = _.get(item, 'id', '');
    this.name = _.get(item, 'name', '');
    this.price = _.get(item, 'price', 0);
    this.skuNumber = _.get(item, 'sku_number', '');
    this.taxable = _.get(item, 'taxable', '');
    this.image = _.get(item, 'image', '');
    this.active = _.get(item, 'active', false);
    this.tax = _.get(item, 'tax', 0);
  }
}
