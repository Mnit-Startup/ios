import _ from 'lodash';

export class UserAccount {
  readonly accountId: string;
  readonly role: string;
  readonly walletAddress: string;

  constructor(account: any) {
    this.accountId = account.id;
    this.role = account.role;
    this.walletAddress = _.get(account, 'blockchain.wallet.add');
  }

  getAccountId() {
    return this.accountId;
  }

  getRole() {
    return this.role;
  }

  getWalletAddress() {
    return this.walletAddress;
  }
}
