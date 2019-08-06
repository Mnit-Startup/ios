import _ from 'lodash';
import {WalletBalance} from './wallet-balance';

export class WalletBalanceList {
  readonly balances: Array<WalletBalance>;

  constructor(list: any) {
    this.balances = [];
    _.forEach(list, (item) => {
      this.balances.push(new WalletBalance(item));
    });
  }
}
