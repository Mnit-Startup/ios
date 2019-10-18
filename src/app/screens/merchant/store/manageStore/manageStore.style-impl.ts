import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface MerchantHomeScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  firstRow: ViewStyle;
  secondRow: ViewStyle;
  backButton: ImageStyle;
  imageStyle: ImageStyle;
  textStyle: TextStyle;
  imageContainer: ViewStyle;
  storeLogo: ImageStyle;
  progressBar: ViewStyle;
  storeLogoContainer: ViewStyle;
}
export const styles = StyleSheet.create<MerchantHomeScreenStyle>({
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
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 80,
  },
  secondRow: {
    alignItems: 'center',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 70,
  },
  imageStyle: {
    marginRight: 25,
  },
  textStyle: {
    marginRight: 25,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
