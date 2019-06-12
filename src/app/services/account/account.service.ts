import {ServiceResponse} from '../service.response';
import {UserAccount} from '../../models';
import {WalletBalanceList} from '../../models/wallet-balance-list';

export interface AccountService {
  getDetails(
      accountId: string,
  ): Promise<ServiceResponse<UserAccount>>;

  getWalletBalance(
    accountId: string,
    walletAddress: string,
  ): Promise<ServiceResponse<WalletBalanceList>>;
}
