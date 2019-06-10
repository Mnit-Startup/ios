import {ComponentState} from '../../component.state';
export interface LoginScreenState extends ComponentState {
  email: {
    address: string,
    valid: boolean,
  };
  password: {
    value: string,
    valid: boolean,
  };
  onceSubmitted: boolean;
}
