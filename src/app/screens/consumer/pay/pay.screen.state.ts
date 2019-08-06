import {ComponentState, ComponentViewState} from '../../../component.state';
import {WalletBalance} from '../../../models/wallet-balance';
import {Transaction} from '../../../models';

export interface PayScreenState extends ComponentState {
  balancesState: ComponentViewState;
  transactionState: ComponentViewState;
  balances?: Array<WalletBalance>;
  transaction?: Transaction;
}
