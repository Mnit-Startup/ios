import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootView: {
    flexDirection: 'column',
    height: '100%',
  },
  closeButtonContainer: {
    marginRight: 16,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
  },
  walletContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    marginTop: 78,
    marginLeft: 51,
    marginRight: 51,
    marginBottom: 63,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 26,
    color: '#A3ADB4',
    textAlign: 'center',
    marginBottom: 50,
  },
  qrCodeContainer: {
    backgroundColor: '#D8D8D8',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  qrCodeScannerStyle: {
    height: '100%',
    width: '100%',
  },
  walletCard: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  walletCardImage: {
    marginTop: 8,
    marginBottom: 8,
  },
  walletCardBalanceTextStyle: {
    color: '#FFFFFF',
    fontSize: 31,
  },
  kadimaWalletCard: {
    backgroundColor: '#2C8DDB',
  },
  walletCardTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  loadingConatainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2C8DDB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageError: {
    marginTop: 8,
    color: '#f44336',
    textAlign: 'center',
  },
  payContainer: {
    alignItems: 'center',
  },
  transactionSuccessContainer: {
    marginTop: 78,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  transactionSuccessTitle: {
    marginTop: 34,
    fontSize: 28,
    color: '#A3ADB4',
  },
  transactionSuccessSubTitle: {
    marginTop: 8,
    fontSize: 26,
    color: '#A3ADB4',
  },
  transactionSuccessAmount: {
    marginTop: 34,
    fontSize: 15,
    color: '#A3ADB4',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
  transactionSuccessBalanceTextStyle: {
    color: '#4F6C8D',
    fontSize: 77,
  },
});
