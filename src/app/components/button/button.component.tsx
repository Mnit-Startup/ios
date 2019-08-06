import _ from 'lodash';
import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ButtonComponentProps} from './button.component.props';
import {buttonStyles as styles} from './button.component.style-impl';
import {ButtonType} from './button.component.type';

export class Button extends React.Component<ButtonComponentProps> {

    getSubmitButtonStyle(type: string) {
      if (type === ButtonType.PRIMARY) {
        return styles.buttonPrimary;
      } else if (type === ButtonType.DANGER) {
        return styles.buttonDanger;
      } else {
        return styles.buttonSecondary;
      }
    }

    getSubmitButtonTextStyle(type: string) {
        if (type === ButtonType.PRIMARY) {
          return styles.buttonPrimaryText;
        } else if (type === ButtonType.DANGER) {
          return styles.buttonDangerText;
        } else {
          return styles.buttonSecondaryText;
        }
      }


  render() {
    const {text, style, ...props} = this.props;
    let buttonStyle = this.getSubmitButtonStyle(this.props.type);
    if (this.props.disabled) {
      buttonStyle = _.assign(_.cloneDeep(buttonStyle), {
        opacity: 0.5,
      });
    }
    return (
      <TouchableOpacity style={buttonStyle} {...props}>
        <Text style={this.getSubmitButtonTextStyle(this.props.type)}>{text}</Text>
        {
          this.props.showActivityIndicator &&
          <ActivityIndicator size='small' color='#fffff' />
        }
      </TouchableOpacity>
    );
  }
}
