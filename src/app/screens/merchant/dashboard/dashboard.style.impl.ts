import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface MerchantHomeScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  imagesFirstRow: ViewStyle;
  imagesSecondRow: ViewStyle;
  imageStyle: ImageStyle;
  textStyle: TextStyle;
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
  imagesFirstRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 100,
  },
  imagesSecondRow: {
    marginTop: 25,
    alignItems: 'center',
  },
  imageStyle: {
    marginRight: 25,
  },
  textStyle: {
    marginLeft: 30,
    marginRight: 20,
  },
});
