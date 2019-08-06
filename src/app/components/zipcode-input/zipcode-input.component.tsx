import React from 'react';
import _ from 'lodash';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {zipcodeInputStyle} from './zipcode-input.component.style-impl';
import {ZipcodeInputProps} from './zipcode-input.component.props';
import {ZipcodeInputState} from './zipcode-input.component.state';

export class ZipcodeInput extends React.Component<ZipcodeInputProps, ZipcodeInputState> {
  constructor(props: ZipcodeInputProps) {
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

  onChangeText(text: string) {
    let isValid = false;
    if (!_.isEmpty(text)) {
      isValid = true;
    }

    this.setState({
      value: text,
      valid: isValid,
      hasTouched: true,
    });

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(text, isValid);
    }
  }

  translate(key: string) {
    return this.props.translate(key, null);
  }

  render() {
    return (
      <View style={this.props.style.containerStyle}>
        <View style={zipcodeInputStyle.inputLabelContainer}>
          <Text style={zipcodeInputStyle.inputLabelText}>{this.props.label}</Text>
        </View>
        <View>
          <TextInput
          autoFocus={this.props.autoFocus}
          editable={this.props.editable}
          style={this.props.style.inputStyle}
          keyboardType='numeric'
          autoCorrect={false}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}>
          </TextInput>
        </View>
        {!this.state.valid && this.props.onceSubmitted &&
        <View style={zipcodeInputStyle.errorLabelContainer}>
        <Text style={this.props.style.errorStyle}>{this.translate('ZIPCODE_INPUT_COMPONENT.INVALID_ZIPCODE')}</Text>
      </View>
      }
      </View>
    );
  }
}
