import {ComponentState} from '../../../../component.state';
import {Orientation} from '../../../../models/device-orientation';

export interface AmountTenderedScreenState extends ComponentState {
 amountTendered: {
   value: number;
   valid: boolean;
 };
 change: number;
 transactionAmount: number;
 storeLogo: string;
 loadingLogo: boolean;
 onceSubmitted: boolean;
 orientation: Orientation;
}
