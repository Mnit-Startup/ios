import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Dimensions, ScrollView , View, Image, TouchableOpacity, Text, Alert} from 'react-native';

import {AppNavigationProps} from '../../../app-navigation-props';
import {ConsumerEmailScreenState} from './consumer-email.state';
import {styles} from './consumer-email.style-impl';
import {ComponentViewState} from '../../../component.state';
import {Orientation} from '../../../models/device-orientation';
import {appStyles} from '../../../app.style-impl';
import {Cart, Button, EmailInput} from '../../../components';
import {CheckoutCart, Transaction} from '../../../models';
import * as Progress from 'react-native-progress';
import {PaymentMode} from '../../../shared';

export class ConsumerEmailScreen extends React.Component<AppNavigationProps, ConsumerEmailScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      email: {
        address: '',
        valid: false,
      },
      receipt: '',
      loadingLogo: false,
      storeLogo: '',
      onceSubmitted: false,
      componentState: ComponentViewState.DEFAULT,
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
    this.getOrientation();
    Dimensions.removeEventListener('change', this.getOrientation);
  }

  getStoreService() {
    return this.props.screenProps.storeService;
  }

  getTransactionService() {
    return this.props.screenProps.transactionService;
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  refresh = async () => {
    const {navigation: {getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const storeService = this.getStoreService();
    const response = await storeService.getStore(storeId, merchantId);
    if (response.hasData()
    && response.data) {
      if (response.data.image) {
        this.setState({
          storeLogo: response.data.image,
        });
      }
    }
  }

  fetchTransactionDetails = async () => {
    const {screenProps: {transactionService}, navigation: {getParam}} = this.props;
    const transactionId = getParam('transaction_id');
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await transactionService.getDetails(transactionId);
    if (response.hasData()
    && response.data) {
      if (response.data.receipt) {
        this.setState({
          receipt: response.data.receipt,
          componentState: ComponentViewState.LOADED,
        });
      } else {
        this.setState({
          componentState: ComponentViewState.NO_DATA,
        });
      }
    } else {
      const msg = response.error || this.translate('no_internet');
      Alert.alert(msg);
      this.setState({
        componentState: ComponentViewState.ERROR,
      });
    }
  }

  sendEmail = async () => {
    const {navigation: {getParam, goBack}, screenProps: {storeService, translate}} = this.props;
    const {email, receipt} = this.state;
    const transactionId = getParam('transaction_id');
    this.setState({
      onceSubmitted: true,
    });
    if (email.valid) {
      this.setState({
        componentState: ComponentViewState.LOADING,
      });
      const response = await storeService.emailReceipt(transactionId, receipt, email.address);
      if (response.hasData()
      && response.data) {
        this.setState({
          componentState: ComponentViewState.LOADED,
        });
        Alert.alert(translate('CUSTOMER_EMAIL_SCREEN.EMAIL_SUCCESS'));
        this.navigateToPos();
      } else {
        const msg = response.error || this.translate('no_internet');
        Alert.alert(msg);
        this.setState({
          componentState: ComponentViewState.ERROR,
        });
      }
    }
  }

  onEmailChanged = (email: string, isValid: boolean) => {
    this.setState({
      email: {
        address: email,
        valid: isValid,
      },
    });
  }

  componentDidMount() {
    this.refresh();
    this.fetchTransactionDetails();
  }

  onLogoLoadStartFromSource = () => {
    this.setState({
      loadingLogo: true,
    });
  }

  onLogoLoadEndFromSource = () => {
    this.setState({
      loadingLogo: false,
    });
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.containerPotrait;
    }
  }

  navigateToPos = () => {
    const {navigation: {pop, push, getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    // navigation stack
    // 1. amount change
    // 2. amount tendered
    // 3. payment mode
    // 4. pos
    pop(4);
    push('POS', {store_id: storeId, merchant_id: merchantId});
  }

  getPaymentModeContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.qrcodeContainerPotrait;
    }
  }

  getPaymentModeSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.qrcodeSectionPotrait;
    }
  }

  getBillingSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.billingSectionPotrait;
    }
  }

  getButtonStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.buttonStylePotrait;
    }
  }

  render() {
    const {loadingLogo, storeLogo} = this.state;
    const {navigation: {getParam, goBack}, screenProps: {translate}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const isStoreLogo = !_.isEmpty(storeLogo);
    const checkoutCart: CheckoutCart = getParam('checkoutCart');
    const inputStyle = {
      containerStyle: styles.inputContainer,
      labelStyle: styles.inputLabel,
      forgotStyle: styles.forgotStyle,
      inputStyle: styles.input,
      errorStyle: styles.errorStyle,
    };

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../assets/images/logo/logo.png')}/>
              <View style={styles.storeLogoContainer}>
              {
                !isStoreLogo && (
                  <Image source={require('../../../../assets/images/icons/merchant_logo.png')}/>
                )
              }
              {
                isStoreLogo && loadingLogo && (
                  <View style={styles.progressBar}>
                    <Progress.Bar indeterminate={true} width={100}/>
                  </View>
                )
              }
              {
                isStoreLogo && (
                  <TouchableOpacity>
                    <Image style={styles.storeLogo} onLoadStart={this.onLogoLoadStartFromSource}
                    onLoad={this.onLogoLoadEndFromSource}
                    source={{uri: storeLogo}}/>
                  </TouchableOpacity>
                )
              }
              </View>
            </View>
            <View style={[styles.container, this.getContainerStyle()]}>
              <View style={[styles.qrcodeSection, this.getPaymentModeSectionStyle()]}>
                <View style={[styles.qrcodeContainer, this.getPaymentModeContainerStyle()]}>
                  <Text style={styles.transactionCompleteText}>{translate('CUSTOMER_EMAIL_SCREEN.CUSTOMER_EMAIL')}</Text>
                  <EmailInput
                    autoFocus={false}
                    onceSubmitted={this.state.onceSubmitted}
                    editable={true}
                    style={inputStyle}
                    translate={this.props.screenProps.translate}
                    onChange={this.onEmailChanged}
                  />
                  <Text style={{fontSize: 25, marginTop: 25, fontWeight: 'bold'}}>{translate('CUSTOMER_EMAIL_SCREEN.RECEIPT')}</Text>
                  <View style={[styles.buttonStyle, this.getButtonStyle()]}>
                  <Button
                      text={translate('CUSTOMER_EMAIL_SCREEN.EMAIL')}
                      disabled={false}
                      type={'btn-primary'}
                      size={'sm'}
                      onPress={this.sendEmail}
                    />
                    <Button
                      text={translate('CUSTOMER_EMAIL_SCREEN.PAPER')}
                      disabled={true}
                      type={'btn-primary'}
                      size={'sm'}
                    />
                    <Button
                      text={translate('CUSTOMER_EMAIL_SCREEN.BOTH')}
                      disabled={true}
                      type={'btn-primary'}
                      size={'sm'}
                    />
                    <Button
                      text={translate('CUSTOMER_EMAIL_SCREEN.NONE')}
                      disabled={false}
                      type={'btn-primary'}
                      size={'sm'}
                      onPress={this.navigateToPos}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
                  <Image source={require('../../../../assets/images/icons/back_icon.png')} />
                </TouchableOpacity>
              </View>
              <View style={[styles.billingSection, this.getBillingSectionStyle()]}>
                  <View>
                    <Cart
                      merchantId={merchantId}
                      storeId={storeId}
                      cart={checkoutCart}
                      storeService={this.getStoreService()}
                      translate={translate}
                    />
                  </View>
                  <View style={[styles.payButtonContainer]}>
                    <Button
                      text={translate('QRCODE_SCREEN.PAY')}
                      disabled={true}
                      type={'btn-primary'}
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
