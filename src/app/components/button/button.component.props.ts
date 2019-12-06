import {TouchableOpacityProps} from 'react-native';

export interface ButtonComponentProps extends TouchableOpacityProps {
  text: string;
  type: string;
  size?: string;
  showActivityIndicator?: boolean;
}
