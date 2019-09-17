import _ from 'lodash';

export class User {
  readonly accountId: string;
  readonly accessToken: string;
  readonly role: string;
  readonly merchantId?: string;
  readonly storeId?: string;

  constructor(user: any) {
    this.accountId = user.account_id;
    this.accessToken = user.access_token;
    this.role = user.role;
    this.merchantId = _.get(user, 'merchant_id', '');
    this.storeId = _.get(user, 'store_id', '');
  }

  isUserLoggedIn() {
    return !_.isEmpty(this.accessToken);
  }

  getAccountId() {
    return this.accountId;
  }

  getRole() {
    return this.role;
  }
}
