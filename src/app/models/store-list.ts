import _ from 'lodash';
import {Store} from './store';

export class StoreList {
  readonly stores: Array<Store>;

  constructor(list: any) {
    this.stores = [];
    _.forEach(list, (item) => {
      this.stores.push(new Store(item));
    });
  }
}
