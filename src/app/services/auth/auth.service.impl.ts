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
      return new ServiceResponse(undefined, AuthServiceImpl.parseError(e));
    }
  }

}
