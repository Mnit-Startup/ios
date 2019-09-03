import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface CashierDashboardScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  buttonContainer: TextStyle;
  cashierListContainer: ViewStyle;
  cashierList: ViewStyle;
  cashierListPortrait: ViewStyle;
  cashierListContainerPortrait: ViewStyle;
  buttonsContainer: ViewStyle;
  manageUsersLogoStyle: ImageStyle;
  manageUsersLogoSubTextStyle: TextStyle;
  manageUsersLogoPortraitStyle: ImageStyle;
  orientationPortrait: ViewStyle;
  createCashierLogoStyle: ImageStyle;
  createCashierLogoSubTextStyle: TextStyle;
  createCashierLogoPortraitStyle: ImageStyle;
  createCashierLogoContainerPortraitStyle: ViewStyle;
  loadAndErrorContainer: ViewStyle;
  cashierListItemContainer: ViewStyle;
  cashierNameNumberContainer: ViewStyle;
  cashierListItem: TextStyle;
  cashierListItemName: TextStyle;
  cashierListItemButton: TextStyle;
  cashierListItemEditButton: TextStyle;
  cashierListItemDeleteButton: TextStyle;
  cashierListItemButtonContainer: ViewStyle;
  cashierListItemNumberContainer: ViewStyle;
  messageError: TextStyle;
  cashierListItemAssignButton: TextStyle;
}
export const styles = StyleSheet.create<CashierDashboardScreenStyle>({
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
  createCashierLogoStyle: {
    marginLeft: 250,
    marginTop: 200,
  },
  createCashierLogoSubTextStyle: {
    marginLeft: 250,
    paddingLeft: 30,
  },
  manageUsersLogoPortraitStyle: {
    marginLeft: 5,
    marginRight: 20,
    marginTop: 30,
  },
  createCashierLogoPortraitStyle: {
    marginTop: 200,
    marginHorizontal: 200,
  },
  createCashierLogoContainerPortraitStyle: {
    marginLeft: 50,
  },
  cashierListContainer: {
    marginTop: 200,
    marginLeft: 80,
  },
  cashierList: {
    height: 250,
    width: 500,
  },
  cashierListPortrait: {
    height: 250,
    width: 500,
  },
  cashierListContainerPortrait: {
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
  cashierListItemContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#A3ADB4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  cashierListItem: {
    fontSize: 24,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cashierListItemButton: {
    fontSize: 24,
    alignItems: 'center',
    paddingTop: 5,
    color: '#fff',
    paddingHorizontal: 8,
  },
  cashierListItemButtonContainer: {
    flexDirection: 'row',
    width: 280,
    justifyContent: 'space-evenly',
  },
  cashierListItemName: {
    width: 120,
  },
  cashierNameNumberContainer: {
    flexDirection: 'row',
  },
  cashierListItemNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cashierListItemEditButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc107',
  },
  cashierListItemDeleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  messageError: {
    color: '#f44336',
    textAlign: 'center',
  },
  cashierListItemAssignButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
  },
});
