import React from 'react';
import _ from 'lodash';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {stringInputStyle} from './string-input.component.style-impl';
import {StringInputProps} from './string-input.component.props';
import {StringInputState} from './string-input.component.state';

export class StringInput extends React.Component<StringInputProps, StringInputState> {
  constructor(props: StringInputProps) {
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

  translate(key: string, options?: any) {
    return this.props.translate(key, options);
  }

  render() {
    return (
      <View style={this.props.style.containerStyle}>
        <View style={stringInputStyle.inputLabelContainer}>
          <Text style={stringInputStyle.inputLabelText}>{this.props.label}</Text>
        </View>
        <View>
          <TextInput
          autoFocus={this.props.autoFocus}
          editable={this.props.editable}
          style={this.props.style.inputStyle}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}>
          </TextInput>
        </View>
        {!this.state.valid && this.props.onceSubmitted && this.props.required &&
        <View style={stringInputStyle.errorLabelContainer}>
        <Text style={this.props.style.errorStyle}>
        {this.translate('STRING_INPUT_COMPONENT.INVALID_INPUT', {
          field: this.props.label.toLowerCase(),
        })}</Text>
      </View>
      }
      </View>
    );
  }
}
// `Please specify a valid ${this.props.label.toLowerCase()} to continue`
