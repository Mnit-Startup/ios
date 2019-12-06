import {ComponentState} from '../../../../component.state';
import {Orientation} from '../../../../models/device-orientation';

export interface CashChangeScreenState extends ComponentState {
 storeLogo: string;
 loadingLogo: boolean;
 onceSubmitted: boolean;
 orientation: Orientation;
}
