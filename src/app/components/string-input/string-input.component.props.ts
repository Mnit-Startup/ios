import {InputProps} from '../shared/input-props';

export interface StringInputProps extends InputProps {
  onceSubmitted: boolean;
  label: string;
  required: boolean;
}
