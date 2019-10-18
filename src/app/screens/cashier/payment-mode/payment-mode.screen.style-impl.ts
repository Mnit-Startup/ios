import {StyleSheet, ViewStyle, TextStyle, ImageStyle} from 'react-native';

interface PaymentModeScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  paymentModeContainer: ViewStyle;
  container: ViewStyle;
  containerPotrait: ViewStyle;
  paymentModeSection: ViewStyle;
  paymentModeSectionPotrait: ViewStyle;
  paymentModeContainerPotrait: ViewStyle;
  billingSection: ViewStyle;
  billingSectionPotrait: ViewStyle;
  kadimaText: TextStyle;
  coinText: TextStyle;
  cashText: TextStyle;
  creditText: TextStyle;
  kadimaContainer: ViewStyle;
  cashContainer: ViewStyle;
  creditContainer: ViewStyle;
  backButton: ViewStyle;
  payButtonContainer: ViewStyle;
  storeLogo: ImageStyle;
  progressBar: ViewStyle;
  storeLogoContainer: ViewStyle;
}

export const styles = StyleSheet.create<PaymentModeScreenStyle>({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentModeContainer: {
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
  paymentModeSection: {
    flex: 2,
  },
  paymentModeSectionPotrait: {
    flex: 3,
  },
  paymentModeContainerPotrait: {
    height: 825,
  },
  billingSection: {
    flex: 1,
  },
  billingSectionPotrait: {
    flex: 2,
  },
  kadimaContainer: {
    height: 75,
    width: 350,
    backgroundColor: '#DA6624',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  kadimaText: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  coinText: {
    fontSize: 24,
    marginLeft: 5,
  },
  cashContainer: {
    height: 75,
    width: 175,
    backgroundColor: '#54DA24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashText: {
    fontSize: 24,
  },
  creditContainer: {
    height: 75,
    width: 175,
    backgroundColor: '#DAC224',
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditText: {
    fontSize: 24,
  },
  backButton: {
    marginLeft: 20,
  },
  payButtonContainer: {
    alignItems: 'center',
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
