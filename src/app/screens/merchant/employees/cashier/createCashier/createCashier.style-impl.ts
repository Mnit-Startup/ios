import {StyleSheet, ViewStyle, ImageStyle, TextStyle, View} from 'react-native';

interface CreateCashierScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  inputContainer: ViewStyle;
  inputLabel: TextStyle;
  forgotStyle: TextStyle;
  input: TextStyle;
  errorStyle: TextStyle;
  container: ViewStyle;
  errorLabelContainer: ViewStyle;
  formRow: ViewStyle;
  buttonsContainer: ViewStyle;
  createCashierLogoStyle: ImageStyle;
  createCashierLogoSubTextStyle: TextStyle;
  formContainer: ViewStyle;
  orientationPortrait: ViewStyle;
  progressBarContainer: ViewStyle;
}
export const styles = StyleSheet.create<CreateCashierScreenStyle>({
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
    marginTop: 200,
  },
  container: {
    padding: 10,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 28,
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
    paddingLeft: 25,
    paddingTop: 5,
    width: 300,
  },
  createCashierLogoStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  createCashierLogoSubTextStyle: {
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
    marginLeft: 60,
  },
});
