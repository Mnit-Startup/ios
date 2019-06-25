import _, {MemoizedFunction} from '';
import React from 'React';
import {Text, View, ActivityIndicator, FlatList} from 'react-native';
import {styles} from './dashboard.style-impl';
import {ComponentViewState, ComponentState} from '../../../component.state';
import {TransactionList} from '../../../models/transaction-list';
import {UserAccount} from '../../../models';
import {AccountService} from '../../../services';
import {CurrencyText} from '../../../components/currency-text/currency-text.component';
import moment from 'moment';

interface TransactionsListProps {
  userAccount: UserAccount;
  accountService: AccountService;
  translate: ((key: any, config?: any) => string) & MemoizedFunction;
}

interface TransactionListState extends ComponentState {
  transactionList?: TransactionList;
}

export class TransactionListView extends React.Component<TransactionsListProps, TransactionListState> {
  constructor(props: Readonly<TransactionsListProps>) {
    super(props);
    this.state = {
      componentState: ComponentViewState.DEFAULT,
    };
  }

  async componentDidMount() {
    const {userAccount, accountService, translate} = this.props;

    // Fetch balance
    this.setState({
      componentState: ComponentViewState.LOADING,
    });

    const response = await accountService.getTransactions(userAccount.getAccountId());
    if (response.hasData()
      && response.data) {
      this.setState({
        componentState: ComponentViewState.LOADED,
        transactionList: response.data,
      });
    } else {
      const msg = response.error || translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  renderTransaction = ({item}) => {
    const dateStr = moment(item.paidOn).format('MM/DD/YYYY');
    return (
      <View style={styles.rowItem}>
        <View style={styles.rowDescription}>
          <Text style={styles.rowTitle}>{item.merchantName}</Text>
          <Text style={styles.rowSubtitle}>{dateStr}</Text>
        </View>
        <View>
          <CurrencyText value={item.amount} style={styles.rowAmount}/>
        </View>
      </View>
    );
  }

  render() {
    const {componentState, transactionList, error} = this.state;
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
          isLoaded && transactionList &&
          <FlatList
            data={transactionList.transactions}
            renderItem={this.renderTransaction}
          />
        }
      </View>
    );
  }
}
