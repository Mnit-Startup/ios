export class Store {
  readonly name: string;
  readonly phone: string;
  readonly streetAddress: string;
  readonly streetAddress2: string;
  readonly email: string;
  readonly merchantIdEin: string;
  readonly city: string;
  readonly state: string;
  readonly storeProfile: string;
  readonly zipcode: string;

  constructor(store: any) {
    this.name = store.name;
    this.phone = store.phone;
    this.streetAddress = store.streetAddress;
    this.streetAddress2 = store.streetAddress2;
    this.email = store.email;
    this.merchantIdEin = store.merchantIdEin;
    this.city = store.city;
    this.state = store.state;
    this.storeProfile = store.storeProfile;
    this.zipcode = store.zipcode;
  }
}
