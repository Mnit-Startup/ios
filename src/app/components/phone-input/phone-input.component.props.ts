import {InputProps} from '../shared/input-props';

export interface PhoneInputProps extends InputProps {
  onceSubmitted: boolean;
  label: string;
}
