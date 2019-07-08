import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button} from '../../../components';
import {AppNavigationProps} from '../../../app-navigation-props';

export class MerchantDashboardScreen extends React.Component<AppNavigationProps> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const {navigation: {navigate}, screenProps: {authService}} = this.props;
    authService.logout();
    navigate('LogIn');
  }

  render() {
    return (
      <SafeAreaView>
        <Text>Merchant</Text>
        <Button
            type={'btn-secondary'}
            onPress={this.logout}
            text='logout'
          />
      </SafeAreaView>
    );
  }
}
