import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView,
  View, Image, TouchableOpacity,
  Dimensions, FlatList, ActivityIndicator, Alert} from 'react-native';

import {Button} from '../../../../components';
import {AppNavigationProps} from '../../../../app-navigation-props';
import {ComponentViewState} from '../../../../component.state';
import {appStyles} from '../../../../app.style-impl';
import {styles} from './assign-store.style-impl';
import {AssignStoreScreenState} from './assign-store.screen.state';
import {Orientation} from '../../../../models/device-orientation';
import {NavigationEventSubscription} from 'react-navigation';
import {Store, Employee, EmployeeDetail} from '../../../../models';
import {CheckBox} from 'react-native-elements';

export class AssignStoreScreen extends React.Component<AppNavigationProps, AssignStoreScreenState> {

  // @ts-ignore
  focusListner: NavigationEventSubscription;

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      assignedStores: [],
      addedStores: [],
      removedStores: [],
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
    this.isChecked = this.isChecked.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.assignStores = this.assignStores.bind(this);
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
    const {navigation: {getParam}} = this.props;
    const employee: Employee = getParam('item');
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const storeService = this.getStoreService();
    const response = await storeService.getStores();
    if (response.hasData()
       && response.data) {
         if (response.data.stores.length && employee.stores) {
          this.setState({
            componentState: ComponentViewState.LOADED,
            storeList: response.data,
            assignedStores: employee.stores,
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

  getManageUsersLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.manageUsersLogoPortraitStyle;
    }
  }

  async assignStores() {
    const {navigation: {getParam}} = this.props;
    const employee: Employee = getParam('item');
    if (this.state.addedStores.length === 0 && this.state.removedStores.length === 0) {
      Alert.alert(this.translate('ASSIGN_STORE_SCREEN.ASSIGNED_STORE_SUCCESS'));
      return;
    }
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    let success = 0;
    const storeService = this.getStoreService();
      for (const store of this.state.addedStores) {
      if (employee.empId) {
        const employeeDetail: EmployeeDetail = {
          empId: employee.empId,
          store,
          role: employee.role,
          active: true,
        };
        const response = await storeService.addEmployee(employeeDetail);
        if (response.hasData()
        && response.data) {
          success = 1;
        } else {
          success = 0;
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
          break;
        }
      }
    }

    for (const store of this.state.removedStores) {
      if (employee.empId) {
        const employeeDetail: EmployeeDetail = {
          empId: employee.empId,
          store,
          role: employee.role,
          active: true,
        };
        const response = await storeService.removeEmployee(employeeDetail);
        if (response.hasData()
        && response.data) {
          success = 1;
        } else {
          success = 0;
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
          break;
        }
      }
    }

    if (success) {
      if (this.state.removedStores.length > 0 && this.state.addedStores.length === 0) {
        Alert.alert(this.translate('ASSIGN_STORE_SCREEN.REMOVE_EMP_FR0M_STORE_SUCCESS'));
      } else  {
        Alert.alert(this.translate('ASSIGN_STORE_SCREEN.ASSIGNED_STORE_SUCCESS'));
      }
      this.setState({
        componentState: ComponentViewState.LOADED,
        addedStores: [],
        removedStores: [],
      });
    }
  }

  async onToggle(store: Store, checked: boolean) {
      const deselectedStore = this.state.removedStores;
      const selectedStores = this.state.addedStores;
      const assignedStores = this.state.assignedStores;
      if (checked) {
        _.remove(selectedStores, (storeId) => storeId === store.storeId);
        if (store.storeId) {
          deselectedStore.push(store.storeId);
          this.setState({
            removedStores: deselectedStore,
            addedStores: selectedStores,
          });
        }
      } else {
        if (store.storeId) {
          _.remove(deselectedStore, (storeId) => storeId === store.storeId);
            selectedStores.push(store.storeId);
          this.setState({
            removedStores: deselectedStore,
            addedStores: selectedStores,
          });
        }
      }
  }

  isChecked(store: Store) {
    if (store.storeId) {
      if (this.state.assignedStores.indexOf(store.storeId) !== -1
      && this.state.removedStores.indexOf(store.storeId) === -1 ||
      this.state.addedStores.indexOf(store.storeId) !== -1) {
        return true;
      }
    }
    return false;
  }

  renderStore = ({item}) => {
    const checked = this.isChecked(item);
    return (
        <TouchableOpacity onPress={() => this.onToggle(item, checked)} style={{backgroundColor: 'transparent', borderBottomWidth: 0}}>
        <View style={styles.storeListItemContainer}>
        <CheckBox
          key={item.storeId}
          onPress={() => this.onToggle(item, checked)}
          title={<Text style={{fontSize: 24, marginLeft: 10}}>{`${item.name}, ${item.streetAddress}`}</Text>}
          checked={checked}
          checkedIcon='check-circle'
          uncheckedIcon='circle-o'
          containerStyle={{backgroundColor: 'white', borderColor: 'white', borderWidth: 2}}
        />
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
    const {screenProps: {translate}, navigation: {navigate, getParam, goBack}} = this.props;

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../assets/images/logo/logo.png')}/>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'row'}, this.getContainerStyle()]}>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigate('ManageStore')}>
              <Image style={[styles.manageUsersLogoStyle, this.getManageUsersLogoStyle()]}
              source={require('../../../../../assets/images/icons/manage_users_icon.png')}/>
              <Text>{translate('ASSIGN_STORE_SCREEN.MANAGE_USERS')}</Text>
              </TouchableOpacity>
            {
              isLoaded && storeList && (
              <View style={this.getContainerStyle()}>
              <View style={[styles.storeListContainer, this.getStoreListContainerStyle()]}>
                {
                    <View style={[styles.storeList, this.getStoreListStyle()]}>
                    <FlatList
                      data={storeList.stores}
                      renderItem={this.renderStore}
                      onRefresh={this.refresh}
                      refreshing={isLoading}
                      keyExtractor={(item) => `${item['name']} ${item['streetAddress']}`}
                      extraData={this.state.addedStores.length + this.state.removedStores.length}
                    />
                    </View>
                }
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={() => this.assignStores()}
                  disabled={isLoading}
                  showActivityIndicator={isLoading}
                  text={translate('ASSIGN_STORE_SCREEN.ADD')}
                  />
                  <Button
                  type={'btn-danger'}
                  onPress={() => goBack()}
                  text={translate('ASSIGN_STORE_SCREEN.CANCEL')}
                  />
                </View>
            </View>
              )
            }
            {
              isEmpty && (
                <TouchableOpacity style={this.getCreateStoreLogoContainerStyle()} onPress={() => navigate('CreateStore')}>
                  <Image style={[styles.createStoreLogoStyle, this.getCreateStoreLogoStyle()]}
                  source={require('../../../../../assets/images/icons/create_store_icon.png')}/>
                  <Text style={styles.createStoreLogoSubTextStyle}>{translate('ASSIGN_STORE_SCREEN.ADD_STORE')}</Text>
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
