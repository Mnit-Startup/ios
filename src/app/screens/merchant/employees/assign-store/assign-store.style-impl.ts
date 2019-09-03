import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface AssignStoreScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  buttonContainer: TextStyle;
  storeListContainer: ViewStyle;
  storeList: ViewStyle;
  storeListPortrait: ViewStyle;
  storeListContainerPortrait: ViewStyle;
  buttonsContainer: ViewStyle;
  manageUsersLogoStyle: ImageStyle;
  manageUsersLogoSubTextStyle: TextStyle;
  manageUsersLogoPortraitStyle: ImageStyle;
  orientationPortrait: ViewStyle;
  createStoreLogoStyle: ImageStyle;
  createStoreLogoSubTextStyle: TextStyle;
  createStoreLogoPortraitStyle: ImageStyle;
  createStoreLogoContainerPortraitStyle: ViewStyle;
  loadAndErrorContainer: ViewStyle;
  messageError: TextStyle;
  storeListItemContainer: ViewStyle;
  storeListItem: TextStyle;
}
export const styles = StyleSheet.create<AssignStoreScreenStyle>({
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
  manageUsersLogoStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  manageUsersLogoSubTextStyle: {
    marginLeft: 50,
    marginRight: 20,
  },
  createStoreLogoStyle: {
    marginLeft: 250,
    marginTop: 200,
  },
  createStoreLogoSubTextStyle: {
    marginLeft: 250,
    paddingLeft: 40,
  },
  manageUsersLogoPortraitStyle: {
    marginLeft: 5,
    marginRight: 20,
    marginTop: 30,
  },
  createStoreLogoPortraitStyle: {
    marginTop: 200,
    marginHorizontal: 200,
  },
  createStoreLogoContainerPortraitStyle: {
    alignContent: 'center',
    marginLeft: 50,
  },
  storeListContainer: {
    marginTop: 150,
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
  messageError: {
    color: '#f44336',
    textAlign: 'center',
  },
  storeListItemContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeListItem: {
    fontSize: 24,
  },
});
