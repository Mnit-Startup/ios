import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface StoreDashboardStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  imagesFirstRow: ViewStyle;
  imagesSecondRow: ViewStyle;
  backButton: ImageStyle;
  imageStyle: ImageStyle;
  textStyle: TextStyle;
}
export const styles = StyleSheet.create<StoreDashboardStyle>({
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
  backButton: {
    marginTop: 20,
    marginLeft: 70,
  },
  imageStyle: {
    marginRight: 25,
  },
  textStyle: {
    marginLeft: 30,
    marginRight: 20,
  },
});
