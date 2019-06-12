import React from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {Button} from '../../components';
import {appStyles} from '../../app.style-impl';
import {style} from './sign-in.screen.style-impl';
import {AppNavigationProps} from '../../app-navigation-props';

export class SignInScreen extends React.Component<AppNavigationProps> {
  constructor(props: AppNavigationProps) {
    super(props);
  }

  render() {

    const {screenProps: {translate}, navigation: {navigate}} = this.props;

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <View style={style.rootView}>
          <View style={style.header}>
            <Image source={require('../../../assets/images/logo/logo.png')} style={style.logo} />
          </View>
          <View style={style.bankIconContainer}>
            <Image source={require('../../../assets/images/icons/bank.png')} style={style.bankIcon} />
          </View>
          <View style={style.signInButtonContainer}>
          <Button
            type={'btn-primary'}
            onPress={() => navigate('LogIn')}
            text={translate('SIGNIN_SCREEN.SIGN_IN')}
          />
          </View>
          <View style={style.signUpButtonContainer}>
          <Button
            type={'btn-secondary'}
            onPress={() => navigate('SignUp')}
            text={translate('SIGNIN_SCREEN.SIGN_UP')}
          />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

