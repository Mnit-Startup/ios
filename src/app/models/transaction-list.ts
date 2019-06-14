import _ from 'lodash';
import {Transaction} from './transaction';

export class TransactionList {
  readonly transactions: Array<Transaction>;

  constructor(list: any) {
    this.transactions = [];
    _.forEach(list, (item) => {
      this.transactions.push(new Transaction(item));
    });
  }
}
