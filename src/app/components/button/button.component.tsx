import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ButtonComponentProps} from './button.component.props';
import {buttonStyles as styles} from './button.component.style-impl';
import {ButtonType} from './button.component.type';

export class Button extends React.Component<ButtonComponentProps> {

    getSubmitButtonStyle(type: string) {
      if (type === ButtonType.PRIMARY) {
        return styles.buttonPrimary;
      } else {
        return styles.buttonSecondary;
      }
    }

    getSubmitButtonTextStyle(type: string) {
        if (type === ButtonType.PRIMARY) {
          return styles.buttonPrimaryText;
        } else {
          return styles.buttonSecondaryText;
        }
      }


  render() {
    const {text, style, ...props} = this.props;
    return (
      <TouchableOpacity style={this.getSubmitButtonStyle(this.props.type)} {...props}>
        <Text style={this.getSubmitButtonTextStyle(this.props.type)}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
