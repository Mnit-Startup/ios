import {InputProps} from '../shared/input-props';

export interface PasswordInputProps extends InputProps {
  label: string;
  onceSubmitted: boolean;
}
