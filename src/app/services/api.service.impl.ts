import _ from 'lodash';
import Config from 'react-native-config';
import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios';
import {AuthService} from './auth/auth.service';
import {ApiService} from './api.service';

type LogTypes = 'request' | 'response' | 'error';

export class ApiServiceImpl implements ApiService {
  static readonly API_REQUEST_TIMEOUT = 15000;
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  protected static parseError(response: AxiosResponse): string {
    return _.get(response, 'response.data.error', '');
  }

  private logger(data: any, type: LogTypes) {
    if (__DEV__) {
      const formats = {
        request: {
          title: 'REQUEST',
          background: '#1565C0',
        },
        response: {
          title: 'RESPONSE',
          background: '#43A047',
        },
        error: {
          title: 'ERROR',
          background: '#f44336',
        },
      };
      console.log(`%c ${formats[type].title} `, `background: ${formats[type].background}; color: #fff;`, data);
    }
  }

  private async getAxiosInstance(): Promise<AxiosInstance> {
    const headers: any = {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
    };

    const userResponse = await this.authService.getUser();

    if (userResponse.data
      && userResponse.data.isUserLoggedIn()) {
        headers['Authorization'] = `Bearer ${userResponse.data.accessToken}`;
    }
    const instance = axios.create({
      baseURL: `${Config.API_ENDPOINT}`,
      timeout: ApiServiceImpl.API_REQUEST_TIMEOUT,
      headers: headers,
    });

    instance.interceptors.request.use((request) => {
      this.logger(request, 'request');
      return request;
    });

    instance.interceptors.response.use(
      (response) => {
        this.logger(response, 'response');
        return response;
      },
      (error) => {
        this.logger(error.response, 'error');
        return Promise.reject(error);
      },
    );

    return instance;
  }

  protected async getUserAccountId(): Promise<string> {
    const userResponse = await this.authService.getUser();
    if (userResponse.data
      && userResponse.data.isUserLoggedIn()) {
      return userResponse.data.getAccountId();
    }

    return '';
  }

  protected async get(url: string): Promise<AxiosResponse> {
    const api = await this.getAxiosInstance();
    return await api.get(url);
  }

  protected async post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const api = await this.getAxiosInstance();
    return await api.post(url, data, config);
  }

  protected async patch(url: string, data: any): Promise<AxiosResponse> {
    const api = await this.getAxiosInstance();
    return await api.patch(url, data);
  }

  protected async put(url: string, data: any): Promise<AxiosResponse> {
    const api = await this.getAxiosInstance();
    return await api.put(url, data);
  }

  protected async delete(url: string, data: any): Promise<AxiosResponse> {
    const api = await this.getAxiosInstance();
    return await api.delete(url, data);
  }
}
