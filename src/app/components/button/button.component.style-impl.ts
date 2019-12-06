import _ from 'lodash';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

const button = {
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 45,
  marginTop: 30,
  backgroundColor: '#2C8DDB',
  elevation: 8,
  flexDirection: 'row',
  width: 300,
};

const buttonText = {
  color: '#ffffff',
  fontWeight: '600',
  fontSize: 24,
  textAlign: 'center',
  justifyContent: 'center',
  flex: 1,
};

export const buttonStyles = StyleSheet.create({
  buttonPrimary: <ViewStyle> button,
  buttonSecondary: <ViewStyle> _.assign(_.clone(button), {
    backgroundColor: '#fff',
    borderColor: '#506C82',
    borderWidth: 2,
  }),
  buttonDanger: <ViewStyle> _.assign(_.clone(button), {
    backgroundColor: 'red',
    width: 150,
  }),
  buttonPrimaryText: <TextStyle> buttonText,
  buttonSecondaryText: <ViewStyle> _.assign(_.clone(buttonText), {
    color: '#506C82',
  }),
  buttonDangerText: <TextStyle> buttonText,
  buttonSm: <ViewStyle> _.assign(_.clone(button), {
    width: 150,
  }),
});
