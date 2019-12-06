import {ServiceResponse} from '../service.response';
import {Transaction} from '../../models';

export interface TransactionService {
  getDetails(
      transactionId: string,
  ): Promise<ServiceResponse<Transaction>>;

  pay(
    transactionId: string,
    paymentMode: string,
  ): Promise<ServiceResponse<Transaction>>;
}
