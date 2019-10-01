import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Dimensions, ScrollView, View, Text, Image, TouchableOpacity, Alert} from 'react-native';

import {AppNavigationProps} from '../../../app-navigation-props';
import {ComponentViewState} from '../../../component.state';
import {appStyles} from '../../../app.style-impl';
import {Orientation} from '../../../models/device-orientation';
import {styles} from './qrcode.style-impl';
import {QRCodeScreenState} from './qrcode.screen.state';
import {Cart, Button} from '../../../components';
import {CheckoutCart, Transaction} from '../../../models';
import {PaymentStatus} from '../../../shared';
import QRCode from 'react-native-qrcode-svg';
import * as Progress from 'react-native-progress';
import Config from 'react-native-config';

export class QRCodeScreen extends React.Component<AppNavigationProps, QRCodeScreenState> {

  static readonly interval = Number(Config.PAYMENT_STATUS_POLLING_INTERVAL);

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
    this.pollTransactionStatus = this.pollTransactionStatus.bind(this);
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

  getTransactionService() {
    return this.props.screenProps.transactionService;
  }

  pollTransactionStatus() {
    const {navigation: {getParam}} = this.props;
    const transactionService = this.getTransactionService();
    const transaction_id = getParam('transaction_id');
    const checkStatus = (async (resolve, reject) => {
      const response = await transactionService.getDetails(transaction_id);
      if (response.hasData() &&
        response.data) {
        const transaction: Transaction = response.data;
        if (transaction.paymentStatus === PaymentStatus.PENDING_PAYMENT) {
          setTimeout(checkStatus, QRCodeScreen.interval, resolve, reject);
        } else if (transaction.paymentStatus === PaymentStatus.PROCESSING) {
          this.setState({
            componentState: ComponentViewState.LOADING,
          });
          setTimeout(checkStatus, QRCodeScreen.interval, resolve, reject);
        } else if (transaction.paymentStatus === PaymentStatus.PAID) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          resolve();
        }
      }
    });
    return new Promise(checkStatus);
  }

  componentDidMount() {
    this.pollTransactionStatus()
      .then(() => {
        // navigate to payment success screen
      });
  }

  render() {
    const {navigation: {getParam, goBack}, screenProps: {translate}} = this.props;
    const {componentState} = this.state;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const isComponentLoaded = componentState === ComponentViewState.LOADED;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const checkoutCart: CheckoutCart = getParam('checkoutCart');
    const transaction_id = getParam('transaction_id');

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../assets/images/logo/logo.png')}/>
              <Image source={require('../../../../assets/images/icons/merchant_logo.png')}/>
            </View>
            <View style={[styles.container, this.getContainerStyle()]}>
              <View style={[styles.qrcodeSection, this.getPaymentModeSectionStyle()]}>
                <View style={[styles.qrcodeContainer, this.getPaymentModeContainerStyle()]}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.qrcode}>
                    <QRCode
                      value={transaction_id}
                      color={'#2C8DDB'}
                      size={265}
                      logo={require('../../../../assets/images/logo/kadima_round_logo.png')}
                      logoSize={40}
                    />
                    </TouchableOpacity>
                    <View style={{marginTop: 10}}>
                      {
                        isComponentLoading && (
                          <Progress.Pie
                            borderColor={'#2C8DDB'} color={'#DA6624'} borderWidth={5} size={100} indeterminate={true}/>
                        )
                      }
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
