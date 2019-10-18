import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';

export interface QRCodeScreenState extends ComponentState {
  storeLogo: string;
  loadingLogo: boolean;
  orientation: Orientation;
}
