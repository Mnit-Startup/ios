import _ from 'lodash';

export class Transaction {
  readonly amount: number;
  readonly paidOn: Date;
  readonly merchantName: string;

  constructor(item: any) {
    this.amount = parseFloat(_.get(item, 'amount', 0));
    this.paidOn = new Date(_.get(item, 'paid_on'));
    this.merchantName = _.get(item, 'store.name', '');
  }
}
