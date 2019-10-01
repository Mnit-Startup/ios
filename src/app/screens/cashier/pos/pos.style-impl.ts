import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface PointOfSaleScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  cartItemContainer: ViewStyle;
  cartItem: ViewStyle;
  cartItemName: TextStyle;
  cartItemQuantity: ViewStyle;
  incrementQuantity: ImageStyle;
  quantity: TextStyle;
  decrementQuantity: ImageStyle;
  cartItemPrice: ViewStyle;
  cartItemPriceText: TextStyle;
  productContainer: ViewStyle;
  productNamePrice: ViewStyle;
  productName: TextStyle;
  productPrice: TextStyle;
  productImage: ImageStyle;
  container: ViewStyle;
  containerPotrait: ViewStyle;
  productsSection: ViewStyle;
  productsSectionPotrait: ViewStyle;
  productsContainer: ViewStyle;
  productsContainerPotrait: ViewStyle;
  billingSection: ViewStyle;
  billingSectionPotrait: ViewStyle;
  billingContainer: ViewStyle;
  billingContainerPotrait: ViewStyle;
  cartSection: ViewStyle;
  cartSectionPotrait: ViewStyle;
  cartPriceSection: ViewStyle;
  cartPriceSectionPotrait: ViewStyle;
  subTotalContainer: ViewStyle;
  subTotalText: TextStyle;
  subTotal: TextStyle;
  taxContainer: ViewStyle;
  tipContainer: ViewStyle;
  totalContainer: ViewStyle;
  totalText: TextStyle;
  totalPriceText: TextStyle;
  payButtonContainer: ViewStyle;
}
export const styles = StyleSheet.create<PointOfSaleScreenStyle>({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemContainer: {
    backgroundColor: 'transparent',
    borderColor: '#A3ADB4',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 24,
    width: '35%',
  },
  cartItemQuantity: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
  },
  incrementQuantity: {
    height: 25,
    width: 25,
  },
  quantity: {
    fontSize: 24,
  },
  decrementQuantity: {
    height: 25,
    width: 25,
  },
  cartItemPrice: {
    width: '30%',
    alignItems: 'flex-end',
  },
  cartItemPriceText: {
    fontSize: 24,
  },
  productContainer: {
    borderColor: 'gray',
    borderWidth: 2,
    margin: 10,
  },
  productNamePrice: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
  },
  productName: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: 20,
  },
  productImage: {
    height: 175,
    width: 175,
  },
  container: {
    flexDirection: 'row',
    height: 650,
  },
  containerPotrait: {
    flexDirection: 'row',
    height: 900,
  },
  productsSection: {
    flex: 2,
  },
  productsSectionPotrait: {
    flex: 3,
  },
  productsContainer: {
    height: 600,
    marginLeft: 20,
  },
  productsContainerPotrait: {
    height: 850,
  },
  billingSection: {
    flex: 1,
  },
  billingSectionPotrait: {
    flex: 2,
  },
  billingContainer: {
    height: 525,
    justifyContent: 'space-between',
    marginRight: 20,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  billingContainerPotrait: {
    height: 780,
  },
  cartSection: {
    height: 300,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
  },
  cartSectionPotrait: {
    height: 500,
  },
  cartPriceSection: {
    height: 150,
    borderTopColor: 'gray',
    borderTopWidth: 1,
    justifyContent: 'space-around',
    padding: 5,
  },
  cartPriceSectionPotrait: {
    height: 200,
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTotalText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subTotal: {
    fontSize: 22,
  },
  taxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  totalPriceText: {
    fontSize: 22,
  },
  payButtonContainer: {
    alignItems: 'center',
  },
});
