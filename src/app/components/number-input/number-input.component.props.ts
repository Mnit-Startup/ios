import {ViewStyle, TextStyle} from 'react-native';
import {MemoizedFunction} from 'lodash';

export interface NumberInputProps {
  style: {
    containerStyle: ViewStyle,
    labelStyle: TextStyle,
    forgotStyle: ViewStyle,
    inputStyle: TextStyle,
    errorStyle: TextStyle,
  };
  editable: boolean;
  autoFocus: boolean;
  translate: ((key: any, config: any) => string) & MemoizedFunction;
  onChange?: ((value: number, isValid: boolean) => void);
  onceSubmitted: boolean;
  label: string;
  required: boolean;
  defaultValue?: Number;
}
