import _, {MemoizedFunction} from 'lodash';
import moment from 'moment';
import React from 'React';
import {Text, View, ActivityIndicator, FlatList, TouchableOpacity, Image} from 'react-native';
import {styles} from './dashboard.style-impl';
import {ComponentViewState, ComponentState} from '../../../component.state';
import {TransactionList, Transaction} from '../../../models';
import {UserAccount} from '../../../models';
import {AccountService} from '../../../services';
import {CurrencyText} from '../../../components/currency-text/currency-text.component';

const emitter = require('tiny-emitter/instance');

interface TransactionsListProps {
  userAccount: UserAccount;
  accountService: AccountService;
  translate: ((key: any, config?: any) => string) & MemoizedFunction;
}

interface TransactionListState extends ComponentState {
  transactionList?: TransactionList;
  transaction?: Transaction;
}

export class TransactionListView extends React.Component<TransactionsListProps, TransactionListState> {
  constructor(props: Readonly<TransactionsListProps>) {
    super(props);
    this.state = {
      componentState: ComponentViewState.DEFAULT,
    };
    this.refresh = this.refresh.bind(this);
    emitter.on('refresh', this.refresh);
    this.transactionDetail = this.transactionDetail.bind(this);
    this.transactionList = this.transactionList.bind(this);
  }

  async refresh() {
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

  async componentDidMount() {
    this.refresh();
  }

  transactionDetail(item: Transaction) {
    this.setState({
      transaction: item,
    });
  }

  transactionList() {
    this.setState({
      transaction: undefined,
    });
  }

  renderTransaction = ({item}) => {
    const dateStr = moment(item.paidOn).format('MM/DD/YYYY');
    return (
      <TouchableOpacity onPress={() => this.transactionDetail(item)} style={styles.rowItem}>
        <View style={styles.rowDescription}>
          <Text style={styles.rowTitle}>{item.merchantName}</Text>
          <Text style={styles.rowSubtitle}>{dateStr}</Text>
        </View>
        <View>
          <CurrencyText value={item.amount} style={styles.rowAmount}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderProduct = ({item}) => {
    return (
      <View style={styles.rowDetails}>
        <Text style={styles.itemNameWidth}>{item.product.name}</Text>
        <Text style={styles.itemQuantityWidth}>{item.quantity}</Text>
        <Text style={styles.itemPriceWidth}>{`$${item.product.price}`}</Text>
        <Text style={styles.itemPriceWidth}>{`$${item.product.price * item.quantity}`}</Text>
      </View>
    );
  }

  render() {
    const {componentState, transactionList, error, transaction} = this.state;
    const {translate} = this.props;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;
    const transactionDetail = !_.isNil(transaction);
    const tax = !_.isNil(transaction) ? transaction.calculateTax() : 0;

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
          isLoaded && transactionList && !transactionDetail &&
          <FlatList
            data={transactionList.transactions}
            renderItem={this.renderTransaction}
          />
        }
        {
          isLoaded && transactionList && transactionDetail && transaction &&
          <View>
            <TouchableOpacity onPress={() => this.transactionList()}>
              <Image source={require('../../../../assets/images/icons/back_icon.png')}/>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={{marginTop: 15}}>
                <Text style={styles.rowTitle}>{translate('TRANSACTION_LIST_SCREEN.TRANSACTION_DETAIL')}</Text>
                <Text style={styles.itemStore}>{transaction.merchantName}</Text>
              </View>
            </View>
            <View>
              <View style={styles.rowHeadings}>
                <Text style={styles.itemNameWidth}>{translate('TRANSACTION_LIST_SCREEN.ITEM')}</Text>
                <Text style={styles.itemQuantityWidth}>{translate('TRANSACTION_LIST_SCREEN.QUANTITY')}</Text>
                <Text style={styles.itemPriceWidth}>{translate('TRANSACTION_LIST_SCREEN.PRICE')}</Text>
                <Text style={styles.itemPriceWidth}>{translate('TRANSACTION_LIST_SCREEN.AMOUNT')}</Text>
              </View>
              <View>
                <FlatList
                  data={transaction.cart}
                  renderItem={this.renderProduct}
                />
              </View>
              <View style={styles.rowUnderline}></View>
              <View style={styles.rowTax}>
                <Text style={styles.itemNameWidth}>{translate('TRANSACTION_LIST_SCREEN.TAX')}</Text>
                <Text style={styles.itemPriceWidth}>{`$${tax}`}</Text>
              </View>
              <View style={styles.rowTotal}>
                <Text style={styles.itemNameWidth}>{translate('TRANSACTION_LIST_SCREEN.TOTAL')}</Text>
                <Text style={styles.itemPriceWidth}>{`$${transaction.amount}`}</Text>
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}
