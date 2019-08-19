import {ComponentState, ComponentViewState} from '../../../../../component.state';
import {Orientation} from '../../../../../models/device-orientation';

export interface CreateCashierScreenState extends ComponentState {
  cashierName: {
    value: string,
    valid: boolean,
  };
  cashierNumber: {
    value: string,
    valid: boolean,
  };
  pin: {
    value: string,
    valid: boolean,
  };
  confirmPin: {
    value: string,
    valid: boolean,
  };
  orientation: Orientation;
  onceSubmitted: boolean;
}
