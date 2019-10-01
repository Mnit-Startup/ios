import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView,
  View, Image, TouchableOpacity,
  Dimensions, FlatList, ActivityIndicator, Alert} from 'react-native';

import {Button} from '../../../../../components';
import {AppNavigationProps} from '../../../../../app-navigation-props';
import {ComponentViewState} from '../../../../../component.state';
import {appStyles} from '../../../../../app.style-impl';
import {styles} from './cashierDashboard.style-impl';
import {CashierDashboardScreenState} from './cashierDashboard.screen.state';
import {Orientation} from '../../../../../models/device-orientation';
import {NavigationEventSubscription} from 'react-navigation';
import {EmployeeRole} from '../../../../../shared';

export class CashiersDashboardScreen extends React.Component<AppNavigationProps, CashierDashboardScreenState> {

  // @ts-ignore
  focusListner: NavigationEventSubscription;

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
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
    this.focusListner = this.props.navigation.addListener('willFocus', async () => {
      await this.refresh();
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.getOrientation);
  }

  async refresh() {
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const merchantService = this.getMerchantService();
    const response = await merchantService.getEmployees(EmployeeRole.CASHIER);
    if (response.hasData()
       && response.data) {
         if (response.data.employees.length) {
          this.setState({
            componentState: ComponentViewState.LOADED,
            cashierList: response.data,
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

  async componentDidMount() {
    this.refresh();
  }

  translate(key: string, options?: any) {
    return this.props.screenProps.translate(key, options);
  }

  getMerchantService() {
    return this.props.screenProps.merchantService;
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.orientationPortrait;
    }
  }

  getCashierListContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.cashierListContainerPortrait;
    }
  }

  getCashierListStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.cashierListPortrait;
    }
  }

  getCreateUserLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.createCashierLogoPortraitStyle;
    }
  }

  getCreateUserLogoContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.createCashierLogoContainerPortraitStyle;
    }
  }

  getManageUsersLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.manageUsersLogoPortraitStyle;
    }
  }

  async assignCashier(item) {
    this.props.navigation.navigate('AssignStore', {item});
  }

  async editCashier(item) {
    const empId = item.empId;
    this.props.navigation.navigate('EditCashier', {empId});
  }

  async deleteProduct(empId: string) {
    const merchantService = this.getMerchantService();
    const response = await merchantService.removeEmployee(empId, EmployeeRole.CASHIER);
    if (response.hasData()
    && response.data) {
      Alert.alert(this.translate('MANAGE_USERS_SCREEN.DELETE_SUCCESS'));
    } else {
      const msg = response.error || this.translate('no_internet');
      Alert.alert(msg);
    }
    this.refresh();
  }

  deleteCashierAlert(item) {
    Alert.alert(
      this.translate('MANAGE_USERS_SCREEN.DELETE_PRODUCT'),
      this.translate('MANAGE_USERS_SCREEN.DELETE_PRODUCT_CONFIRMATION', {
        cashier: item.name,
      }),
      [
        {
          text: this.translate('MANAGE_USERS_SCREEN.CANCEL_ALERT_TEXT'),
          style: 'cancel',
        },
        {
          text: this.translate('MANAGE_USERS_SCREEN.DELETE'),
          onPress: () => this.deleteProduct(item.empId),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  }

  renderCashier = ({item}) => {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <View style={styles.cashierListItemContainer}>
          <View style={styles.cashierNameNumberContainer}>
          <View><Text style={[styles.cashierListItem, styles.cashierListItemName]}>{`${item.name}`}</Text></View>
          <View style={styles.cashierListItemNumberContainer}><Text style={styles.cashierListItem}>{`${item.empNumber}`}</Text></View>
          </View>
          <View style={styles.cashierListItemButtonContainer}>
            <TouchableOpacity onPress={() => this.assignCashier(item)} style={styles.cashierListItemAssignButton}>
              <Text style={styles.cashierListItemButton}>{'Assign'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.editCashier(item)} style={styles.cashierListItemEditButton}>
              <Text style={styles.cashierListItemButton}>{'Edit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteCashierAlert(item)} style={styles.cashierListItemDeleteButton}>
              <Text style={styles.cashierListItemButton}>{'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {

    const {componentState, cashierList, error} = this.state;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isEmpty = componentState === ComponentViewState.NO_DATA;
    const isError = componentState === ComponentViewState.ERROR;
    const {screenProps: {translate}, navigation: {navigate, getParam, goBack}} = this.props;
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../../assets/images/logo/logo.png')}/>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'row'}, this.getContainerStyle()]}>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigate('ManageStore')}>
              <Image style={[styles.manageUsersLogoStyle, this.getManageUsersLogoStyle()]}
              source={require('../../../../../../assets/images/icons/manage_users_icon.png')}/>
              <Text>{translate('MANAGE_USERS_SCREEN.MANAGE_USERS')}</Text>
              </TouchableOpacity>
            {
              isLoaded && cashierList && (
              <View style={this.getContainerStyle()}>
              <View style={[styles.cashierListContainer, this.getCashierListContainerStyle()]}>
                {
                    <View style={[styles.cashierList, this.getCashierListStyle()]}>
                    <FlatList
                    data={cashierList.employees}
                    renderItem={this.renderCashier}
                    onRefresh={this.refresh}
                    refreshing={isLoading}
                    keyExtractor={(item) => `${item['name']} ${item['empNumber']}`}
                    />
                    </View>
                }
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={() => navigate('CreateCashier')}
                  disabled={isLoading}
                  showActivityIndicator={isLoading}
                  text={translate('MANAGE_USERS_SCREEN.CREATE_NEW_USER')}
                  />
                  <Button
                  type={'btn-danger'}
                  onPress={() => goBack()}
                  text={translate('MANAGE_USERS_SCREEN.CANCEL')}
                  />
                </View>
            </View>
              )
            }
            {
              isEmpty && (
                <TouchableOpacity style={this.getCreateUserLogoContainerStyle()} onPress={() => navigate('CreateCashier')}>
                  <Image style={[styles.createCashierLogoStyle, this.getCreateUserLogoStyle()]}
                  source={require('../../../../../../assets/images/icons/add_user_icon.png')}/>
                  <Text style={styles.createCashierLogoSubTextStyle}>{translate('MANAGE_USERS_SCREEN.ADD_CASHIER')}</Text>
                </TouchableOpacity>
              )
            }
            {
              isLoading && (
                <View style={styles.loadAndErrorContainer}>
                  <ActivityIndicator size='small' color='#000000'/>
                </View>
              )
            }
            {
              isError && (
                <View style={styles.loadAndErrorContainer}>
                  <Text style={styles.messageError}>{error}</Text>
                </View>
              )
            }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
