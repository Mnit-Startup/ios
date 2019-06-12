import React from 'react';
import {Text, View} from 'react-native';
import {CurrencyTextComponentProps} from './currency-text.component.props';
import {split} from 'lodash';
import {currencyTextStyles as styles} from './currency-text.component.styles-impl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class CurrencyText extends React.Component<CurrencyTextComponentProps> {
  render() {
    const {value, style} = this.props;
    const isCredit = (value >= 0);
    let integer: number | string = 0;
    let decimal: number | string = 0;

    if (Number(value)) {
      // Trim decimals to 2 digits
      const formattedCurrency = Number(value).toFixed(2);
      const splitArr = split(formattedCurrency, '.');
      integer = splitArr[0];
      decimal = splitArr[1];
    }

    return (
      <View style={[styles.currencyWrapper]}>
        <Text style={[styles.integerStyle, style]}>
          {Number(integer).toLocaleString()}
        </Text>
        <Text style={[styles.decimalStyle, style]}>
          .{decimal}
        </Text>
      </View>
    );
  }
}
