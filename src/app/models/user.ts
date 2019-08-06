import _ from 'lodash';

export class User {
  readonly accountId: string;
  readonly accessToken: string;
  readonly role: string;

  constructor(user: any) {
    this.accountId = user.account_id;
    this.accessToken = user.access_token;
    this.role = user.role;
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
