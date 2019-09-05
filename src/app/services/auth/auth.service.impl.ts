import _ from 'lodash';
import {AsyncStorage} from 'react-native';
import {AuthService} from './auth.service';
import Axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';
import {ServiceResponse} from '../service.response';
import {User} from '../../models';

export class AuthServiceImpl implements AuthService {
  static readonly TOKEN_KEY = 'auth_token';
  static readonly ACCOUNT_ID = 'account_id';
  static readonly USER_ROLE = 'user_role';

  protected static parseError(response: AxiosResponse): string {
    return _.get(response, 'response.data.error', '');
  }

  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<User>> {
    try {
      const response = await Axios.create().post(`${Config.API_ENDPOINT}/accounts/login`, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await AsyncStorage.setItem(AuthServiceImpl.ACCOUNT_ID, response.data.account_id);
      await AsyncStorage.setItem(AuthServiceImpl.TOKEN_KEY, response.data.access_token);
      await AsyncStorage.setItem(AuthServiceImpl.USER_ROLE, response.data.role);
      return new ServiceResponse(new User({
        account_id: response.data.account_id,
        access_token: response.data.access_token,
        role: response.data.role,
      }));
    } catch (e) {
      return new ServiceResponse<User>(undefined, AuthServiceImpl.parseError(e));
    }
  }

  async getUser(): Promise<ServiceResponse<User>> {
    const accountId = await AsyncStorage.getItem(AuthServiceImpl.ACCOUNT_ID);
    const token = await AsyncStorage.getItem(AuthServiceImpl.TOKEN_KEY);
    const role = await AsyncStorage.getItem(AuthServiceImpl.USER_ROLE);
    return new ServiceResponse(new User({
      account_id: accountId,
      access_token: token,
      role: role,
    }));
  }

  async logout(): Promise<ServiceResponse<void>> {
    await AsyncStorage.clear();
    return new ServiceResponse();
  }

  async employeeLogin(
    empNumber: string,
    storeIdentifier: string,
    pin: string,
  ): Promise<ServiceResponse<User>> {
    const loginEntries = {
      emp_number: empNumber,
      store_identifier: storeIdentifier,
      pin,
    };
    try {
      const response = await Axios.create().post(`${Config.API_ENDPOINT}/accounts/employee-login`, loginEntries,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      await AsyncStorage.setItem(AuthServiceImpl.ACCOUNT_ID, response.data.account_id);
      await AsyncStorage.setItem(AuthServiceImpl.TOKEN_KEY, response.data.access_token);
      await AsyncStorage.setItem(AuthServiceImpl.USER_ROLE, response.data.role);
      return new ServiceResponse(new User({
        account_id: response.data.account_id,
        access_token: response.data.access_token,
        role: response.data.role,
      }));
    } catch (e) {
      return new ServiceResponse<User>(undefined, AuthServiceImpl.parseError(e));
    }
  }
}
