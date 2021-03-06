import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface MerchantHomeScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  firstRow: ViewStyle;
  secondRow: ViewStyle;
  inputContainer: ViewStyle;
  inputLabel: TextStyle;
  forgotStyle: TextStyle;
  input: TextStyle;
  errorStyle: TextStyle;
  container: ViewStyle;
  storeProfileContainer: ViewStyle;
  buttonContainer: TextStyle;
  stateZipcodeContainer: ViewStyle;
  stateDropdownContainer: ViewStyle;
  listContainerStyle: ViewStyle;
  cancelContainerStyle: ViewStyle;
  optionTextStyle: TextStyle;
  selectedOptionStyle: TextStyle;
  selectedOptionContainer: ViewStyle;
  stateDropdownUnderline: ViewStyle;
  chevron_down: ImageStyle;
  storeProfileDropdownUnderline: ViewStyle;
  errorLabelContainer: ViewStyle;
  formRow: ViewStyle;
  buttonsContainer: ViewStyle;
  manageStoreLogoStyle: ImageStyle;
  manageStoreLogoSubTextStyle: TextStyle;
  formContainer: ViewStyle;
  orientationPortrait: ViewStyle;
  storeLogoContainer: ViewStyle;
  storeLogo: ImageStyle;
  progressBar: ViewStyle;
  activityIndicator: ViewStyle;
}
export const styles = StyleSheet.create<MerchantHomeScreenStyle>({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    height: 62,
    width: 200,
  },
  formContainer: {
    flexDirection: 'column',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  secondRow: {
    alignItems: 'center',
  },
  stateZipcodeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    padding: 10,
  },
  storeProfileContainer: {
    flex: 1,
    marginLeft: 5,
  },
  buttonContainer: {
    color: '#A3ADB4',
  },
  stateDropdownContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  listContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    alignContent: 'center',
    borderRadius: 25,
    width: 250,
    maxHeight: 500,
    backgroundColor: '#fff',
  },
  cancelContainerStyle: {
    paddingTop: 10,
  },
  optionTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  selectedOptionStyle: {
    paddingLeft: 3,
    paddingTop: 1,
    paddingBottom: 1,
    textTransform: 'capitalize',
  },
  stateDropdownUnderline: {
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    marginRight: 15,
  },
  chevron_down: {
    paddingRight: 3,
    paddingLeft: 3,
    paddingTop: 2,
    backgroundColor: '#2C8DDB',
    borderRadius: 2,
  },
  selectedOptionContainer: {
    marginTop: 15,
    borderColor: '#A3ADB4',
    borderWidth: 1,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeProfileDropdownUnderline: {
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    paddingLeft: 5,
    marginRight: 10,
  },
  inputContainer: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 16,
  },
  forgotStyle: {
    fontSize: 16,
  },
  errorStyle: {
    color: 'red',
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    width: 300,
    padding: 10,
    paddingHorizontal: 15,
    color: '#506C82',
  },
  errorLabelContainer: {
    paddingLeft: 15,
    paddingTop: 5,
  },
  manageStoreLogoStyle: {
    marginLeft: 20,
    marginRight: 20,
  },
  manageStoreLogoSubTextStyle: {
    marginLeft: 50,
    marginRight: 20,
  },
  formRow: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  orientationPortrait: {
    justifyContent: 'center',
  },
  storeLogoContainer: {
    height: 96,
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
  activityIndicator: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 28,
  },
});
