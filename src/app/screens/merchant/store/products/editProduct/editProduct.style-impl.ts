import {StyleSheet, ViewStyle, ImageStyle, TextStyle, View} from 'react-native';

interface EditProductScreenStyle {
  rootView: ViewStyle;
  header: ViewStyle;
  logo: ImageStyle;
  inputContainer: ViewStyle;
  inputLabel: TextStyle;
  forgotStyle: TextStyle;
  input: TextStyle;
  errorStyle: TextStyle;
  container: ViewStyle;
  taxableContainer: ViewStyle;
  buttonContainer: TextStyle;
  listContainerStyle: ViewStyle;
  cancelContainerStyle: ViewStyle;
  optionTextStyle: TextStyle;
  selectedOptionStyle: TextStyle;
  selectedOptionContainer: ViewStyle;
  chevron_down: ImageStyle;
  taxableDropdownUnderline: ViewStyle;
  skuNumberInputContainer: ViewStyle;
  skuNumberInputLabel: TextStyle;
  skuNumberForgotStyle: TextStyle;
  skuNumberInput: TextStyle;
  skuNumberErrorStyle: TextStyle;
  errorLabelContainer: ViewStyle;
  formRow: ViewStyle;
  buttonsContainer: ViewStyle;
  editProductLogoStyle: ImageStyle;
  editProductLogoSubTextStyle: TextStyle;
  uploadProductImageConatiner: ViewStyle;
  formContainer: ViewStyle;
  orientationPortrait: ViewStyle;
  productImageStyle: ImageStyle;
  productImageContainer: ViewStyle;
  productImageText: TextStyle;
  productImageTextContainer: ViewStyle;
  progressBarContainer: ViewStyle;
}
export const styles = StyleSheet.create<EditProductScreenStyle>({
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
  formContainer: {
    flexDirection: 'column',
  },
  container: {
    padding: 10,
  },
  taxableContainer: {
    padding: 10,
    marginLeft: 10,
    width: 300,
  },
  buttonContainer: {
    color: '#A3ADB4',
  },
  listContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    alignContent: 'center',
    borderRadius: 25,
    width: 250,
    maxHeight: 500,
    backgroundColor: '#fff',
  },
  cancelContainerStyle: {
    paddingTop: 10,
  },
  optionTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  selectedOptionStyle: {
    paddingLeft: 3,
    paddingTop: 1,
    paddingBottom: 1,
    textTransform: 'capitalize',
  },
  chevron_down: {
    paddingRight: 3,
    paddingLeft: 3,
    paddingTop: 2,
    backgroundColor: '#2C8DDB',
    borderRadius: 2,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 28,
  },
  selectedOptionContainer: {
    marginTop: 15,
    borderColor: '#A3ADB4',
    borderWidth: 1,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taxableDropdownUnderline: {
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    marginLeft: 10,
    paddingLeft: 5,
  },
  inputContainer: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 16,
  },
  forgotStyle: {
    fontSize: 16,
  },
  errorStyle: {
    color: 'red',
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
  errorLabelContainer: {
    paddingLeft: 15,
    paddingTop: 5,
  },
  editProductLogoStyle: {
    marginLeft: 20,
    marginRight: 20,
  },
  editProductLogoSubTextStyle: {
    marginLeft: 50,
    marginRight: 20,
  },
  uploadProductImageConatiner: {
    alignItems: 'center',
  },
  skuNumberInputContainer: {
    padding: 10,
  },
  skuNumberInputLabel: {
    fontSize: 16,
  },
  skuNumberForgotStyle: {
    fontSize: 16,
  },
  skuNumberErrorStyle: {
    color: 'red',
  },
  skuNumberInput: {
    fontSize: 18,
    borderBottomColor: '#A3ADB4',
    borderBottomWidth: 1,
    width: 300,
    paddingHorizontal: 15,
    color: '#506C82',
    paddingBottom: 10,
    paddingTop: 15,
  },
  productImageText: {
    marginLeft: 20,
    marginRight: 20,
  },
  productImageContainer: {
    alignItems: 'center',
  },
  productImageStyle: {
    marginLeft: 20,
    marginRight: 20,
    width: 150,
    height: 140,
  },
  productImageTextContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  formRow: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  orientationPortrait: {
    marginLeft: 60,
  },
});
