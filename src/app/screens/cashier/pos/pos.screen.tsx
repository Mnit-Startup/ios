import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity, Alert, Dimensions, FlatList} from 'react-native';

import {AppNavigationProps} from '../../../app-navigation-props';
import {ComponentViewState} from '../../../component.state';
import {appStyles} from '../../../app.style-impl';
import {Orientation} from '../../../models/device-orientation';
import {styles} from './pos.style-impl';
import {PointOfSaleScreenState} from './pos.screen.state';
import {ProductList, Product} from '../../../models';
import {Button} from '../../../components';

export class PointOfSaleScreen extends React.Component<AppNavigationProps, PointOfSaleScreenState> {
  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      productsList: new ProductList(),
      cart: new Map<string, number>(),
      subTotal: '',
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
    this.logout = this.logout.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.createSale = this.createSale.bind(this);
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
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.getOrientation);
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  getStoreService() {
    return this.props.screenProps.storeService;
  }

  getSubtotal() {
    const cart = this.state.cart;
    const productsList = this.state.productsList;
    let subTotal = 0;
    cart.forEach((value, key) => {
      const product: Product = productsList.getProductById(key);
      subTotal += Number(product.price) * value;
    });
    return subTotal;
  }

  async createSale() {
    const cart = this.state.cart;
    const {navigation: {getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    if (cart.size === 0) {
      return;
    }
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const storeService = this.getStoreService();
    const response = await storeService.createTransaction(cart, merchantId, storeId);
    if (response.hasData()
        && response.data) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          // on success render screen: options to pay with different modes
        } else {
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
        }
  }

  async refresh() {
    const {navigation: {getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const storeService = this.getStoreService();
    const response = await storeService.getProducts(storeId, merchantId);
    if (response.hasData()
    && response.data) {
      if (response.data.products.length) {
        this.setState({
          componentState: ComponentViewState.LOADED,
          productsList: response.data,
        });
      } else  {
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

  componentDidMount() {
    this.refresh();
  }

  addItemToCart(item) {
    const cart = this.state.cart;
    cart.set(item.productId, 1);
    const subTotal = this.getSubtotal();
    this.setState({
      cart,
      subTotal: subTotal.toFixed(2),
    });
  }

  incrementQuantity(item) {
    const cart = this.state.cart;
    let quantity: number = cart.get(item);
    quantity++;
    cart.set(item, quantity);
    const subTotal = this.getSubtotal();
    this.setState({
      cart,
      subTotal: subTotal.toFixed(2),
    });
  }

  decrementQuantity(item) {
    const cart = this.state.cart;
    let quantity: number = cart.get(item);
    if (quantity === 1) {
      cart.delete(item);
    } else {
      quantity--;
      cart.set(item, quantity);
    }
    const subTotal = this.getSubtotal();
    this.setState({
      cart,
      subTotal: subTotal.toFixed(2),
    });
  }

  renderCartItem = ({item}) => {
    const {componentState} = this.state;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const product: Product = this.state.productsList.getProductById(item);
    const cart = this.state.cart;
    const quantity = cart.get(item);
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItem}>
          <Text style={styles.cartItemName}>{product.name}</Text>
          <View style={styles.cartItemQuantity}>
            <TouchableOpacity disabled={isComponentLoading} onPress={() => this.decrementQuantity(item)}>
              <Image style={styles.incrementQuantity} source={require('../../../../assets/images/icons/subtract_icon.png')} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity disabled={isComponentLoading} onPress={() => this.incrementQuantity(item)}>
              <Image style={styles.decrementQuantity} source={require('../../../../assets/images/icons/add_icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.cartItemPrice}>
            <Text style={styles.cartItemPriceText}>{`$${Number(product.price) * quantity}`}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderProduct = ({item}) => {
    const {componentState} = this.state;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const isImage = _.isEmpty(item.image);
    return (
      <TouchableOpacity disabled={isComponentLoading} onPress={() => this.addItemToCart(item)} style={styles.productContainer}>
        <View style={styles.productNamePrice}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
        </View>
        { !isImage && (
          <Image style={styles.productImage} source={{uri: item.image}}/>
        )
        }
        {
          isImage && (
            <Image style={styles.productImage} source={require('../../../../assets/images/icons/dummy_product_image_icon.png')}/>
          )
        }
      </TouchableOpacity>
    );
  }

  logout() {
    const {navigation: {navigate}} = this.props;
    this.props.screenProps.authService.logout();
    navigate('SignIn');
  }

  getNumberOfColumns() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return 2;
    }
    return 3;
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.containerPotrait;
    }
  }

  getProductsSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.productsSectionPotrait;
    }
  }

  getBillingSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.billingSectionPotrait;
    }
  }

  getProductContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.productsContainerPotrait;
    }
  }

  getBillingContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.billingContainerPotrait;
    }
  }

  getCartSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.cartSectionPotrait;
    }
  }

  getCartPriceSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.cartPriceSectionPotrait;
    }
  }

  render() {
    const {productsList, cart, subTotal, componentState} = this.state;
    const {screenProps: {translate}} = this.props;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const isItems = !_.isEmpty(subTotal);
    const numberOfColumns = this.getNumberOfColumns();
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../assets/images/logo/logo.png')}/>
              <Image source={require('../../../../assets/images/icons/merchant_logo.png')}/>
            </View>
            <View style={[styles.container, this.getContainerStyle()]}>
              <View style={[styles.productsSection, this.getProductsSectionStyle()]}>
                <View style={[styles.productsContainer, this.getProductContainerStyle()]}>
                  <FlatList
                    data={productsList.products}
                    renderItem={this.renderProduct}
                    numColumns={numberOfColumns}
                    key={this.state.orientation === Orientation.POTRAIT ? 'v' : 'h'}
                    extraData={isComponentLoading}
                  />
                </View>
                <TouchableOpacity onPress={this.logout} style={{marginLeft: 20}}>
                  <Image source={require('../../../../assets/images/icons/logout_icon.png')} />
                </TouchableOpacity>
              </View>
              <View style={[styles.billingSection, this.getBillingSectionStyle()]}>
                <View style={[styles.billingContainer, this.getBillingContainerStyle()]}>
                  <View style={[styles.cartSection, this.getCartSectionStyle()]}>
                    <FlatList
                      data={Array.from(cart.keys())}
                      renderItem={this.renderCartItem}
                    />
                  </View>
                  <View style={[styles.cartPriceSection, this.getCartPriceSectionStyle()]}>
                    <View style={styles.subTotalContainer}>
                      <Text style={styles.subTotalText}>{translate('POINT_OF_SALE_SCREEN.SUBTOTAL')}</Text>
                      {
                        isItems && (
                          <Text style={styles.subTotal}>{`$${subTotal}`}</Text>
                        )
                      }
                    </View>
                    <View style={styles.taxContainer}>
                      <Text>{translate('POINT_OF_SALE_SCREEN.PAY')}</Text>
                    </View>
                    <View style={styles.tipContainer}>
                      <Text>{translate('POINT_OF_SALE_SCREEN.TIP')}</Text>
                    </View>
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalText}>{translate('POINT_OF_SALE_SCREEN.TOTAL')}</Text>
                      {
                        isItems && (
                          <Text style={styles.totalPriceText}>{`$${subTotal}`}</Text>
                        )
                      }
                    </View>
                  </View>
                </View>
                <View style={styles.payButtonContainer}>
                    <Button
                      text={translate('POINT_OF_SALE_SCREEN.PAY')}
                      onPress={this.createSale}
                      disabled={isComponentLoading}
                      type={'btn-primary'}
                    />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

