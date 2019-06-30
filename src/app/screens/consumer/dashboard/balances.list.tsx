import _, {MemoizedFunction} from 'lodash';
import moment from 'moment';
import React from 'react';
import {Text, View, ActivityIndicator, FlatList} from 'react-native';
import {styles} from './dashboard.style-impl';
import {ComponentViewState, ComponentState} from '../../../component.state';
import {WalletBalanceList} from '../../../models/wallet-balance-list';
import {UserAccount} from '../../../models';
import {AccountService} from '../../../services';
import {CurrencyText} from '../../../components/currency-text/currency-text.component';
const emitter = require('tiny-emitter/instance');

interface BalancesListProps {
  userAccount: UserAccount;
  accountService: AccountService;
  translate: ((key: any, config?: any) => string) & MemoizedFunction;
}

interface BalancesListState extends ComponentState {
  walletBalanceList?: WalletBalanceList;
}

export class BalancesListView extends React.Component<BalancesListProps, BalancesListState> {
  constructor(props: Readonly<BalancesListProps>) {
    super(props);
    this.state = {
      componentState: ComponentViewState.DEFAULT,
    };
    this.refresh = this.refresh.bind(this);
    emitter.on('refresh', this.refresh);
  }

  async refresh() {
    const {userAccount, accountService, translate} = this.props;

    // Fetch balance
    this.setState({
      componentState: ComponentViewState.LOADING,
    });

    const response = await accountService.getWalletBalance(userAccount.getAccountId(), userAccount.getWalletAddress());
    if (response.hasData()
      && response.data) {
      this.setState({
        componentState: ComponentViewState.LOADED,
        walletBalanceList: response.data,
      });
    } else {
      const msg = response.error || translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  async componentDidMount() {
    this.refresh();
  }

  renderBalance = ({item}) => {
    const dateStr = moment(item.updatedAt).format('MM/DD/YYYY');
    return (
      <View style={styles.rowItem}>
        <View style={styles.rowDescription}>
          <Text style={styles.rowTitle}>{item.description}</Text>
          <Text style={styles.rowSubtitle}>{dateStr}</Text>
        </View>
        <View>
          <CurrencyText value={item.balance} style={styles.rowAmount}/>
        </View>
      </View>
    );
  }

  render() {
    const {componentState, walletBalanceList, error} = this.state;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;

    return (
      <View style={[styles.tab]}>
        {
          isLoading &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='small' color='#000000'/>
          </View>
        }
        {
          isError &&
          <View style={styles.errorContainer}>
            <Text style={styles.messageError}>{error}</Text>
          </View>
        }
        {
          isLoaded && walletBalanceList &&
          <FlatList
            data={walletBalanceList.balances}
            renderItem={this.renderBalance}
          />
        }
      </View>
    );
  }
}
