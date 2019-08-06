import _ from 'lodash';

export class WalletBalance {
  readonly symbol: string;
  readonly balance: number;
  readonly description: string;
  readonly updatedAt: Date;

  constructor(item: any) {
    this.balance = parseFloat(_.get(item, 'balance', 0));
    this.description = _.get(item, 'description', '');
    this.symbol = _.get(item, 'symbol', '');
    this.updatedAt = new Date(_.get(item, 'updated_at'));
  }

  isKadima () {
    return this.symbol.toLowerCase() === 'kdm';
  }
}
