import {ComponentState} from '../../../component.state';
import {WalletBalance} from '../../../models/wallet-balance';

export interface DashboardScreenState extends ComponentState {
  balance?: WalletBalance;
  navigationState: {
    index: number;
    routes: Array<any>;
  };
}
