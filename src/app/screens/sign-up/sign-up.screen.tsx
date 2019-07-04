import _ from 'lodash';
import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Image, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {EmailInput, PasswordInput} from '../../components';
import {appStyles} from '../../app.style-impl';
import {style} from './sign-up.screen.style-impl';
import {AppNavigationProps} from '../../app-navigation-props';
import {SignUpScreenState} from './sign-up.screen.state';
import {ComponentViewState} from '../../component.state';
import {Role} from '../../shared';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export class SignUpScreen extends React.Component<AppNavigationProps, SignUpScreenState> {
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
      confirmPassword: {
        value: '',
        valid: false,
      },
      dropdown: {
        visible: false,
        picked: Role.MERCHANT.key,
      },
      onceSubmitted: false,
      passwordMatch: true,
      componentState: ComponentViewState.DEFAULT,
    };

    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onConfirmPasswordChanged = this.onConfirmPasswordChanged.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  async signUp() {
    this.setState({
      onceSubmitted: true,
    });
    if (this.state.email.valid && this.state.passwordMatch) {
      const accountService = this.getAccountsService();
        this.setState({
          componentState: ComponentViewState.LOADING,
        });
        let response;
        if (this.state.dropdown.picked === Role.CONSUMER.key) {
          response = await accountService.createConusmerAccount(this.state.email.address, this.state.password.value);
        } else {
          response = await accountService.createMerchantAccount(this.state.email.address, this.state.password.value);
        }
        if (response.hasData()
        && response.data) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          Alert.alert(this.translate('SIGNUP_SCREEN.SIGN_UP_SUCCESS'));
          this.props.navigation.navigate('LogIn');
        } else {
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
        }
    }
  }

  onPasswordChanged(password: string, isValid: boolean): void {
    const state = {
      password: {
        value: password,
        valid: isValid,
      },
      passwordMatch: password === this.state.confirmPassword.value,
    };
    this.setState(state);
  }

  onConfirmPasswordChanged(confirmationPassword: string, isValid: boolean): void {
    const state = {
      confirmPassword: {
        value: confirmationPassword,
        valid: isValid,
      },
      passwordMatch: this.state.password.value === confirmationPassword,
    };
    this.setState(state);
  }

  onEmailChanged(email: string, isValid: boolean): void {
    const state = {
      email: {
        address: email,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  getAccountsService() {
    return this.props.screenProps.accountsService;
  }

  onShow = () => {
    if (this.state.componentState !== ComponentViewState.LOADING) {
      this.setState({
        dropdown: {
          visible: true,
          picked: this.state.dropdown.picked,
        },
      });
    }
  }

  onSelect = (picked: string) => {
    this.setState({
      dropdown: {
        visible: false,
        picked: picked,
      },
    });
  }

  onCancel = () => {
    this.setState({
      dropdown: {
        visible: false,
        picked: this.state.dropdown.picked,
      },
    });
  }

  render() {

    const {screenProps: {translate}} = this.props;
    const {componentState} = this.state;
    const options = [Role.CONSUMER, Role.MERCHANT];
    const signingUp = (componentState === ComponentViewState.LOADING);
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
              <Image source={require('../../../assets/images/logo/logo.png')} style={style.logo} />
            </View>
            <View>
              <EmailInput
                autoFocus={true}
                onceSubmitted={this.state.onceSubmitted}
                style={inputStyle}
                editable={!signingUp}
                translate={this.props.screenProps.translate}
                onChange={this.onEmailChanged}
              />
              <PasswordInput
                label={translate('SIGNUP_SCREEN.PASSWORD')}
                onceSubmitted={this.state.onceSubmitted}
                autoFocus={false}
                style={inputStyle}
                editable={!signingUp}
                translate={this.props.screenProps.translate}
                onChange={this.onPasswordChanged}
              />
              <PasswordInput
                label={translate('SIGNUP_SCREEN.CONFIRM_PASSWORD')}
                onceSubmitted={this.state.onceSubmitted}
                autoFocus={false}
                style={inputStyle}
                editable={!signingUp}
                translate={this.props.screenProps.translate}
                onChange={this.onConfirmPasswordChanged}
              />
              {this.state.onceSubmitted && !this.state.passwordMatch &&
                <View style={style.errorLabelContainer}>
                  <Text style={style.errorStyle}>{translate('PASSWORD_INPUT_COMPONENT.PASSWORD_MISMATCH')}</Text>
                </View>
              }
            </View>
            <View style={style.container}>
              <TouchableOpacity onPress={this.onShow}>
                <Text style={style.buttonContainer}>{translate('SIGNUP_SCREEN.ACCOUNT_TYPE')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.selectedOptionContainer} onPress={this.onShow}>
                <Text style={style.selectedOptionStyle}>{this.state.dropdown.picked}</Text>
                <View style={style.chevron_down}><Icon color={'white'} name='chevron-down'></Icon></View>
              </TouchableOpacity>
              <ModalFilterPicker
                visible={this.state.dropdown.visible}
                onSelect={this.onSelect}
                onCancel={this.onCancel}
                options={options}
                listContainerStyle={style.listContainerStyle}
                optionTextStyle={style.optionTextStyle}
                showFilter={false}
                cancelContainerStyle={style.cancelContainerStyle}
              />
            </View>
            <View style={style.signUpButtonContainer}>
              <TouchableOpacity
                style={style.signUpButton}
                onPress={this.signUp}
                disabled={signingUp}
              >
                <Text style={style.signUpButtonText}>
                  {translate('SIGNUP_SCREEN.CREATE_ACCOUNT')}
                </Text>
                <ActivityIndicator
                  color='#ffffff'
                  animating={true}
                  style={{opacity: signingUp ? 1 : 0}}
                ></ActivityIndicator>
              </TouchableOpacity>
            </View>
            <View style={style.termsOfUse}>
              <Text style={style.termsOfUseText}>
                {translate('SIGNUP_SCREEN.TERMS_OF_SERVICE')}
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

