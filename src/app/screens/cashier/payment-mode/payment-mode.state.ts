import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';
import {} from '../../../models';

export interface PaymentModeScreenState extends ComponentState {
  orientation: Orientation;
}
