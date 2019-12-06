import React from 'react';
import _ from 'lodash';
import {View, Text, TextInput} from 'react-native';
import {NumberInputProps} from './number-input.component.props';
import {NumberInputState} from './number-input.component.state';
import {numberInputStyle} from './number-input.component.style-impl';

export class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
  constructor(props: NumberInputProps) {
    super(props);

    this.state = {
      value: 0,
      valid: true,
      hasTouched: false,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }

  componentWillReceiveProps(nextProps: NumberInputProps) {
    if (!_.isNil(nextProps.defaultValue)) {
      const value = nextProps.defaultValue;
      this.validateAndSetState(value);
    }
  }

  onBlur() {
    this.setState({
      hasTouched: true,
    });
  }

  translate(key: string, options?: any) {
    return this.props.translate(key, options);
  }

  validateAndSetState(value: Number): boolean {
    let isValid = false;
    if (value !== NaN && value >= 0) {
      isValid = true;
    }
    this.setState({
      value: value,
      valid: isValid,
      hasTouched: true,
    });
    return isValid;
  }

  onNumberChange(text: string) {
    const value = Number(Number(text).toFixed(2));
    const isValid = this.validateAndSetState(value);
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(value, isValid);
    }
  }

  render() {
    let defaultValue = '';
    if (!_.isNil(this.props.defaultValue)) {
      defaultValue = String(this.props.defaultValue);
    }
    return (
      <View style={this.props.style.containerStyle}>
        <View style={numberInputStyle.inputLabelContainer}>
          <Text style={[numberInputStyle.inputLabelText, this.props.style.labelStyle]}>{this.props.label}</Text>
        </View>
        <View>
          <TextInput
          autoFocus={this.props.autoFocus}
          editable={this.props.editable}
          style={this.props.style.inputStyle}
          keyboardType='numeric'
          autoCorrect={false}
          onChangeText={this.onNumberChange}
          onBlur={this.onBlur}
          defaultValue={defaultValue}>
          </TextInput>
        </View>
        {!this.state.valid && this.props.onceSubmitted && this.props.required &&
        <View style={numberInputStyle.errorLabelContainer}>
          <Text style={this.props.style.errorStyle}>{this.translate('NUMBER_INPUT_COMPONENT.INVALID_INPUT', {
            field: this.props.label.toLowerCase(),
          })}</Text>
        </View>}
      </View>
    );
  }
}
