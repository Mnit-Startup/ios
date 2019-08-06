import {User} from '../../models';
import {ServiceResponse} from '../service.response';

export interface AuthService {

  /**
   * Logs in a user
   */
  login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<User>>;

  getUser(): Promise<ServiceResponse<User>>;

  logout(): Promise<ServiceResponse<void>>;
}
