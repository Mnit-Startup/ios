import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity, Alert, Dimensions, FlatList} from 'react-native';

import {AppNavigationProps} from '../../../app-navigation-props';
import {ComponentViewState} from '../../../component.state';
import {appStyles} from '../../../app.style-impl';
import {Orientation} from '../../../models/device-orientation';
import {styles} from './pos.style-impl';
import {PointOfSaleScreenState} from './pos.screen.state';
import {ProductList, Product, CheckoutCart} from '../../../models';
import {Button} from '../../../components';
import * as Progress from 'react-native-progress';

export class PointOfSaleScreen extends React.Component<AppNavigationProps, PointOfSaleScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      productsList: new ProductList(),
      checkoutCart: new CheckoutCart(),
      subTotal: 0,
      totalTax: 0,
      loadingLogo: false,
      storeLogo: '',
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
    this.logout = this.logout.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.createSale = this.createSale.bind(this);
    this.onLogoLoadStartFromSource = this.onLogoLoadStartFromSource.bind(this);
    this.onLogoLoadEndFromSource = this.onLogoLoadEndFromSource.bind(this);
    this.refresh = this.refresh.bind(this);
    this.addItemTax = this.addItemTax.bind(this);
    this.removeItemTax = this.removeItemTax.bind(this);
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
    const {checkoutCart, productsList} = this.state;
    return checkoutCart.getSubtotal(productsList);
  }

  async createSale() {
    const {checkoutCart} = this.state;
    const {navigation: {navigate, getParam}, screenProps: {translate}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    if (checkoutCart.isCartEmpty()) {
      Alert.alert(translate('POINT_OF_SALE_SCREEN.EMPTY_CART'));
      return;
    }
    navigate('PaymentMode', {checkoutCart, store_id : storeId, merchant_id: merchantId});
  }

  async refresh() {
    const {navigation: {getParam}} = this.props;
    const storeId = getParam('store_id');
    const merchantId = getParam('merchant_id');
    const storeService = this.getStoreService();
    const response = await storeService.getProducts(storeId, merchantId);
    const response1 = await storeService.getStore(storeId, merchantId);
    if (response.hasData()
    && response.data && response1.hasData() && response1.data) {
      if (response.data.products.length && response1.data.image) {
        this.setState({
          componentState: ComponentViewState.LOADED,
          productsList: response.data,
          storeLogo: response1.data.image,
        });
      } else  if (response.data.products.length) {
        this.setState({
          componentState: ComponentViewState.LOADED,
          productsList: response.data,
        });
      } else if (response1.data.image) {
        this.setState({
          componentState: ComponentViewState.LOADED,
          storeLogo: response1.data.image,
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

  componentDidMount() {
    this.refresh();
  }

  /* addItemTax is a function which if item is taxable,
    calculate its applicable tax using item price and item tax rate
    add calculated tax amount to current total tax of cart
    return totalTax applicable on cart items*/
  addItemTax(item: Product): number {
    const {totalTax} = this.state;
    if (!item.taxable) {
      return totalTax;
    }
    const taxAmount: number = Number(((item.price * item.tax) / 100).toFixed(2));
    return totalTax + taxAmount;
  }

  /* removeItemTax is a function which if item is taxable,
    calulate its applicable tax using item price and item tax rate
    remove calculated tax amount from current total tax of cart
    return totalTax applicable on cart items*/
  removeItemTax(item: Product): number {
    const {totalTax} = this.state;
    if (!item.taxable) {
      return totalTax;
    }
    const taxAmount: number = Number(((item.price * item.tax) / 100).toFixed(2));
    return totalTax - taxAmount;
  }

  addItemToCart(item: Product) {
    const {checkoutCart} = this.state;
    checkoutCart.addItemToCart(item);
    const subTotal = this.getSubtotal();
    const totalTax = this.addItemTax(item);
    this.setState({
      checkoutCart,
      subTotal: Number(subTotal.toFixed(2)),
      totalTax,
    });
  }

  incrementQuantity(id: string) {
    const {checkoutCart, productsList} = this.state;
    checkoutCart.incrementItemQuantity(id);
    const subTotal = this.getSubtotal();
    const item = _.find(productsList.products, (product) => product.productId === id);
    let cartTax = 0;
    if (!_.isNil(item)) {
      cartTax = this.addItemTax(item);
    }
    this.setState({
      checkoutCart,
      subTotal: Number(subTotal.toFixed(2)),
      totalTax: cartTax,
    });
  }

  decrementQuantity(id: string) {
    const {checkoutCart, productsList} = this.state;
    checkoutCart.decrementItemQuantity(id);
    const subTotal = this.getSubtotal();
    const item = _.find(productsList.products, (product) => product.productId === id);
    let cartTax = 0;
    if (!_.isNil(item)) {
      cartTax = this.removeItemTax(item);
    }
    this.setState({
      checkoutCart,
      subTotal: Number(subTotal.toFixed(2)),
      totalTax: cartTax,
    });
  }

  renderCartItem = ({item}) => {
    const {componentState, checkoutCart} = this.state;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const product: Product = this.state.productsList.getProductById(item);
    const quantity = checkoutCart.getItemQuantity(item);
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

  onLogoLoadStartFromSource() {
    this.setState({
      loadingLogo: true,
    });
  }

  onLogoLoadEndFromSource() {
    this.setState({
      loadingLogo: false,
    });
  }

  render() {
    const {productsList, checkoutCart, subTotal, componentState, storeLogo, loadingLogo, totalTax} = this.state;
    const {screenProps: {translate}} = this.props;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const isItems = !(checkoutCart.isCartEmpty());
    const numberOfColumns = this.getNumberOfColumns();
    const isStoreLogo = !_.isEmpty(storeLogo);
    const total = subTotal + totalTax;
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../assets/images/logo/logo.png')}/>
              <View style={styles.storeLogoContainer}>
              {
                !isStoreLogo && (
                  <Image source={require('../../../../assets/images/icons/merchant_logo.png')}/>
                )
              }
              {
                isStoreLogo && loadingLogo && (
                  <View style={styles.progressBar}>
                    <Progress.Bar indeterminate={true} width={100}/>
                  </View>
                )
              }
              {
                isStoreLogo && (
                  <TouchableOpacity>
                    <Image style={styles.storeLogo} onLoadStart={this.onLogoLoadStartFromSource}
                    onLoad={this.onLogoLoadEndFromSource}
                    source={{uri: storeLogo}}/>
                  </TouchableOpacity>
                )
              }
              </View>
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
                      data={Array.from(checkoutCart.cart.keys())}
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
                      <Text>{translate('POINT_OF_SALE_SCREEN.TAX')}</Text>
                      {
                        isItems && (
                          <Text>{`$${totalTax}`}</Text>
                        )
                      }
                    </View>
                    <View style={styles.tipContainer}>
                      <Text>{translate('POINT_OF_SALE_SCREEN.TIP')}</Text>
                    </View>
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalText}>{translate('POINT_OF_SALE_SCREEN.TOTAL')}</Text>
                      {
                        isItems && (
                          <Text style={styles.totalPriceText}>{`$${total}`}</Text>
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

