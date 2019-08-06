import {NavigationScreenProps} from 'react-navigation';
import {MemoizedFunction} from 'lodash';
import {AccountsService, AuthService, AccountService, TransactionService, StoreService} from './services';

export interface AppNavigationScreenProps {
  accountsService: AccountsService;
  authService: AuthService;
  accountService: AccountService;
  transactionService: TransactionService;
  translate: ((key: any, config?: any) => string) & MemoizedFunction;
  storeService: StoreService;
}

/**
 * This interface defines properties for all the top level navigation screens
 * All the app dependencies are injected into screenProps and is accessed via
 * it in all top level screens. In case a child component needs it, it is further
 * passed down to child component via screens
 */
export interface AppNavigationProps extends NavigationScreenProps {
  screenProps: AppNavigationScreenProps;
}
