import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppNavigationProps} from '../../app-navigation-props';

export class AuthLoadingScreen extends React.Component<AppNavigationProps> {

  componentDidMount() {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <SafeAreaView>
      </SafeAreaView>
    );
  }
}
