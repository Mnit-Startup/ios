import {StyleSheet} from 'react-native';

export const cartStyle = StyleSheet.create({
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
    width: '80%',
  },
  cartItemQuantity: {
    flexDirection: 'row',
    width: '65%',
  },
  quantity: {
    fontSize: 24,
    width: '20%',
  },
  cartItemPrice: {
    width: '30%',
    alignItems: 'flex-end',
  },
  cartItemPriceText: {
    fontSize: 24,
  },
  cartPriceSection: {
    height: 150,
    borderTopColor: 'gray',
    borderTopWidth: 1,
    justifyContent: 'space-around',
    padding: 5,
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
  cartPriceSectionPotrait: {
    height: 200,
  },
});
