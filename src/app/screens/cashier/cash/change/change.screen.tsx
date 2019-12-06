import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Dimensions, ScrollView , View, Image, TouchableOpacity, Text, Alert} from 'react-native';

import {AppNavigationProps} from '../../../../app-navigation-props';
import {CashChangeScreenState} from './change.screen.state';
import {styles} from './change.screen.style-impl';
import {ComponentViewState} from '../../../../component.state';
import {Orientation} from '../../../../models/device-orientation';
import {appStyles} from '../../../../app.style-impl';
import {Cart, Button, NumberInput} from '../../../../components';
import {CheckoutCart, Transaction} from '../../../../models';
import * as Progress from 'react-native-progress';
import {PaymentMode} from '../../../../shared';

export class CashChangeScreen extends React.Component<AppNavigationProps, CashChangeScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
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

  componentDidMount() {
    this.refresh();
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
    // 1. amount tendered
    // 2. payment mode
    // 3. pos
    pop(3);
    push('POS', {store_id: storeId, merchant_id: merchantId});
  }

  navigateConsumerEmail = () => {
    const {navigation: {navigate, getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const checkoutCart: CheckoutCart = getParam('checkoutCart');
    const transactionId = getParam('transaction_id');
    navigate('ConsumerEmail', {store_id: storeId, merchant_id: merchantId, checkoutCart,
            transaction_id: transactionId});
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
    let change: number = getParam('change');
    change = _.round(change, 2);
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
                  <Text style={styles.transactionCompleteText}>{translate('CUSTOMER_CHANGE_SCREEN.CUSTOMER_CHANGE')}</Text>
                  <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.transactionCompleteText, {marginTop: 12}]}>{'$'}</Text>
                  <NumberInput
                    label={translate('CUSTOMER_CHANGE_SCREEN.AMOUNT')}
                    autoFocus={false}
                    onceSubmitted={this.state.onceSubmitted}
                    editable={false}
                    style={inputStyle}
                    translate={this.props.screenProps.translate}
                    required={true}
                    defaultValue={change}
                  />
                  </View>
                  <Text style={{fontSize: 25, marginTop: 25, fontWeight: 'bold'}}>{translate('CUSTOMER_CHANGE_SCREEN.RECEIPT')}</Text>
                  <View style={[styles.buttonStyle, this.getButtonStyle()]}>
                  <Button
                      text={translate('CUSTOMER_CHANGE_SCREEN.EMAIL')}
                      disabled={false}
                      type={'btn-primary'}
                      size={'sm'}
                      onPress={this.navigateConsumerEmail}
                    />
                    <Button
                      text={translate('CUSTOMER_CHANGE_SCREEN.PAPER')}
                      disabled={true}
                      type={'btn-primary'}
                      size={'sm'}
                    />
                    <Button
                      text={translate('CUSTOMER_CHANGE_SCREEN.BOTH')}
                      disabled={true}
                      type={'btn-primary'}
                      size={'sm'}
                    />
                    <Button
                      text={translate('CUSTOMER_CHANGE_SCREEN.NONE')}
                      disabled={false}
                      type={'btn-primary'}
                      size={'sm'}
                      onPress={this.navigateToPos}
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
