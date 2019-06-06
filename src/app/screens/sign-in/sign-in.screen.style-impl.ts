import _ from 'lodash';
import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface SignInScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  bankIcon: ImageStyle;
  bankIconContainer: ViewStyle;
  termsOfUse: TextStyle;
  signInButtonContainer: ViewStyle;
  signUpButtonContainer: ViewStyle;
}

export const style = StyleSheet.create<SignInScreenStyle>({
  rootView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    flexDirection: 'column',
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    height: 62,
    width: 200,
  },
  bankIcon: {
    height: 200,
    width: 200,
  },
  bankIconContainer: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 8,
  },
  termsOfUse: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  signInButtonContainer: {
    flex: 1,
    paddingTop: 60,
  },
  signUpButtonContainer: {
    flex: 1,
  },
});
