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
  manageStoreLogoPortraitStyle: ImageStyle;
  orientationPortrait: ViewStyle;
  createStoreLogoStyle: ImageStyle;
  createStoreLogoPortraitStyle: ImageStyle;
  createStoreLogoContainerPortraitStyle: ViewStyle;
  createStoreLogoContainer: ViewStyle;
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
  createStoreLogoStyle: {
    marginTop: 100,
  },
  manageStoreLogoPortraitStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  createStoreLogoPortraitStyle: {
    marginTop: 200,
  },
  createStoreLogoContainerPortraitStyle: {
    alignItems: 'center',
  },
  createStoreLogoContainer: {
    alignItems: 'center',
  },
  storeListContainer: {
    marginTop: 50,
    alignItems: 'center',
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
    alignItems: 'center',
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
