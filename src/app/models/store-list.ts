import _ from 'lodash';
import {Store} from './store';

export class StoreList {
  readonly stores: Array<Store>;

  constructor(list: Array<any>= []) {
    this.stores = [];
    _.forEach(list, (item) => {
      this.stores.push(new Store(item));
    });
    this.stores.sort(this.compareByName);
  }

  hasStores() {
    return this.stores.length > 0;
  }

  addNewStore(newStore: Store) {
    this.stores.push(newStore);
    this.stores.sort(this.compareByName);
  }

  compareByName(storeA: Store, storeB: Store) {
    const storeNameA = storeA.name.toUpperCase();
    const storeNameB = storeB.name.toUpperCase();
    let comparison = 0;
    if (storeNameA > storeNameA) {
      comparison = 1;
    } else if (storeNameA < storeNameB) {
      comparison = -1;
    }
    return comparison;
  }
}
