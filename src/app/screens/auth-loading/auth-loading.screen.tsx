import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {AppNavigationProps} from '../../app-navigation-props';

export class AuthLoadingScreen extends React.Component<AppNavigationProps> {
  render() {
    const {screenProps: {translate}} = this.props;
    return (
      <SafeAreaView>
          <Text>{translate('HELLO_WORLD')}</Text>
      </SafeAreaView>
    );
  }
}
