export class User {
  readonly accountId: string;
  readonly accessToken: string;
  readonly role: string;

  constructor(user: any) {
    this.accountId = user.account_id;
    this.accessToken = user.access_token;
    this.role = user.role;
  }
}
