import {ServiceResponse} from '../service.response';

export interface AccountsService {
  /**
   * Signs up a Consumer
   */
  createConusmerAccount(
    email: string,
    password: string,
  ): Promise<ServiceResponse<boolean>>;

  /**
   * Signs up a Merchant
   */
  createMerchantAccount(
    email: string,
    password: string,
  ): Promise<ServiceResponse<boolean>>;

}
