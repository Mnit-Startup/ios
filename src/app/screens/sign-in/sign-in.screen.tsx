import React from 'react';
import {SafeAreaView, View, Image, ScrollView, Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-detection';
import {Button} from '../../components';
import {appStyles} from '../../app.style-impl';
import {AppNavigationProps} from '../../app-navigation-props';
import {Orientation} from '../../models/device-orientation';
import {style} from './sign-in.screen.style-impl';
import {SignInScreenState} from './sign-in.screen.state';

export class SignInScreen extends React.Component<AppNavigationProps, SignInScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      orientation: Orientation.UNKNOWN,
    };
  }

  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({
        orientation: Orientation.POTRAIT,
      });
    } else {
      this.setState({
        orientation: Orientation.LANDSCAPE,
      });
    }
  }

  componentWillMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', this.getOrientation);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.getOrientation);
  }

  render() {

    const {screenProps: {translate}, navigation: {navigate}} = this.props;
    const {orientation} = this.state;

    let actionButtonsContainerStyle;
    if (isTablet && orientation === Orientation.LANDSCAPE) {
      actionButtonsContainerStyle = style.actionButtonsContainerTabletLandscapeStyle;
    } else {
      actionButtonsContainerStyle = style.actionButtonsContainerDefaultStyle;
    }

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={style.rootView}>
            <View style={style.header}>
              <Image source={require('../../../assets/images/logo/logo.png')} style={style.logo} />
            </View>
            <View style={style.bankIconContainer}>
              <Image source={require('../../../assets/images/icons/bank.png')} style={style.bankIcon} />
            </View>
            <View style={actionButtonsContainerStyle}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

