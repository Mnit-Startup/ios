import _ from 'lodash';
import {AccountService} from './account.service';
import {ApiServiceImpl} from '../api.service.impl';
import {AuthService} from '..';
import {ServiceResponse} from '../service.response';
import {UserAccount} from '../../models';
import {WalletBalanceList} from '../../models/wallet-balance-list';

export class AccountServiceImpl extends ApiServiceImpl implements AccountService {

  constructor(authService: AuthService) {
    super(authService);
  }

  async getDetails(accountId: string): Promise<ServiceResponse<UserAccount>> {
    try {
      const response = await this.get(`/account/${accountId}`);
      const userAccount = new UserAccount(response.data);
      return new ServiceResponse<UserAccount>(userAccount);
    } catch (e) {
      return new ServiceResponse<UserAccount>(undefined, ApiServiceImpl.parseError(e));
    }
  }

  async getWalletBalance(accountId: string, walletAddress: string): Promise<ServiceResponse<WalletBalanceList>> {
    try {
      const response = await this.get(`/account/${accountId}/wallet/${walletAddress}/balance`);
      const walletBalanceList = new WalletBalanceList(response.data);
      return new ServiceResponse<WalletBalanceList>(walletBalanceList);
    } catch (e) {
      return new ServiceResponse<WalletBalanceList>(undefined, ApiServiceImpl.parseError(e));
    }
  }
}
