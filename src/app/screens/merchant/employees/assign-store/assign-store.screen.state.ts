import {ComponentState} from '../../../../component.state';
import {Orientation} from '../../../../models/device-orientation';
import {StoreList} from '../../../../models';

export interface AssignStoreScreenState extends ComponentState {
  storeList?: StoreList;
  orientation: Orientation;
  assignedStores: Array<string>;
  addedStores: Array<string>;
  removedStores: Array<string>;
}
