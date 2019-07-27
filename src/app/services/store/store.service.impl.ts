import _ from 'lodash';
import {StoreService} from './store.service';
import {Store} from '../../models';
import {StoreList} from '../../models/store-list';
import {ApiServiceImpl} from '../api.service.impl';
import {ServiceResponse} from '../service.response';
import {AuthService} from '..';

export class StoreServiceImpl extends ApiServiceImpl implements StoreService {

  constructor(authService: AuthService) {
    super(authService);
  }

  async getStores(
    ): Promise<ServiceResponse<StoreList>> {
      try {
        const userId = await this.getUserAccountId();
        const response = await this.get(`/account/${userId}/stores`);
        const storesList = new StoreList(response.data);
        return new ServiceResponse<StoreList>(storesList);
      } catch (e) {
        return new ServiceResponse<StoreList>(undefined, ApiServiceImpl.parseError(e));
      }
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
      return new ServiceResponse(new Store(response.data));
    } catch (e) {
      return new ServiceResponse<Store>(undefined, ApiServiceImpl.parseError(e));
    }
  }
}
