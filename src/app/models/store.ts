import _ from 'lodash';

export class Store {
  readonly storeId?: string;
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

  constructor(item: any) {
    this.storeId = _.get(item, 'id', '');
    this.name = _.get(item, 'name', '');
    this.phone = _.get(item, 'contact.phone', '');
    this.streetAddress =  _.get(item, 'address.street_address', '');
    this.streetAddress2 = _.get(item, 'address.street_address_2', '');
    this.email = _.get(item, 'contact.email', '');
    this.merchantIdEin = _.get(item, 'merchant_id_ein', '');
    this.city = _.get(item, 'address.city', '');
    this.state = _.get(item, 'address.state', '');
    this.storeProfile = _.get(item, 'store_profile', '');
    this.zipcode = _.get(item, 'zipcode', '');
  }

}
