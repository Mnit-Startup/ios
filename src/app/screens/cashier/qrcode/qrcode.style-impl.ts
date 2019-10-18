import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface QRCodeScreenStyle {
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
}

export const styles = StyleSheet.create<QRCodeScreenStyle>({
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
    flexDirection: 'row',
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
});
