import {ServiceResponse} from '../service.response';
import {Store} from '../../models';

export interface StoreService {
  createStore(
    store: Store,
  ): Promise<ServiceResponse<Store>>;
}
