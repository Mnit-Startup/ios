import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface EmployeeLogInScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  inputLabel: TextStyle;
  input: TextStyle;
  inputContainer: ViewStyle;
  forgotStyle: TextStyle;
  errorStyle: TextStyle;
  storeIdContainer: ViewStyle;
}

export const style = StyleSheet.create<EmployeeLogInScreenStyle>({
  rootView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'column',
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    height: 62,
    width: 200,
  },
  forgotStyle: {
    fontSize: 16,
  },
  errorStyle: {
    color: 'red',
  },
  inputContainer: {
    width: '100%',
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
  inputLabel: {
    fontSize: 16,
  },
  storeIdContainer: {
    paddingTop: 25,
  },
});
