import _ from 'lodash';
import {AccountService} from './account.service';
import Axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
import {ServiceResponse} from '../service.response';

export class AccountServiceImpl implements AccountService {

  protected static parseError(response: AxiosResponse): string {
    return _.get(response, 'response.data.errors[0].msg', '');
  }

  async createConusmerAccount(
    email: string,
    password: string,
  ):  Promise<ServiceResponse<void>> {
    try {
      const response = await Axios.create().post(`${Config.API_ENDPOINT}/accounts/register/consumer`, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return new ServiceResponse();
    } catch (e) {
      return new ServiceResponse(undefined, AccountServiceImpl.parseError(e));
    }
  }

  async createMerchantAccount(
    email: string,
    password: string,
  ):  Promise<ServiceResponse<void>> {
    try {
      const response = await Axios.create().post(`${Config.API_ENDPOINT}/accounts/register/merchant`, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return new ServiceResponse();
    } catch (e) {
      return new ServiceResponse(undefined, AccountServiceImpl.parseError(e));
    }
  }

}
