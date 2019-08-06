import {ComponentState} from '../../component.state';
export interface SignUpScreenState extends ComponentState {
  email: {
    address: string,
    valid: boolean,
  };
  password: {
    value: string,
    valid: boolean,
  };
  confirmPassword: {
    value: string,
    valid: boolean,
  };
  dropdown: {
    visible: boolean;
    picked: string;
  };
  onceSubmitted: boolean;
  passwordMatch: boolean;
}
