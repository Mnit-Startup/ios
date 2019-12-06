import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface ConsumerEmailScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  qrcodeContainer: ViewStyle;
  container: ViewStyle;
  containerPotrait: ViewStyle;
  qrcodeSection: ViewStyle;
  qrcodeSectionPotrait: ViewStyle;
  qrcodeContainerPotrait: ViewStyle;
  billingSection: ViewStyle;
  billingSectionPotrait: ViewStyle;
  qrcode: ViewStyle;
  backButton: ViewStyle;
  payButtonContainer: ViewStyle;
  transactionComplete: ViewStyle;
  transactionCompleteText: TextStyle;
  storeLogo: ImageStyle;
  progressBar: ViewStyle;
  storeLogoContainer: ViewStyle;
  inputContainer: ViewStyle;
  inputLabel: TextStyle;
  forgotStyle: TextStyle;
  input: TextStyle;
  errorStyle: TextStyle;
  buttonStylePotrait: ViewStyle;
  buttonStyle: ViewStyle;
}

export const styles = StyleSheet.create<ConsumerEmailScreenStyle>({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrcodeContainer: {
    margin: 10,
    height: 575,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    height: 650,
  },
  containerPotrait: {
    flexDirection: 'row',
    height: 900,
  },
  qrcodeSection: {
    flex: 2,
  },
  qrcodeSectionPotrait: {
    flex: 3,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 650,
  },
  buttonStylePotrait: {
    width: 325,
    flexWrap: 'wrap',
  },
  qrcodeContainerPotrait: {
    height: 825,
  },
  billingSection: {
    flex: 1,
  },
  billingSectionPotrait: {
    flex: 2,
  },
  qrcode: {
    height: 350,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#2C8DDB',
    borderWidth: 20,
    borderRadius: 15,
  },
  backButton: {
    marginLeft: 20,
  },
  payButtonContainer: {
    alignItems: 'center',
  },
  transactionComplete: {
    height: 150,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  transactionCompleteText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  storeLogoContainer: {
    height: 96,
  },
  inputContainer: {
    padding: 0,
  },
  inputLabel: {
    fontSize: 10,
    color: 'transparent',
  },
  forgotStyle: {
    fontSize: 16,
  },
  errorStyle: {
    color: 'red',
  },
  input: {
    fontSize: 20,
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    width: 300,
    padding: 10,
    paddingHorizontal: 15,
    color: '#506C82',
  },
});
