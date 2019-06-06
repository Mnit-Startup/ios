import _ from 'lodash';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {PasswordInputProps} from './password-input.component.props';
import {PasswordInputState} from './password-input.component.state';
import {passwordInputStyle} from './password-input.component.style-impl';

export class PasswordInput extends React.Component<PasswordInputProps, PasswordInputState> {
  constructor(props: PasswordInputProps) {
    super(props);

    this.state = {
      value: '',
      valid: false,
      hasTouched: false,
      secureTextEntry: true,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onBlur() {
    this.setState({
      hasTouched: true,
    });
  }

  onChangeText(password: string) {
    const isValid = !_.isEmpty(password);

    this.setState({
      value: password,
      valid: isValid,
      hasTouched: true,
    });

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(password, isValid);
    }
  }

  translate(key: string) {
    return this.props.translate(key, null);
  }

  render() {
    return (
      <View>
        <View style={passwordInputStyle.inputLabelContainer}>
          <Text style={passwordInputStyle.inputLabelText}>{this.props.label}</Text>
        </View>
        <View style={this.props.style.containerStyle}>
          <View style={passwordInputStyle.input}>
              <TextInput
                autoFocus={this.props.autoFocus}
                editable={this.props.editable}
                style={this.props.style.inputStyle}
                secureTextEntry={this.state.secureTextEntry}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect={false}
                onBlur={this.onBlur}
                onChangeText={this.onChangeText}
              />
          </View>
        </View>
        {!this.state.valid && this.props.onceSubmitted &&
          <View style={passwordInputStyle.errorLabelContainer}>
            <Text style={this.props.style.errorStyle}>{this.translate('PASSWORD_INPUT_COMPONENT.INVALID_PASSWORD')}</Text>
          </View>
        }
      </View>
    );
  }
}
