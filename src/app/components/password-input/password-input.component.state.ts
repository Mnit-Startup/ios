import {InputState} from '../shared/input-state';

export interface PasswordInputState extends InputState<string> {
  secureTextEntry: boolean;
}
