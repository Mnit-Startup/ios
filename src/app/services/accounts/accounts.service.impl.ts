import _ from 'lodash';
import {AccountsService} from './accounts.service';
import Axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
import {ServiceResponse} from '../service.response';

export class AccountsServiceImpl implements AccountsService {

  protected static parseError(response: AxiosResponse): string {
    return _.get(response, 'response.data.error', '');
  }

  async createConusmerAccount(
    email: string,
    password: string,
  ):  Promise<ServiceResponse<boolean>> {
    try {
      const response = await Axios.create().post(`${Config.API_ENDPOINT}/accounts/register/consumer`, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return new ServiceResponse(true);
    } catch (e) {
      return new ServiceResponse(false, AccountsServiceImpl.parseError(e));
    }
  }

  async createMerchantAccount(
    email: string,
    password: string,
  ):  Promise<ServiceResponse<boolean>> {
    try {
      const response = await Axios.create().post(`${Config.API_ENDPOINT}/accounts/register/merchant`, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return new ServiceResponse(true);
    } catch (e) {
      return new ServiceResponse(false, AccountsServiceImpl.parseError(e));
    }
  }

}
