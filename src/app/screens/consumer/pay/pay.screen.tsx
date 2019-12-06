import _ from 'lodash';
import React from 'react';
import {Text, SafeAreaView, View, ActivityIndicator, Dimensions, TouchableOpacity, Image, Alert} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {AppNavigationProps} from '../../../app-navigation-props';
import {ComponentViewState} from '../../../component.state';
import {UserAccount} from '../../../models';
import {PayScreenState} from './pay.screen.state';
import {styles} from './pay.screen.style-impl';
import {CurrencyText} from '../../../components/currency-text/currency-text.component';
import {Button} from '../../../components';
import {PaymentMode} from '../../../shared';

export class PayScreen extends React.Component<AppNavigationProps, PayScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      balancesState: ComponentViewState.DEFAULT,
      componentState: ComponentViewState.DEFAULT,
      transactionState: ComponentViewState.DEFAULT,
    };
    this.renderWallet = this.renderWallet.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.dismissAndRefresh = this.dismissAndRefresh.bind(this);
    this.fetchTransactionDetails = this.fetchTransactionDetails.bind(this);
    this.pay = this.pay.bind(this);
    this.fetchBalances = this.fetchBalances.bind(this);
  }

  translate(key: string, options?: any) {
    return this.props.screenProps.translate(key, options);
  }

  async fetchBalances() {
    const {navigation: {getParam}, screenProps: {accountService}} = this.props;
    const userAccount: UserAccount = getParam('user_account');
    // Fetch balance
    this.setState({
      balancesState: ComponentViewState.LOADING,
    });
    const response = await accountService.getWalletBalance(userAccount.getAccountId(), userAccount.getWalletAddress());
    if (response.hasData()
    && response.data) {
      this.setState({
        balancesState: ComponentViewState.LOADED,
        balances: response.data.balances,
      });
    } else {
      const msg = response.error || this.translate('no_internet');
      this.setState({
        balancesState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  async componentDidMount() {
    this.fetchBalances();
  }

  renderWallet ({item, index}) {
    const cardStyle = _.assign({}, styles.walletCard);
    if (item.isKadima()) {
      _.assign(cardStyle, styles.kadimaWalletCard);
    }

    return (
      <View style={cardStyle}>
        {
          item.isKadima() &&
          <Image source={require('../../../../assets/images/icon_kadima.png')} style={styles.walletCardImage} />
        }
        <Text style={styles.walletCardTitle}>{this.translate('AVAILABLE_BALANCE')}</Text>
        <CurrencyText value={item.balance} style={styles.walletCardBalanceTextStyle}></CurrencyText>
      </View>
    );
  }

  wp (percentage: number, viewportWidth: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }

  dismiss() {
    const {navigation: {goBack}} = this.props;
    goBack(null);
  }

  dismissAndRefresh() {
    const {navigation: {getParam, goBack}} = this.props;
    const refresh = getParam('refresh');
    refresh();
    goBack(null);
  }

  async fetchTransactionDetails(transactionId: string) {
    const {screenProps: {transactionService}} = this.props;
    this.setState({
      transactionState: ComponentViewState.LOADING,
    });
    const response = await transactionService.getDetails(transactionId);
    if (response.hasData()
    && response.data) {
      this.setState({
        transactionState: ComponentViewState.LOADED,
        transaction: response.data,
      });
    } else {
      const msg = response.error || this.translate('no_internet');
      this.setState({
        transactionState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  async pay () {
    const {navigation: {navigate}, screenProps: {transactionService}} = this.props;
    const {transaction} = this.state;
    if (!transaction) {
      return;
    }
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await transactionService.pay(transaction.id, PaymentMode.KADIMA);
    if (response.hasData()
    && response.data) {
      this.setState({
        componentState: ComponentViewState.LOADED,
      });
      this.fetchBalances();
    } else {
      const msg = response.error || this.translate('no_internet');
      Alert.alert(msg);
      this.setState({
        componentState: ComponentViewState.ERROR,
      });
    }
  }

  render() {
    const {componentState, transactionState, balancesState, balances, transaction, error} = this.state;
    const isBalancesLoading = balancesState === ComponentViewState.LOADING;
    const isBalancesLoaded = balancesState === ComponentViewState.LOADED;

    const isTransactionDefaultState = transactionState === ComponentViewState.DEFAULT;
    const isTransactionLoadingState = transactionState === ComponentViewState.LOADING;
    const isTransactionLoadedState = transactionState === ComponentViewState.LOADED;
    const isTransactionErrorState = transactionState === ComponentViewState.ERROR;

    const isComponentStateLoading = componentState === ComponentViewState.LOADING;
    const isComponentStateLoaded = componentState === ComponentViewState.LOADED;
    const isComponentStateError = componentState === ComponentViewState.ERROR;

    const {width: viewportWidth} = Dimensions.get('window');
    const slideWidth = this.wp(75, viewportWidth);
    const itemHorizontalMargin = this.wp(2, viewportWidth);
    const sliderWidth = viewportWidth;
    const itemWidth = slideWidth + itemHorizontalMargin * 2;

    return (
      <SafeAreaView>
        <View style={styles.rootView}>
          {
            !isComponentStateLoaded &&
            <React.Fragment>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={this.dismiss} style={styles.closeButton}>
                  <Image source={require('../../../../assets/images/icon_close.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.walletContainer}>
              {
                isBalancesLoading &&
                <View style={[styles.loadingConatainer, {width: itemWidth}]}>
                  <ActivityIndicator size='small' color='#ffffff'/>
                </View>
              }
              {
                isBalancesLoaded && balances &&
                <Carousel
                  data={balances}
                  renderItem={this.renderWallet}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                />
              }
              </View>
              <View style={styles.contentContainer}>
                {
                  (isTransactionDefaultState || isTransactionErrorState) &&
                  <React.Fragment>
                    <Text style={styles.title}>{this.translate('SCAN_QR_CODE')}</Text>
                    <View style={styles.qrCodeContainer}>
                      <QRCodeScanner
                        containerStyle={styles.qrCodeScannerStyle}
                        cameraStyle={styles.qrCodeScannerStyle}
                        onRead={(e) => this.fetchTransactionDetails(e.data)}/>
                    </View>
                    {
                      isTransactionErrorState &&
                      <Text style={styles.messageError}>{error}</Text>
                    }
                  </React.Fragment>
                }
                {
                  isTransactionLoadingState &&
                  <React.Fragment>
                    <Text style={styles.title}>{this.translate('FETCHING_TRANSACTION_DETAILS')}</Text>
                    <ActivityIndicator size='small' color='#000000'/>
                  </React.Fragment>
                }
                {
                  isTransactionLoadedState && transaction &&
                  <View style={styles.payContainer}>
                    <Text style={styles.title}>{
                      this.translate('PAY_TO_MERCHANT', {
                        amount: Number(transaction.amount).toFixed(2),
                        currency: 'Kadima Coin',
                        merchant: transaction.merchantName,
                      })
                    }
                    </Text>
                    <Button
                      type={'btn-primary'}
                      onPress={this.pay}
                      disabled={isComponentStateLoading}
                      showActivityIndicator={isComponentStateLoading}
                      text={this.translate('PAY')}
                    />
                    {
                      isComponentStateError &&
                      <Text style={styles.messageError}>{error}</Text>
                    }
                  </View>
                }
              </View>
            </React.Fragment>
          }
          {
            isComponentStateLoaded && transaction &&
            <View style={styles.transactionSuccessContainer}>
              <Image source={require('../../../../assets/images/icon_transfer.png')} />
              <Text style={styles.transactionSuccessTitle}>{this.translate('TRANSACTION_COMPLETE')}</Text>
              <Text style={styles.transactionSuccessAmount}>{this.translate('AMOUNT')}</Text>
              <CurrencyText value={transaction.amount} style={styles.transactionSuccessBalanceTextStyle}></CurrencyText>
              <Text style={styles.transactionSuccessSubTitle}>{this.translate('FUND_TRANSFER', {currency: 'Kadima Coin'})}</Text>
              <Button
                type={'btn-primary'}
                onPress={this.dismissAndRefresh}
                text={this.translate('CLOSE')}
              />
            </View>
          }
        </View>
      </SafeAreaView>
    );
  }
}
