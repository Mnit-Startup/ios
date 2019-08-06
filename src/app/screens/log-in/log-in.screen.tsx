import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator, Image, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appStyles} from '../../app.style-impl';
import {style} from './log-in.screen.style-impl';
import {AppNavigationProps} from '../../app-navigation-props';
import {LoginScreenState} from './log-in.screen.state';
import {ComponentViewState} from '../../component.state';
import {EmailInput, PasswordInput} from '../../components';

export class LogInScreen extends React.Component<AppNavigationProps, LoginScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);

    this.state = {
      email: {
        address: '',
        valid: false,
      },
      password: {
        value: '',
        valid: false,
      },
      componentState: ComponentViewState.DEFAULT,
      onceSubmitted: false,
    };
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  onEmailChanged(email: string, isValid: boolean) {
    this.setState({
      email: {
        address: email,
        valid: isValid,
      },
    });
  }

  onPasswordChanged(password: string, isValid: boolean) {
    this.setState({
      password: {
        value: password,
        valid: isValid,
      },
    });
  }

  getAuthService() {
    return this.props.screenProps.authService;
  }

  async logIn() {
    this.setState({
      onceSubmitted: true,
    });
    if (this.state.email.valid && this.state.password.valid) {
      const authService = this.getAuthService();
      this.setState({
        componentState: ComponentViewState.LOADING,
      });

      const response = await authService.login(this.state.email.address, this.state.password.value);
      if (response.hasData()) {
        this.setState({
          componentState: ComponentViewState.LOADED,
        });
        this.props.navigation.navigate('AuthLoading');
      } else {
        const msg = response.error || this.translate('no_internet');
        Alert.alert(msg);
        this.setState({
          componentState: ComponentViewState.ERROR,
        });
      }
    }
  }


  render() {

    const {screenProps: {translate}} = this.props;
    const {componentState} = this.state;
    const loggingIn = (componentState === ComponentViewState.LOADING);
    const inputStyle = {
      containerStyle: style.inputContainer,
      labelStyle: style.inputLabel,
      forgotStyle: style.forgotStyle,
      inputStyle: style.input,
      errorStyle: style.errorStyle,
    };

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <KeyboardAwareScrollView>
          <View style={style.rootView}>
            <View style={style.header}>
              <Image source={require('../../../assets/images/logo/logo.png')} style={style.logo}/>
            </View>
            <View>
              <EmailInput
                autoFocus={true}
                onceSubmitted={this.state.onceSubmitted}
                style={inputStyle}
                editable={!loggingIn}
                translate={this.props.screenProps.translate}
                onChange={this.onEmailChanged}
              />
              <PasswordInput
                label={translate('LOGIN_SCREEN.PASSWORD')}
                onceSubmitted={this.state.onceSubmitted}
                autoFocus={false}
                style={inputStyle}
                editable={!loggingIn}
                translate={this.props.screenProps.translate}
                onChange={this.onPasswordChanged}
              />
            </View>
            <View style={style.logInButtonContainer}>
              <TouchableOpacity
                style={style.logInButton}
                onPress={this.logIn}
                disabled={loggingIn}
              >
                <Text style={style.logInButtonText}>
                  {translate('LOGIN_SCREEN.SIGN_IN')}
                </Text>
                <ActivityIndicator
                  color='#ffffff'
                  animating={true}
                  style={{opacity: loggingIn ? 1 : 0}}
                ></ActivityIndicator>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
