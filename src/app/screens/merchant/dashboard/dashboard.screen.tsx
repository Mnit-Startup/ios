import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView,
  View, Image, TouchableOpacity,
  Dimensions, FlatList, ActivityIndicator} from 'react-native';
import {AsyncStorage} from 'react-native';

import {Button} from '../../../components';
import {AppNavigationProps} from '../../../app-navigation-props';
import {ComponentViewState} from '../../../component.state';
import {appStyles} from '../../../app.style-impl';
import {styles} from './dashboard.screen.style-impl';
import {MerchantDashboardScreenState} from './dashboard.screen.state';
import {Orientation} from '../../../models/device-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationEventSubscription} from 'react-navigation';
import {Store} from '../../../models';


export class MerchantDashboardScreen extends React.Component<AppNavigationProps, MerchantDashboardScreenState> {

  static readonly STORE_ID = 'store_id';
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
    this.focusListner.remove();
  }

  async refresh() {
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const storeService = this.getStoreService();
    const response = await storeService.getStores();
    if (response.hasData()
       && response.data) {
         if (response.data.stores.length) {
          this.setState({
            componentState: ComponentViewState.LOADED,
            storeList: response.data,
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

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  getStoreService() {
    return this.props.screenProps.storeService;
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.orientationPortrait;
    }
  }

  getStoreListContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.storeListContainerPortrait;
    }
  }

  getStoreListStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.storeListPortrait;
    }
  }

  getCreateStoreLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.createStoreLogoPortraitStyle;
    }
  }

  getCreateStoreLogoContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.createStoreLogoContainerPortraitStyle;
    }
  }

  getManageStoreLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.manageStoreLogoPortraitStyle;
    }
  }

  async createNew(item) {
    const store_id = item.storeId;
    this.props.navigation.navigate('StoreDashboard', {store_id});
  }

  renderStore = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.createNew(item)} style={{backgroundColor: 'transparent'}}>
        <View style={styles.storeListItemContainer}>
          <Text style={styles.storeListItem}>{`${item.name}, ${item.streetAddress}`}</Text>
          <Icon color={'#A3ADB4'} name='chevron-right'></Icon>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    const {componentState, storeList, error} = this.state;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isEmpty = componentState === ComponentViewState.NO_DATA;
    const isError = componentState === ComponentViewState.ERROR;
    const {screenProps: {translate}, navigation: {navigate}} = this.props;
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../assets/images/logo/logo.png')}/>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'column'}]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                <Image style={[styles.manageStoreLogoStyle, this.getManageStoreLogoStyle()]}
                source={require('../../../../assets/images/icons/manage_store_icon.png')}/>
                <Text>{translate('MERCHANT_DASHBOARD.SELECT_STORE')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  navigate('CashiersDashboard')} style={{alignItems: 'center'}}>
                <Image style={[styles.manageStoreLogoStyle, this.getManageStoreLogoStyle()]}
                source={require('../../../../assets/images/icons/manage_users_icon.png')}/>
                <Text>{translate('MERCHANT_DASHBOARD.MANAGE_USERS')}</Text>
            </TouchableOpacity>
              </View>
            {
              isLoaded && storeList && (
              <View>
              <View style={[styles.storeListContainer, this.getStoreListContainerStyle()]}>
                {
                    <View style={[styles.storeList, this.getStoreListStyle()]}>
                    <FlatList
                    data={storeList.stores}
                    renderItem={this.renderStore}
                    onRefresh={this.refresh}
                    refreshing={isLoading}
                    keyExtractor={(item) => `${item['name']} ${item['streetAddress']}`}
                    />
                    </View>
                }
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={() => navigate('CreateStore')}
                  disabled={isLoading}
                  showActivityIndicator={isLoading}
                  text={translate('MERCHANT_DASHBOARD.CREATE_NEW_STORE')}
                  />
                </View>
            </View>
              )
            }
            {
              isEmpty && (
                <TouchableOpacity style={[styles.createStoreLogoContainer, this.getCreateStoreLogoContainerStyle()]}
                onPress={() => navigate('CreateStore')}>
                  <Image style={[styles.createStoreLogoStyle, this.getCreateStoreLogoStyle()]}
                  source={require('../../../../assets/images/icons/create_store_icon.png')}/>
                  <Text>{translate('MERCHANT_DASHBOARD.CREATE_STORE')}</Text>
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
