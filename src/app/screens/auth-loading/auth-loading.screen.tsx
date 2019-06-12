import _ from 'lodash';
import React from 'react';
import {SafeAreaView, View, Text, ActivityIndicator} from 'react-native';
import {AppNavigationProps} from '../../app-navigation-props';
import {ComponentViewState} from '../../component.state';
import {User} from '../../models';
import {AuthLoadingScreenState} from './auth-loading.screen.state';

import {styles} from './auth-loading.style-impl';

export class AuthLoadingScreen extends React.Component<AppNavigationProps, AuthLoadingScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      componentState: ComponentViewState.DEFAULT,
      error: '',
    };
    this.loadAccountDetails = this.loadAccountDetails.bind(this);
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  async componentDidMount() {
    const {navigation: {navigate}, screenProps: {authService}} = this.props;
    const userResponse = await authService.getUser();
    if (userResponse
      && userResponse.data
      && userResponse.data.isUserLoggedIn()) {
      this.loadAccountDetails(userResponse.data);
    } else {
      navigate('SignIn');
    }
  }

  async loadAccountDetails(user: User) {
    const {navigation: {navigate}, screenProps: {accountService}} = this.props;
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const response = await accountService.getDetails(user.getAccountId());
    if (response.hasData()
    && response.data) {
      this.setState({
        componentState: ComponentViewState.LOADED,
      });
      navigate(`${_.startCase(response.data.getRole())}Dashboard`, {user_account: response.data});
    } else {
      const msg = response.error || this.translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
    }
  }

  render() {
    const {componentState, error} = this.state;
    const {screenProps: {translate}} = this.props;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;

    return (
      <View style={styles.rootView}>
        {
          isLoading &&
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='small' color='#000'/>
            <Text> {translate('LOADING_ACCOUNT')}</Text>
          </View>
        }
        {
          isError &&
          <View style={styles.errorContainer}>
            <Text style={styles.messageError}>{error}</Text>
          </View>
        }
      </View>
    );
  }
}
