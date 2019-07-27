import {ServiceResponse} from '../service.response';
import {Store} from '../../models';
import {StoreList} from '../../models/store-list';
export interface StoreService {
  createStore(
    store: Store,
  ): Promise<ServiceResponse<Store>>;
  getStores(
  ): Promise<ServiceResponse<StoreList>>;
}
