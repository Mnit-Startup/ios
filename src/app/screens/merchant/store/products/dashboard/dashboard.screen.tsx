import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView,
  View, Image, TouchableOpacity,
  Dimensions, FlatList, ActivityIndicator, Alert} from 'react-native';

import {Button} from '../../../../../components';
import {AppNavigationProps} from '../../../../../app-navigation-props';
import {ComponentViewState} from '../../../../../component.state';
import {appStyles} from '../../../../../app.style-impl';
import {styles} from './dashboard.style-impl';
import {ProductsDashboardScreenState} from './dashboard.screen.state';
import {Orientation} from '../../../../../models/device-orientation';
import {NavigationEventSubscription} from 'react-navigation';
import {Product} from '../../../../../models';

export class ProductsDashboardScreen extends React.Component<AppNavigationProps, ProductsDashboardScreenState> {

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
  }

  async refresh() {
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const store_id = getParam('store_id');
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const storeService = this.getStoreService();
    const response = await storeService.getProducts(store_id);
    if (response.hasData()
       && response.data) {
         if (response.data.products.length) {
          this.setState({
            componentState: ComponentViewState.LOADED,
            productsList: response.data,
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

  getManageStoreLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.manageStoreLogoPortraitStyle;
    }
  }

  async editProduct(item) {
    const {navigation: {getParam}} = this.props;
    const store_id = getParam('store_id');
    const product_id = item.productId;
    this.props.navigation.navigate('EditProduct', {product_id, store_id});
  }

  async deleteProduct(productId: String) {
    const {navigation: {getParam}} = this.props;
    const store_id = getParam('store_id');
    const storeService = this.getStoreService();
    const response = await storeService.removeProduct(store_id, productId);
    if (response.hasData()
    && response.data) {
      Alert.alert(this.translate('MANAGE_PRODUCTS_SCREEN.DELETE_SUCCESS'));
    } else {
      const msg = response.error || this.translate('no_internet');
      Alert.alert(msg);
    }
    this.refresh();
  }

  deleteProductAlert(item) {
    Alert.alert(
      this.translate('MANAGE_PRODUCTS_SCREEN.DELETE_PRODUCT'),
      this.translate('MANAGE_PRODUCTS_SCREEN.DELETE_PRODUCT_CONFIRMATION', {
        product: item.name,
      }),
      [
        {
          text: this.translate('MANAGE_PRODUCTS_SCREEN.CANCEL_ALERT_TEXT'),
          style: 'cancel',
        },
        {
          text: this.translate('MANAGE_PRODUCTS_SCREEN.DELETE'),
          onPress: () => this.deleteProduct(item.productId),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  }

  renderStore = ({item}) => {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <View style={styles.productListItemContainer}>
          <View style={styles.productNamePriceContainer}>
          <View><Text style={[styles.productListItem, styles.productListItemName]}>{`${item.name}`}</Text></View>
          <View style={styles.productListItemPriceContainer}><Text style={styles.productListItem}>{`$${item.price}`}</Text></View>
          </View>
          <View style={styles.productListItemButtonContainer}>
            <TouchableOpacity onPress={() => this.editProduct(item)} style={styles.productListItemEditButton}>
              <Text style={styles.productListItemButton}>{'Edit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteProductAlert(item)} style={styles.productListItemDeleteButton}>
              <Text style={styles.productListItemButton}>{'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {

    const {componentState, productsList, error} = this.state;
    const isLoaded = componentState === ComponentViewState.LOADED;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isEmpty = componentState === ComponentViewState.NO_DATA;
    const isError = componentState === ComponentViewState.ERROR;
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const store_id = getParam('store_id');
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../../assets/images/logo/logo.png')}/>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'row'}, this.getContainerStyle()]}>
              <TouchableOpacity onPress={() => navigate('ManageStore')}>
              <Image style={[styles.manageStoreLogoStyle, this.getManageStoreLogoStyle()]}
              source={require('../../../../../../assets/images/icons/dummy_product_image_icon.png')}/>
              <Text style={styles.manageStoreLogoSubTextStyle}>{translate('MANAGE_PRODUCTS_SCREEN.MANAGE_PRODUCTS')}</Text>
              </TouchableOpacity>
            {
              isLoaded && productsList && (
              <View style={this.getContainerStyle()}>
              <View style={[styles.storeListContainer, this.getStoreListContainerStyle()]}>
                {
                    <View style={[styles.storeList, this.getStoreListStyle()]}>
                    <FlatList
                    data={productsList.products}
                    renderItem={this.renderStore}
                    onRefresh={this.refresh}
                    refreshing={isLoading}
                    keyExtractor={(item) => `${item['name']} ${item['price']}`}
                    />
                    </View>
                }
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={() => navigate('CreateProduct', {store_id})}
                  disabled={isLoading}
                  showActivityIndicator={isLoading}
                  text={translate('MANAGE_PRODUCTS_SCREEN.CREATE_NEW_PRODUCT')}
                  />
                  <Button
                  type={'btn-danger'}
                  onPress={() => navigate('ManageStore')}
                  text={translate('MANAGE_PRODUCTS_SCREEN.CANCEL')}
                  />
                </View>
            </View>
              )
            }
            {
              isEmpty && (
                <TouchableOpacity style={this.getCreateStoreLogoContainerStyle()} onPress={() => navigate('CreateProduct', {store_id})}>
                  <Image style={[styles.createStoreLogoStyle, this.getCreateStoreLogoStyle()]}
                  source={require('../../../../../../assets/images/icons/add_product_icon.png')}/>
                  <Text style={styles.createStoreLogoSubTextStyle}>{translate('MANAGE_PRODUCTS_SCREEN.ADD_PRODUCT')}</Text>
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
