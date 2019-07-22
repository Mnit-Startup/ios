import _ from 'lodash';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text, TouchableOpacity} from 'react-native';
import {emailInputStyle} from './email-input.component.style-impl';
import {EmailInputProps} from './email-input.component.props';
import {EmailInputState} from './email-input.component.state';

export class EmailInput extends React.Component<EmailInputProps, EmailInputState> {
  constructor(props: EmailInputProps) {
    super(props);

    this.state = {
      value: '',
      valid: false,
      hasTouched: false,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onBlur() {
    this.setState({
      hasTouched: true,
    });
  }

  onChangeText(email: string) {
    let isValid = false;

    // Email regex is copied from http://emailregex.com
    if (!_.isEmpty(email)
// tslint:disable-next-line: max-line-length
    && email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      isValid = true;
    }

    this.setState({
      value: email,
      valid: isValid,
      hasTouched: true,
    });

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(email, isValid);
    }
  }

  translate(key: string) {
    return this.props.translate(key, null);
  }

  render() {
    return (
      <View style={this.props.style.containerStyle}>
        <View style={emailInputStyle.inputLabelContainer}>
          <Text style={emailInputStyle.inputLabelText}>{this.translate('EMAIL_INPUT_COMPONENT.EMAIL_INPUT_TITLE')}</Text>
        </View>
        <View>
          <TextInput
            autoFocus={this.props.autoFocus}
            editable={this.props.editable}
            style={this.props.style.inputStyle}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.onChangeText}
            onBlur={this.onBlur}>
          </TextInput>
        </View>
        {!this.state.valid && this.props.onceSubmitted &&
        <View style={emailInputStyle.errorLabelContainer}>
          <Text style={this.props.style.errorStyle}>{this.translate('EMAIL_INPUT_COMPONENT.INVALID_EMAIL')}</Text>
        </View>
        }
      </View>
    );
  }
}
