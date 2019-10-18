import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface ProductsDashboardScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  buttonContainer: TextStyle;
  storeListContainer: ViewStyle;
  storeList: ViewStyle;
  storeListPortrait: ViewStyle;
  storeListContainerPortrait: ViewStyle;
  buttonsContainer: ViewStyle;
  manageStoreLogoStyle: ImageStyle;
  manageStoreLogoSubTextStyle: TextStyle;
  manageStoreLogoPortraitStyle: ImageStyle;
  orientationPortrait: ViewStyle;
  createStoreLogoStyle: ImageStyle;
  createStoreLogoSubTextStyle: TextStyle;
  createStoreLogoPortraitStyle: ImageStyle;
  createStoreLogoContainerPortraitStyle: ViewStyle;
  loadAndErrorContainer: ViewStyle;
  productListItemContainer: ViewStyle;
  productNamePriceContainer: ViewStyle;
  productListItem: TextStyle;
  productListItemName: TextStyle;
  productListItemButton: TextStyle;
  productListItemEditButton: TextStyle;
  productListItemDeleteButton: TextStyle;
  productListItemButtonContainer: ViewStyle;
  productListItemPriceContainer: ViewStyle;
  messageError: TextStyle;
  storeLogo: ImageStyle;
  progressBar: ViewStyle;
  storeLogoContainer: ViewStyle;
}
export const styles = StyleSheet.create<ProductsDashboardScreenStyle>({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    color: '#A3ADB4',
  },
  manageStoreLogoStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  manageStoreLogoSubTextStyle: {
    marginLeft: 50,
    marginRight: 20,
  },
  createStoreLogoStyle: {
    marginLeft: 250,
    marginTop: 200,
  },
  createStoreLogoSubTextStyle: {
    marginLeft: 250,
    paddingLeft: 30,
  },
  manageStoreLogoPortraitStyle: {
    marginLeft: 5,
    marginRight: 20,
    marginTop: 30,
  },
  createStoreLogoPortraitStyle: {
    marginTop: 200,
    marginHorizontal: 200,
  },
  createStoreLogoContainerPortraitStyle: {
    marginLeft: 50,
  },
  storeListContainer: {
    marginTop: 200,
    marginLeft: 80,
  },
  storeList: {
    height: 250,
    width: 500,
  },
  storeListPortrait: {
    height: 250,
    width: 500,
  },
  storeListContainerPortrait: {
    marginTop: 200,
    marginRight: 30,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 20,
  },
  orientationPortrait: {
    marginLeft: 20,
  },
  loadAndErrorContainer: {
    marginHorizontal: 300,
    marginVertical: 300,
  },
  productListItemContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#A3ADB4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  productListItem: {
    fontSize: 24,
    alignItems: 'center',
    paddingVertical: 10,
  },
  productListItemButton: {
    fontSize: 24,
    alignItems: 'center',
    paddingTop: 5,
    color: '#fff',
    paddingHorizontal: 10,
  },
  productListItemButtonContainer: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-evenly',
  },
  productListItemName: {
    width: 150,
  },
  productNamePriceContainer: {
    flexDirection: 'row',
  },
  productListItemPriceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  productListItemEditButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C8DDB',
  },
  productListItemDeleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  messageError: {
    color: '#f44336',
    textAlign: 'center',
  },
  storeLogo: {
    height: 96,
    width: 100,
    marginRight: 10,
  },
  progressBar: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 28,
  },
  storeLogoContainer: {
    height: 96,
  },
});
