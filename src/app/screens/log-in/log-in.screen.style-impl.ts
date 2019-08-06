import _ from 'lodash';
import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface LogInScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  inputLabel: TextStyle;
  forgotStyle: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  errorStyle: TextStyle;
  logInButton: ViewStyle;
  logInButtonText: TextStyle;
  logInButtonContainer: ViewStyle;
}

export const style = StyleSheet.create<LogInScreenStyle>({
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
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    width: 300,
    padding: 10,
    paddingHorizontal: 15,
    color: '#506C82',
  },
  errorStyle: {
    color: 'red',
  },
  logInButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 32,
    paddingRight: 15,
    borderRadius: 45,
    marginTop: 30,
    backgroundColor: '#2C8DDB',
    elevation: 8,
    flexDirection: 'row',
    width: 300,
  },
  logInButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  logInButtonContainer: {
    flex: 1,
  },
});
