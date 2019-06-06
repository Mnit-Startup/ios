import {ServiceResponse} from '../service.response';

export interface AccountService {
  /**
   * Signs up a Consumer
   */
  createConusmerAccount(
    email: string,
    password: string,
  ): Promise<ServiceResponse<void>>;

  /**
   * Signs up a Merchant
   */
  createMerchantAccount(
    email: string,
    password: string,
  ): Promise<ServiceResponse<void>>;

}
