import _ from 'lodash';
import React from 'react';
import {Text, Image, View, ActivityIndicator, Dimensions} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {AppNavigationProps} from '../../../app-navigation-props';
import {styles} from './dashboard.style-impl';
import {UserAccount} from '../../../models';
import {DashboardScreenState} from './dashboard.screen.state';
import {ComponentViewState} from '../../../component.state';
import {CurrencyText} from '../../../components/currency-text/currency-text.component';
import {BalancesListView} from './balances.list';
import {TransactionListView} from './transactions.list';

export class ConsumerDashboardScreen extends React.Component<AppNavigationProps, DashboardScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      componentState: ComponentViewState.DEFAULT,
      navigationState: {
        index: 0,
        routes: [
          {key: 'balances', title: this.translate('BALANCES')},
          {key: 'transactions', title: this.translate('TRANSACTIONS')},
        ],
      },
    };
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  async componentDidMount() {
    const {navigation: {getParam}, screenProps: {accountService}} = this.props;
    const userAccount: UserAccount = getParam('user_account');

    // Fetch balance
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await accountService.getWalletBalance(userAccount.getAccountId(), userAccount.getWalletAddress());
    if (response.hasData()
    && response.data) {
      this.setState({
        componentState: ComponentViewState.LOADED,
        balance: response.data.balances[0],
      });
    } else {
      const msg = response.error || this.translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  onTabIndexChanged = (index: number) => {
    const {navigationState} = this.state;
    _.assign(navigationState, {index});
    this.setState({
      navigationState,
    });
  }

  renderScene = ({route}) => {
    const {navigation: {getParam}, screenProps: {accountService, translate}} = this.props;
    const userAccount: UserAccount = getParam('user_account');

    switch (route.key) {
    case 'balances':
      return <BalancesListView userAccount={userAccount} accountService={accountService} translate={translate}/>;
    case 'transactions':
      return <TransactionListView userAccount={userAccount} accountService={accountService} translate={translate}/>;
    default:
      return null;
    }
  }

  render() {
    const {componentState, balance} = this.state;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;

    return (
      <View style={styles.rootView}>
        <View style={styles.banner}>
          <Image source={require('../../../../assets/images/balance.png')} style={styles.balanceImage} />
          <Text style={styles.bannerSubtitle}>Total Balance</Text>
          {
            isLoaded && balance &&
            <CurrencyText value={balance.balance} style={styles.currenyBannerTextStyle}></CurrencyText>
          }
          {
            isLoading &&
            <ActivityIndicator size='small' color='#ffffff'/>
          }
        </View>
        <View style={styles.body}>
          <TabView
            renderTabBar={(props) =>
              <TabBar
                {...props}
                indicatorStyle={styles.activeTabIndicatorStyle}
                style={styles.tabbar}
              />
            }
            navigationState={this.state.navigationState}
            onIndexChange={this.onTabIndexChanged}
            initialLayout={{width: Dimensions.get('window').width}}
            renderScene={this.renderScene}
          />
        </View>
      </View>
    );
  }
}
