import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity, Alert, Dimensions} from 'react-native';

import {Button, StringInput, PasswordInput} from '../../../../../components';
import {AppNavigationProps} from '../../../../../app-navigation-props';
import {ComponentViewState} from '../../../../../component.state';
import {appStyles} from '../../../../../app.style-impl';
import {styles} from './editCashier.style-impl';
import {EditCashierScreenState} from './editCashier.screen.state';
import {Orientation} from '../../../../../models/device-orientation';
import {Employee} from '../../../../../models';
import {EmployeeRole} from '../../../../../shared';

export class EditCashierScreen extends React.Component<AppNavigationProps, EditCashierScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      cashierName: {
        value: '',
        valid: false,
      },
      cashierNumber: {
        value: '',
        valid: false,
      },
      pin: {
        value: '',
        valid: false,
      },
      confirmPin: {
        value: '',
        valid: false,
      },
      orientation: Orientation.UNKNOWN,
      onceSubmitted: false,
      componentState: ComponentViewState.DEFAULT,
    };
    this.onCashierNameChanged = this.onCashierNameChanged.bind(this);
    this.onCashierNumberChanged =  this.onCashierNumberChanged.bind(this);
    this.onPinChanged = this.onPinChanged.bind(this);
    this.onConfirmPinChanged = this.onConfirmPinChanged.bind(this);
    this.editCashier = this.editCashier.bind(this);
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

  async editCashier() {
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const empId = getParam('empId');
    this.setState({
      onceSubmitted: true,
    });
    if (this.state.cashierName.valid && this.state.cashierNumber.valid && this.state.pin.valid && this.state.confirmPin.valid
      && this.state.pin.value === this.state.confirmPin.value) {
        const merchantService = this.getMerchantService();
        this.setState({
          componentState: ComponentViewState.LOADING,
        });
        const employee: Employee = {
          empId,
          name: this.state.cashierName.value,
          empNumber: this.state.cashierNumber.value,
          role: EmployeeRole.CASHIER,
          active: true,
        };
       const response = await merchantService.editEmployee(employee, this.state.pin.value);
        if (response.hasData()
        && response.data) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          Alert.alert(this.translate('EDIT_CASHIER_SCREEN.UPDATE_CASHIER_SUCCESS'));
          this.props.navigation.navigate('CashiersDashboard');
        } else {
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
        }
      }
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  getMerchantService() {
    return this.props.screenProps.merchantService;
  }

  onCashierNameChanged(name: string, isValid: boolean): void {
    const state = {
      cashierName: {
        value: name,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onCashierNumberChanged(number: string, isValid: boolean): void {
    const state = {
      cashierNumber: {
        value: number,
        valid: isValid,
      },
    };
   this.setState(state);
  }

  onPinChanged(pin: string, isValid: boolean): void {
    const state = {
      pin: {
        value: pin,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onConfirmPinChanged(confirmationPin: string, isValid: boolean): void {
    const state = {
      confirmPin: {
        value: confirmationPin,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.orientationPortrait;
    }
  }

  async refresh() {
    const {navigation: {getParam}} = this.props;
    const empId = getParam('empId');
    const merchantService = this.getMerchantService();
    const response = await merchantService.getEmployee(empId, EmployeeRole.CASHIER);
    if (response.hasData()
       && response.data) {
           const employee = response.data;
           this.setState({
               cashierName: {
                value: employee.name,
                valid: true,
               },
               cashierNumber: {
                value: employee.empNumber,
                valid: true,
               },
               pin: {
                value: '',
                valid: true,
               },
               confirmPin: {
                 value: '',
                 valid: true,
               },
               componentState: ComponentViewState.LOADED,
           });
       } else {
         const msg = response.error || this.translate('no_internet');
         this.setState({
           componentState: ComponentViewState.ERROR,
           error: msg,
         });
         Alert.alert(msg);
       }
  }

  async componentDidMount() {
    this.refresh();
  }

  render() {

    const inputStyle = {
      containerStyle: styles.inputContainer,
      labelStyle: styles.inputLabel,
      forgotStyle: styles.forgotStyle,
      inputStyle: styles.input,
      errorStyle: styles.errorStyle,
    };
    const {componentState} = this.state;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const {screenProps: {translate}, navigation: {navigate, goBack}} = this.props;

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../../assets/images/logo/logo.png')}/>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'row'}]}>
              <TouchableOpacity>
              <Image style={styles.createCashierLogoStyle}
              source={require('../../../../../../assets/images/icons/edit_user_icon.png')}/>
              <Text style={styles.createCashierLogoSubTextStyle}>{translate('EDIT_CASHIER_SCREEN.EDIT_CASHIER_IMAGE_TEXT')}</Text>
              </TouchableOpacity>
            <View style={[styles.formContainer, this.getContainerStyle()]}>
              <View style={styles.formRow}>
                <View>
                <StringInput
                  label={translate('EDIT_CASHIER_SCREEN.CASHIER_NAME')}
                  required={true}
                  autoFocus={true}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onCashierNameChanged}
                  defaultValue={this.state.cashierName.value}
                />
                </View>
                <View>
                <StringInput
                  label={translate('EDIT_CASHIER_SCREEN.CASHIER_NUMBER')}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  required={true}
                  onChange={this.onCashierNumberChanged}
                  defaultValue={this.state.cashierNumber.value}
                />
                </View>
              </View>
              <View style={styles.formRow}>
              <PasswordInput
                label={translate('EDIT_CASHIER_SCREEN.PIN')}
                onceSubmitted={this.state.onceSubmitted}
                autoFocus={false}
                style={inputStyle}
                editable={true}
                translate={this.props.screenProps.translate}
                onChange={this.onPinChanged}
                placeholder={'*****'}
              />
              <View>
              <PasswordInput
                label={translate('EDIT_CASHIER_SCREEN.CONFIRM_PIN')}
                onceSubmitted={this.state.onceSubmitted}
                autoFocus={false}
                style={inputStyle}
                editable={true}
                translate={this.props.screenProps.translate}
                onChange={this.onConfirmPinChanged}
                placeholder={'*****'}
              />
              {this.state.onceSubmitted && !(this.state.pin.value === this.state.confirmPin.value) &&
                <View style={styles.errorLabelContainer}>
                  <Text style={styles.errorStyle}>{translate('PASSWORD_INPUT_COMPONENT.PASSWORD_MISMATCH')}</Text>
                </View>
              }
              </View>
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={this.editCashier}
                  disabled={isComponentLoading}
                  showActivityIndicator={isComponentLoading}
                  text={translate('EDIT_CASHIER_SCREEN.UPDATE_CASHIER')}
                  />
                  <Button
                  type={'btn-danger'}
                  onPress={() => goBack()}
                  text={translate('EDIT_CASHIER_SCREEN.CANCEL')}
                  />
                </View>
            </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
