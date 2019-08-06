import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';
import {StoreList} from '../../../models/store-list';

export interface MerchantDashboardScreenState extends ComponentState {
  storeList?: StoreList;
  orientation: Orientation;
}
