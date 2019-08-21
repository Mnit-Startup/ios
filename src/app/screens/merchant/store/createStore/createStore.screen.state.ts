import {ComponentState} from '../../../../component.state';
import {Orientation} from '../../../../models/device-orientation';

export interface CreateStoreScreenState extends ComponentState {
  storeName: {
    value: string,
    valid: boolean,
  };
  phone: {
    value: string,
    valid: boolean,
  };
  streetAddress: {
    value: string,
    valid: boolean,
  };
  streetAddress2: {
    value: string,
    valid: boolean,
  };
  city: {
    value: string,
    valid: boolean,
  };
  email: {
    address: string,
    valid: boolean,
  };
  merchantId: {
    value: string,
    valid: boolean,
  };
  stateDropdown: {
    visible: boolean;
    picked: string;
  };
  zip: {
    value: string;
    valid:  boolean;
  };
  storeProfileDropdown: {
    visible: boolean;
    picked: string;
  };
  storeIdentifier: {
    value: string,
    valid: boolean,
  };
  orientation: Orientation;
  onceSubmitted: boolean;
}
