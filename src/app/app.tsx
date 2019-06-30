import React from 'react';
import {I18nManager} from 'react-native';
import _ from 'lodash';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';


import {AppContainer} from './routes';
import {AppNavigationScreenProps} from './app-navigation-props';
import {
  AccountsService,
  AccountsServiceImpl,
  AuthService,
  AuthServiceImpl,
  AccountService,
  AccountServiceImpl,
  TransactionService,
  TransactionServiceImpl} from './services';

export default class App extends React.Component {

  accountService: AccountService;
  accountsService: AccountsService;
  authService: AuthService;
  transactionService: TransactionService;

  readonly translationGetters = {
    en: () => require('../assets/locales/en.json'),
    de: () => require('../assets/locales/de.json'),
  };

  readonly translate = _.memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );

  constructor(props: any) {
    super(props);
    console.disableYellowBox = true; // disable warning yellow message

    this.setLocale();

    this.accountsService = new AccountsServiceImpl();
    this.authService = new AuthServiceImpl();

    this.accountService = new AccountServiceImpl(this.authService);

    this.transactionService = new TransactionServiceImpl(this.authService);
  }

  setLocale() {
    // See: https://github.com/react-native-community/react-native-localize/blob/master/example/src/SyncExample.js
    const fallback = {languageTag: 'en', isRTL: false};
    const {languageTag, isRTL} = RNLocalize.findBestAvailableLanguage(_.keys(this.translationGetters)) || fallback;

    // clear translation cache
    if (_.isFunction(this.translate.cache.clear)) {
      this.translate.cache.clear();
    }

    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    i18n.translations = {[languageTag]: (this.translationGetters as any)[languageTag]()};
    i18n.locale = languageTag;
  }

  onLocaleChanged() {
    this.setLocale();
    this.forceUpdate();
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', () => {
      this.onLocaleChanged();
    });
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', () => {
      this.onLocaleChanged();
    });
  }

  getScreenProps(): AppNavigationScreenProps {
    const {translate, accountService, accountsService, authService, transactionService} = this;
    return {
      translate,
      accountsService,
      authService,
      accountService,
      transactionService,
    };
  }

  render() {
    const dependencies = this.getScreenProps();
    return (
      // Initialize app container with all dependenices
      <AppContainer screenProps={dependencies}/>
    );
  }
}
