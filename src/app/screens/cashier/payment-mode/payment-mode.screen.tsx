import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Dimensions, ScrollView, View, Text, Image, TouchableOpacity, Alert} from 'react-native';

import {AppNavigationProps} from '../../../app-navigation-props';
import {ComponentViewState} from '../../../component.state';
import {appStyles} from '../../../app.style-impl';
import {Orientation} from '../../../models/device-orientation';
import {styles} from './payment-mode.screen.style-impl';
import {PaymentModeScreenState} from './payment-mode.state';
import {Cart, Button} from '../../../components';
import {CheckoutCart, Transaction} from '../../../models';
import * as Progress from 'react-native-progress';
import {PaymentMode} from '../../../shared';

export class PaymentModeScreen extends React.Component<AppNavigationProps, PaymentModeScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      loadingLogo: false,
      storeLogo: '',
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
    this.onLogoLoadStartFromSource = this.onLogoLoadStartFromSource.bind(this);
    this.onLogoLoadEndFromSource = this.onLogoLoadEndFromSource.bind(this);
    this.refresh = this.refresh.bind(this);
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

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  getStoreService() {
    return this.props.screenProps.storeService;
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.containerPotrait;
    }
  }

  getPaymentModeContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.paymentModeContainerPotrait;
    }
  }

  getPaymentModeSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.paymentModeSectionPotrait;
    }
  }

  getBillingSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.billingSectionPotrait;
    }
  }

  async createSale(paymentMode: string) {
    const {navigation: {getParam, navigate}} = this.props;
    const checkoutCart: CheckoutCart = getParam('checkoutCart');
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const storeService = this.getStoreService();
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await storeService.createTransaction(checkoutCart.cart, merchantId, storeId);
    if (response.hasData()
      && response.data) {
        this.setState({
          componentState: ComponentViewState.LOADED,
        });
        const transaction: Transaction = response.data;
        if (paymentMode === PaymentMode.KADIMA) {
          navigate('QRCode', {store_id: storeId, merchant_id: merchantId, checkoutCart, transaction_id: transaction.id});
        } else if (paymentMode === PaymentMode.CASH) {
          navigate('TenderAmount', {store_id: storeId, merchant_id: merchantId, checkoutCart, transaction_id: transaction.id});
        }
      } else {
        const msg = response.error || this.translate('no_internet');
        Alert.alert(msg);
        this.setState({
          componentState: ComponentViewState.ERROR,
        });
      }
  }

  async refresh() {
    const {navigation: {getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const storeService = this.getStoreService();
    const response = await storeService.getStore(storeId, merchantId);
    if (response.hasData()
    && response.data) {
      if (response.data.image) {
        this.setState({
          componentState: ComponentViewState.LOADED,
          storeLogo: response.data.image,
        });
      } else {
        this.setState({
          componentState: ComponentViewState.NO_DATA,
        });
      }
    } else {
      const msg = response.error || this.translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  onLogoLoadStartFromSource() {
    this.setState({
      loadingLogo: true,
    });
  }

  onLogoLoadEndFromSource() {
    this.setState({
      loadingLogo: false,
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const {navigation: {getParam, goBack}, screenProps: {translate}} = this.props;
    const {storeLogo, loadingLogo} = this.state;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const checkoutCart: CheckoutCart = getParam('checkoutCart');
    const isStoreLogo = !_.isEmpty(storeLogo);

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
              <View style={[styles.paymentModeSection, this.getPaymentModeSectionStyle()]}>
                <View style={[styles.paymentModeContainer, this.getPaymentModeContainerStyle()]}>
                  <View>
                    <TouchableOpacity onPress={() => this.createSale(PaymentMode.KADIMA)} style={styles.kadimaContainer}>
                      <Text style={styles.kadimaText}>{translate('PAYMENT_MODE_SCREEN.KADIMA')}</Text>
                      <Text style={styles.coinText}>{translate('PAYMENT_MODE_SCREEN.COIN')}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={styles.cashContainer} onPress={() => this.createSale(PaymentMode.CASH)}>
                        <Text style={styles.cashText}>{translate('PAYMENT_MODE_SCREEN.CASH')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.creditContainer}>
                        <Text style={styles.creditText}>{translate('PAYMENT_MODE_SCREEN.CREDIT')}</Text>
                      </TouchableOpacity>
                    </View>
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
                      text={translate('PAYMENT_MODE_SCREEN.PAY')}
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
