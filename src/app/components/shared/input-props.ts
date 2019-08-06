import {ViewStyle, TextStyle} from 'react-native';
import {MemoizedFunction} from 'lodash';

export interface InputProps {
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
  onChange?: ((email: string, isValid: boolean) => void);
}
