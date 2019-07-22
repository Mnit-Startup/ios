import {StoreService} from './store.service';
import {Store} from '../../models';
import {ApiServiceImpl} from '../api.service.impl';
import {ServiceResponse} from '../service.response';
import {AuthService} from '..';

export class StoreServiceImpl extends ApiServiceImpl implements StoreService {

  constructor(authService: AuthService) {
    super(authService);
  }
  async createStore(store: Store): Promise<ServiceResponse<Store>>  {
    try {
      const storeEntries = {
        name: store.name,
        phone: store.phone,
        email: store.email,
        street_address: store.streetAddress,
        street_address_2: store.streetAddress2,
        city: store.city,
        state: store.state,
        zipcode: store.zipcode,
        merchant_id_ein: store.merchantIdEin,
        store_profile: store.storeProfile,
      };
      const userId = await this.getUserAccountId();
      const response = await this.post(`/account/${userId}/store`, storeEntries);
      return new ServiceResponse(new Store({
        name: response.data.name,
        phone: response.data.contact.phone,
        streetAddress: response.data.address.street_address,
        streetAddress2: response.data.address.street_address_2,
        email: response.data.contact.email,
        merchantIdEin: response.data.merchant_id_ein,
        city: response.data.address.city,
        state: response.data.address.state,
        storeProfile: response.data.store_profile,
        zipcode: response.data.address.zipcode,
      }));
    } catch (e) {
      return new ServiceResponse<Store>(undefined, ApiServiceImpl.parseError(e));
    }
  }
}
