import {ComponentState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';

export interface QRCodeScreenState extends ComponentState {
  orientation: Orientation;
}
