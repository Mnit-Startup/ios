import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface MerchantDashboardScreenStyle {
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
  storeListItemContainer: ViewStyle;
  storeListItem: TextStyle;
  messageError: TextStyle;
}
export const styles = StyleSheet.create<MerchantDashboardScreenStyle>({
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
    marginBottom: 50,
    marginTop: 50,
    marginLeft: 20,
  },
  orientationPortrait: {
    marginLeft: 20,
  },
  loadAndErrorContainer: {
    marginHorizontal: 300,
    marginVertical: 300,
  },
  storeListItemContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#A3ADB4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  storeListItem: {
    fontSize: 24,
  },
  messageError: {
    color: '#f44336',
    textAlign: 'center',
  },
});
