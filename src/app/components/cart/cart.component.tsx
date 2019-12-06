import React from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Dimensions} from 'react-native';
import {CartProps} from './cart.component.props';
import {cartStyle} from './cart.component.syle-impl';
import {CartState} from './cart.component.state';
import {ProductList, Product} from '../../models';
import {ComponentViewState} from '../../component.state';
import {Orientation} from '../../models/device-orientation';

export class Cart extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);
    this.state = {
      productsList: new ProductList(),
      orientation: Orientation.UNKNOWN,
      componentState: ComponentViewState.DEFAULT,
    };
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

  renderCartItem = ({item}) => {
    const product: Product = this.state.productsList.getProductById(item);
    const {cart} = this.props;
    const quantity = cart.getItemQuantity(item);
    return (
      <View style={cartStyle.cartItemContainer}>
        <View style={cartStyle.cartItem}>
          <View style={cartStyle.cartItemQuantity}>
            <Text style={cartStyle.quantity}>{quantity}</Text>
            <Text style={cartStyle.cartItemName}>{product.name}</Text>
          </View>
          <View style={cartStyle.cartItemPrice}>
            <Text style={cartStyle.cartItemPriceText}>{`$${Number(product.price) * quantity}`}</Text>
          </View>
        </View>
      </View>
    );
  }

  getStoreService() {
    return this.props.storeService;
  }

  async refresh() {
    const storeService = this.getStoreService();
    const storeId = this.props.storeId;
    const merchantId = this.props.merchantId;
    const response = await storeService.getProducts(storeId, merchantId);
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

  translate(key: string) {
    return this.props.translate(key, null);
  }

  componentDidMount() {
    this.refresh();
  }

  getBillingContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return cartStyle.billingContainerPotrait;
    }
  }

  getCartSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return cartStyle.cartSectionPotrait;
    }
  }

  getCartPriceSectionStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return cartStyle.cartPriceSectionPotrait;
    }
  }

  render() {
    const {cart, translate} = this.props;
    const {productsList} = this.state;
    const isProductList = productsList.products.length > 0 ? true : false;
    let subTotal;
    let total;
    let tax;
    if (isProductList) {
      subTotal = cart.getRoundedSubtotal(productsList);
      total = cart.getTotal(productsList);
      tax = cart.getTotalTax(productsList);
    }
    const isItems = !_.isNil(subTotal);
    return (
      <View>
        {
          isProductList &&
          <View style={[cartStyle.billingContainer, this.getBillingContainerStyle()]}>
            <View style={[cartStyle.cartSection, this.getCartSectionStyle()]}>
              <FlatList
                data={Array.from(cart.cart.keys())}
                renderItem={this.renderCartItem}
              />
            </View>
            <View style={[cartStyle.cartPriceSection, this.getCartPriceSectionStyle()]}>
              <View style={cartStyle.subTotalContainer}>
                <Text style={cartStyle.subTotalText}>{translate('CART_COMPONENT.SUBTOTAL')}</Text>
                  {
                    isItems && (
                      <Text style={cartStyle.subTotal}>{`$${subTotal}`}</Text>
                    )
                  }
              </View>
              <View style={cartStyle.taxContainer}>
                <Text>{translate('CART_COMPONENT.TAX')}</Text>
                {
                    isItems && (
                      <Text style={cartStyle.totalPriceText}>{`$${tax}`}</Text>
                    )
                  }
              </View>
              <View style={cartStyle.tipContainer}>
                <Text>{translate('CART_COMPONENT.TIP')}</Text>
              </View>
              <View style={cartStyle.totalContainer}>
                <Text style={cartStyle.totalText}>{translate('CART_COMPONENT.TOTAL')}</Text>
                  {
                    isItems && (
                      <Text style={cartStyle.totalPriceText}>{`$${total}`}</Text>
                    )
                  }
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}
