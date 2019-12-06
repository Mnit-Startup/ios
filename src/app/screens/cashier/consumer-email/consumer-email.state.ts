import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';

export interface ConsumerEmailScreenState extends ComponentState {
 email: {
  address: string,
  valid: boolean,
 };
 receipt: string;
 storeLogo: string;
 loadingLogo: boolean;
 onceSubmitted: boolean;
 orientation: Orientation;
}
