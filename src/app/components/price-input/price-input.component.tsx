import React from 'react';
import _ from 'lodash';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {priceInputStyle} from './price-input.component.style-impl';
import {PriceInputProps} from './price-input.component.props';
import {PriceInputState} from './price-input.component.state';

export class PriceInput extends React.Component<PriceInputProps, PriceInputState> {

  // regex for price to be upto 2 decimals
  // valid: 12, 12.0, 12.04
  // invalid: 12., 12.232
  static readonly PRICE_FORMAT: RegExp = /^(?:\d*\.\d{1,2}|\d+)$/;

  constructor(props: PriceInputProps) {
    super(props);

    this.state = {
      value: '',
      valid: false,
      hasTouched: false,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentWillReceiveProps(nextProps: PriceInputProps) {
    if (!_.isNil(nextProps.defaultValue)) {
      const price = nextProps.defaultValue;
      this.validateAndSetState(price);
    }
  }

  onBlur() {
    this.setState({
      hasTouched: true,
    });
  }

  validateAndSetState(price: string): boolean {
    let isValid = false;
    if (!_.isEmpty(price) && Number(price)
    && price.match(PriceInput.PRICE_FORMAT)) {
      isValid = true;
    }

    this.setState({
      value: price,
      valid: isValid,
      hasTouched: true,
    });
    return isValid;
  }

  onChangeText(price: string) {
    const isValid = this.validateAndSetState(price);

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(price, isValid);
    }
  }

  translate(key: string, options?: any) {
    return this.props.translate(key, options);
  }

  render() {
    return (
      <View style={this.props.style.containerStyle}>
        <View style={priceInputStyle.inputLabelContainer}>
          <Text style={priceInputStyle.inputLabelText}>{this.props.label}</Text>
        </View>
        <View>
          <TextInput
          autoFocus={this.props.autoFocus}
          editable={this.props.editable}
          style={this.props.style.inputStyle}
          keyboardType='numeric'
          autoCorrect={false}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
          defaultValue={this.props.defaultValue}>
          </TextInput>
        </View>
        {!this.state.valid && this.props.onceSubmitted && this.props.required &&
        <View style={priceInputStyle.errorLabelContainer}>
        <Text style={this.props.style.errorStyle}>{this.translate('NUMBER_INPUT_COMPONENT.INVALID_INPUT', {
          field: this.props.label.toLowerCase(),
        })}</Text>
      </View>
      }
      </View>
    );
  }
}
