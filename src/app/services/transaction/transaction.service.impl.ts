import _ from 'lodash';
import {AccountService} from './account.service';
import {ApiServiceImpl} from '../api.service.impl';
import {AuthService} from '..';
import {ServiceResponse} from '../service.response';
import {Transaction} from '../../models';
import {TransactionService} from './transaction.service';

export class TransactionServiceImpl extends ApiServiceImpl implements TransactionService {

  constructor(authService: AuthService) {
    super(authService);
  }

  async getDetails(transactionId: string): Promise<ServiceResponse<Transaction>> {
    try {
      const response = await this.get(`/transaction/${transactionId}`);
      const transaction = new Transaction(response.data);
      return new ServiceResponse<Transaction>(transaction);
    } catch (e) {
      return new ServiceResponse<Transaction>(undefined, ApiServiceImpl.parseError(e));
    }
  }

  async pay(transactionId: string, paymentMode: string): Promise<ServiceResponse<Transaction>> {
    try {
      const mode_of_payment = paymentMode;
      const response = await this.patch(`/transaction/${transactionId}/pay`, {mode_of_payment});
      const transaction = new Transaction(response.data);
      return new ServiceResponse<Transaction>(transaction);
    } catch (e) {
      return new ServiceResponse<Transaction>(undefined, ApiServiceImpl.parseError(e));
    }
  }
}
