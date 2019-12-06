import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Dimensions, ScrollView , View, Image, TouchableOpacity, Text, Alert} from 'react-native';

import {AppNavigationProps} from '../../../../app-navigation-props';
import {AmountTenderedScreenState} from './amount-tendered.state';
import {styles} from './amount-tendered.style-impl';
import {ComponentViewState} from '../../../../component.state';
import {Orientation} from '../../../../models/device-orientation';
import {appStyles} from '../../../../app.style-impl';
import {Cart, Button, NumberInput} from '../../../../components';
import {CheckoutCart, Transaction} from '../../../../models';
import * as Progress from 'react-native-progress';
import {PaymentMode} from '../../../../shared';

export class AmountTenderedScreen extends React.Component<AppNavigationProps, AmountTenderedScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      amountTendered: {
        value: 0,
        valid: true,
      },
      change: 0,
      loadingLogo: false,
      storeLogo: '',
      transactionAmount: 0,
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
      this.setState({
        transactionAmount: response.data.amount,
        componentState: ComponentViewState.LOADED,
      });
    } else {
      const msg = response.error || this.translate('no_internet');
      Alert.alert(msg);
      this.setState({
        componentState: ComponentViewState.ERROR,
      });
    }
  }

  pay = async () => {
    const {navigation: {getParam, goBack, navigate}, screenProps: {translate}} = this.props;
    const transactionId = getParam('transaction_id');
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const checkoutCart: CheckoutCart = getParam('checkoutCart');
    this.setState({
      onceSubmitted: true,
    });
    if (this.state.amountTendered.valid) {
      if (this.state.amountTendered.value < this.state.transactionAmount) {
        Alert.alert(translate('TENDER_AMOUNT_SCREEN.TENDERED_INVALID_AMOUNT'));
        return;
      } else {
        const change = this.state.amountTendered.value - this.state.transactionAmount;
        this.setState({
          componentState: ComponentViewState.LOADING,
          change,
        });
        const transactionService = this.getTransactionService();
        const response = await transactionService.pay(transactionId, PaymentMode.CASH);
        if (response.hasData()
        && response.data) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          navigate('CashChange', {store_id: storeId, merchant_id: merchantId, checkoutCart,
            transaction_id: transactionId, change: this.state.change});
        } else {
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
        }
      }
    }
  }

  onAmountTenderedChanged = (amount: number, isValid: boolean): void => {
    this.setState({
      amountTendered: {
        value: amount,
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
              <Image source={require('../../../../../assets/images/logo/logo.png')}/>
              <View style={styles.storeLogoContainer}>
              {
                !isStoreLogo && (
                  <Image source={require('../../../../../assets/images/icons/merchant_logo.png')}/>
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
                  <Text style={styles.transactionCompleteText}>{translate('TENDER_AMOUNT_SCREEN.AMOUNT_TENDERED')}</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.transactionCompleteText, {marginTop: 12}]}>{'$'}</Text>
                  <NumberInput
                    label={translate('CUSTOMER_CHANGE_SCREEN.AMOUNT')}
                    autoFocus={false}
                    onceSubmitted={this.state.onceSubmitted}
                    editable={true}
                    style={inputStyle}
                    translate={this.props.screenProps.translate}
                    required={true}
                    onChange={this.onAmountTenderedChanged}
                  />
                  </View>
                </View>
                <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
                  <Image source={require('../../../../../assets/images/icons/back_icon.png')} />
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
                      onPress={() => this.pay()}
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
