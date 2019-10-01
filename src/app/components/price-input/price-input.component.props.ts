import {InputProps} from '../shared/input-props';

export interface PriceInputProps extends InputProps {
  onceSubmitted: boolean;
  label: string;
  required: boolean;
  defaultValue?: string;
}
