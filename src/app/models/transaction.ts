import _ from 'lodash';

export class Transaction {
  readonly id: string;
  readonly amount: number;
  readonly paidOn: Date;
  readonly merchantName: string;

  constructor(item: any) {
    this.id = _.get(item, 'id', '');
    this.amount = parseFloat(_.get(item, 'amount', 0));
    this.paidOn = new Date(_.get(item, 'paid_on'));
    this.merchantName = _.get(item, 'store.name', '');
  }
}
