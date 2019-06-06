import _ from 'lodash';
import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface SignUpScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  companyName: TextStyle;
  signUpForm: ViewStyle;
  inputLabel: TextStyle;
  forgotStyle: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  errorStyle: TextStyle;
  termsOfUse: ViewStyle;
  termsOfUseText: TextStyle;
  signUpButton: ViewStyle;
  signUpButtonText: TextStyle;
  signUpButtonContainer: ViewStyle;
  pickerContainer: ViewStyle;
  container: ViewStyle;
  buttonContainer: TextStyle;
  listContainerStyle: ViewStyle;
  cancelContainerStyle: ViewStyle;
  optionTextStyle: TextStyle;
  selectedOptionStyle: TextStyle;
  selectedOptionContainer: ViewStyle;
  chevron_down: ImageStyle;
  errorLabelContainer: ViewStyle;
}

export const style = StyleSheet.create<SignUpScreenStyle>({
  rootView: {
    flex: 1,
    justifyContent: 'center',
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
  companyName: {
    color: 'red',
  },
  signUpForm: {
    width: '80%',
  },
  inputLabel: {
    fontSize: 16,
  },
  forgotStyle: {
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    fontSize: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: 300,
    padding: 10,
    paddingHorizontal: 15,
  },
  errorStyle: {
    color: 'red',
  },
  errorLabelContainer: {
    paddingLeft: 15,
    paddingTop: 5,
    width: 300,
  },
  termsOfUse: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    flexDirection: 'row',
  },
  termsOfUseText: {
    color: '#bab8b8',
    fontSize: 18,
    fontWeight: '100',
    fontFamily: 'Times',
  },
  signUpButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 32,
    paddingRight: 15,
    borderRadius: 45,
    marginTop: 30,
    backgroundColor: '#2288D9',
    elevation: 8,
    flexDirection: 'row',
    width: 300,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  signUpButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 2,
  },
  container: {
    paddingTop: 30,
    paddingRight: 150,
  },
  buttonContainer: {
    color: '#bab8b8',
  },
  listContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    alignContent: 'center',
    borderRadius: 25,
    width: 250,
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
    textTransform: 'capitalize',
  },
  chevron_down: {
    paddingRight: 3,
    paddingLeft: 3,
    paddingTop: 2,
    backgroundColor: '#2288D9',
    borderRadius: 2,
  },
  selectedOptionContainer: {
    marginTop: 15,
    borderColor: '#bab8b8',
    borderWidth: 1,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
