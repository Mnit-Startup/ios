import _ from 'lodash';

export class Product {
  readonly productId?: string;
  readonly name: string;
  readonly price: string;
  readonly skuNumber: string;
  readonly taxable: boolean;
  readonly image?: string;
  readonly active: boolean;

  constructor(item: any) {
    this.productId = _.get(item, 'id', '');
    this.name = _.get(item, 'name', '');
    this.price = _.get(item, 'price', '');
    this.skuNumber = _.get(item, 'sku_number', '');
    this.taxable = _.get(item, 'taxable', '');
    this.image = _.get(item, 'image', '');
    this.active = _.get(item, 'active', false);
  }
}
