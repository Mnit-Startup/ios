import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity, Alert, Dimensions, ActivityIndicator, Platform} from 'react-native';

import {Button, StringInput, PriceInput} from '../../../../../components';
import {AppNavigationProps} from '../../../../../app-navigation-props';
import {ComponentViewState} from '../../../../../component.state';
import {appStyles} from '../../../../../app.style-impl';
import {styles} from './editProduct.style-impl';
import {EditProductScreenState} from './editProduct.screen.state';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Taxable} from '../../../../../shared';
import {Product} from '../../../../../models';
import {Orientation} from '../../../../../models/device-orientation';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

const PRODUCT_IMAGE_ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
];

export class EditProductScreen extends React.Component<AppNavigationProps, EditProductScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      productName: {
        value: '',
        valid: false,
      },
      price: {
        value: '',
        valid: false,
      },
      skuNumber: {
        value: '',
        valid: false,
      },
      taxableDropdown: {
        visible: false,
        picked: '',
      },
      image: '',
      uploadingImage: false,
      loadingImage: false,
      reUploadingImage: false,
      orientation: Orientation.UNKNOWN,
      onceSubmitted: false,
      componentState: ComponentViewState.DEFAULT,
    };
    this.onProductNameChanged = this.onProductNameChanged.bind(this);
    this.onSkuNumberChanged = this.onSkuNumberChanged.bind(this);
    this.onPriceChanged =  this.onPriceChanged.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.onImageLoadStartFromSource = this.onImageLoadStartFromSource.bind(this);
    this.onImageLoadEndFromSource = this.onImageLoadEndFromSource.bind(this);
  }

  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({
        orientation: Orientation.POTRAIT,
      });
    } else {
      this.setState({
        orientation: Orientation.LANDSCAPE,
      });
    }
  }

  componentWillMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', this.getOrientation);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.getOrientation);
  }

  async editProduct() {
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const product_id = getParam('product_id');
    const store_id = getParam('store_id');
    this.setState({
      onceSubmitted: true,
    });
    if (this.state.productName.valid && this.state.price.valid && this.state.skuNumber.valid
      && this.state.taxableDropdown.picked !== '') {
        const storeService = this.getStoreService();
        this.setState({
          componentState: ComponentViewState.LOADING,
        });
        const product: Product = {
          name: this.state.productName.value,
          price: Number(this.state.price.value).toFixed(2),
          skuNumber: this.state.skuNumber.value,
          taxable: this.state.taxableDropdown.picked === 'true',
          image: this.state.image,
          active: true,
        };
       const response = await storeService.editProduct(store_id, product_id, product);
        if (response.hasData()
        && response.data) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          Alert.alert(this.translate('EDIT_PRODUCT_SCREEN.UPDATE_PRODUCT_SUCCESS'));
          this.props.navigation.navigate('ProductsDashboard');
        } else {
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            componentState: ComponentViewState.ERROR,
          });
        }
      }
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  getStoreService() {
    return this.props.screenProps.storeService;
  }

  onProductNameChanged(name: string, isValid: boolean): void {
    const state = {
      productName: {
        value: name,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onPriceChanged(number: string, isValid: boolean): void {
    const state = {
      price: {
        value: number,
        valid: isValid,
      },
    };
   this.setState(state);
  }


  onSkuNumberChanged(skuNumber: string, isValid: boolean): void {
    const state = {
      skuNumber: {
        value: skuNumber,
        valid: isValid,
      },
    };
   this.setState(state);
  }

  onShowTaxableDropdown = () => {
    if (this.state.componentState !== ComponentViewState.LOADING) {
      this.setState({
        taxableDropdown: {
          visible: true,
          picked: this.state.taxableDropdown.picked,
        },
      });
    }
  }

  onSelectTaxableDropdown = (picked: string) => {
    this.setState({
      taxableDropdown: {
        visible: false,
        picked: picked,
      },
    });
  }

  onCancelTaxableDropdown = () => {
    this.setState({
      taxableDropdown: {
        visible: false,
        picked: this.state.taxableDropdown.picked,
      },
    });
  }


  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.orientationPortrait;
    }
  }

  getAddProductLogoStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.orientationPortrait;
    }
  }

  async selectImage() {
    const {image} = this.state;
    const {screenProps: {translate}, navigation: {navigate}} = this.props;
    const options = {
      title: translate('EDIT_PRODUCT_SCREEN.SELECT_PRODUCT_IMAGE'),
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, async (res) => {
      if (res.error) {
        Alert.alert(translate('EDIT_PRODUCT_SCREEN.IMAGE_PICKER_ERROR'));
      } else if (res.uri) {
        // image type validation
        if (!(res.type && PRODUCT_IMAGE_ALLOWED_FILE_TYPES.indexOf(res.type) + 1)) {
          Alert.alert(translate('EDIT_PRODUCT_SCREEN.INVALID_IMAGE_FORMAT'));
          return;
        }
        if (!image) {
          this.setState({
            uploadingImage: true,
          });
        } else {
          this.setState({
            uploadingImage: true,
            reUploadingImage: true,
          });
        }
        const data = new FormData();
        data.append('photo', {
          name: res.fileName,
          type: res.type,
          uri: Platform.OS === 'android' ? res.uri : res.uri.replace('file://', ''),
        });
        // file size -> file size validation
       const storeService = this.getStoreService();
       const response = await storeService.uploadImage(data);
       if (response.hasData()
       && response.data) {
        this.setState({
         image: response.data.uri,
         uploadingImage: false,
        });
       } else {
        const msg = response.error || this.translate('no_internet');
        Alert.alert(msg);
        this.setState({
          uploadingImage: false,
        });
       }
      }
    });
  }

  async refresh() {
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const product_id = getParam('product_id');
    const store_id = getParam('store_id');
    const storeService = this.getStoreService();
    const response = await storeService.getProduct(store_id, product_id);
    if (response.hasData()
       && response.data) {
           const product = response.data;
           this.setState({
               productName: {
                value: product.name,
                valid: true,
               },
               price: {
                value: product.price,
                valid: true,
               },
               skuNumber: {
                value: product.skuNumber,
                valid: true,
               },
               taxableDropdown: {
                picked: product.taxable.toString(),
                visible: false,
               },
               componentState: ComponentViewState.LOADED,
           });
           if (product.image) {
               this.setState({
                   image: product.image,
               });
           }
       } else {
         const msg = response.error || this.translate('no_internet');
         this.setState({
           componentState: ComponentViewState.ERROR,
           error: msg,
         });
         Alert.alert(msg);
       }
  }

  async componentDidMount() {
    this.refresh();
  }

  onImageLoadStartFromSource() {
    this.setState({
      loadingImage: true,
    });
  }

  onImageLoadEndFromSource() {
    this.setState({
      loadingImage: false,
    });
  }

  render() {

    const inputStyle = {
      containerStyle: styles.inputContainer,
      labelStyle: styles.inputLabel,
      forgotStyle: styles.forgotStyle,
      inputStyle: styles.input,
      errorStyle: styles.errorStyle,
    };
    const inputSkuNumberStyle = {
      containerStyle: styles.skuNumberInputContainer,
      labelStyle: styles.skuNumberInputLabel,
      forgotStyle: styles.skuNumberForgotStyle,
      inputStyle: styles.skuNumberInput,
      errorStyle: styles.skuNumberErrorStyle,
    };
    const {componentState, image, uploadingImage, loadingImage, reUploadingImage} = this.state;
    const options = Taxable;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const isImage = (!image) ? false : true;
    const {screenProps: {translate}, navigation: {navigate}} = this.props;
    let picked: string;
    if (this.state.taxableDropdown.picked === 'true') {
      picked = translate('EDIT_PRODUCT_SCREEN.TAXABLE_OPTION_YES');
    } else if (this.state.taxableDropdown.picked === 'false') {
      picked = translate('EDIT_PRODUCT_SCREEN.TAXABLE_OPTION_NO');
    } else {
      picked = translate('EDIT_PRODUCT_SCREEN.TAXABLE_DROPDOWN');
    }
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../../assets/images/logo/logo.png')}/>
              <Image source={require('../../../../../../assets/images/icons/merchant_logo.png')}/>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'row'}]}>
              <TouchableOpacity>
              <Image style={styles.editProductLogoStyle}
              source={require('../../../../../../assets/images/icons/edit_product_icon.png')}/>
              <Text style={styles.editProductLogoSubTextStyle}>{translate('EDIT_PRODUCT_SCREEN.EDIT_PRODUCT')}</Text>
              </TouchableOpacity>
            <View style={[styles.formContainer, this.getContainerStyle()]}>
            {
              !isImage && (
                <TouchableOpacity style={styles.uploadProductImageConatiner} onPress={this.selectImage}>
                  <Image style={styles.productImageStyle}
                  source={require('../../../../../../assets/images/icons/dummy_product_image_icon.png')}/>
                  <Text style={{marginTop: 5}}>{translate('EDIT_PRODUCT_SCREEN.ADD_PRODUCT_IMAGE_PLACEHOLDER')}</Text>
                  <View><ActivityIndicator size='large' animating={uploadingImage}/></View>
              </TouchableOpacity>
              )
            }
            {
                isImage && loadingImage && !reUploadingImage && (
                  <TouchableOpacity style={styles.progressBarContainer}>
                     <Progress.Bar indeterminate={true} width={100}/>
                  </TouchableOpacity>
                )
              }
              {
                isImage && (
                  <TouchableOpacity style={styles.productImageContainer} onPress={this.selectImage}>
                    <Image style={styles.productImageStyle}
                    source={{uri: image}} onLoadStart={this.onImageLoadStartFromSource}
                    onLoadEnd={this.onImageLoadEndFromSource}/>
                  </TouchableOpacity>
                )
              }
              {
                isImage && !loadingImage && (
                  <TouchableOpacity style={styles.productImageTextContainer}>
                    <Text style={styles.productImageText}>{translate('EDIT_PRODUCT_SCREEN.PRODUCT_IMAGE_PLACEHOLDER')}</Text>
                    <View><ActivityIndicator size='large' animating={uploadingImage}/></View>
                  </TouchableOpacity>
                )
              }
              {
                isImage && loadingImage && reUploadingImage && (
                  <TouchableOpacity style={styles.productImageTextContainer}>
                    <Text style={styles.productImageText}>{translate('EDIT_PRODUCT_SCREEN.PRODUCT_IMAGE_PLACEHOLDER')}</Text>
                    <View><ActivityIndicator size='large' animating={loadingImage}/></View>
                  </TouchableOpacity>
                )
              }
              <View style={styles.formRow}>
                <View>
                <StringInput
                  label={translate('EDIT_PRODUCT_SCREEN.PRODUCT_NAME')}
                  required={true}
                  autoFocus={true}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onProductNameChanged}
                  defaultValue={this.state.productName.value}
                />
                </View>
                <View>
                <PriceInput
                  label={translate('EDIT_PRODUCT_SCREEN.PRICE')}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  required={true}
                  onChange={this.onPriceChanged}
                  defaultValue={this.state.price.value}
                />
                </View>
              </View>
              <View style={styles.formRow}>
                <StringInput
                  label={translate('EDIT_PRODUCT_SCREEN.SKU_NUMBER')}
                  required={true}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputSkuNumberStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onSkuNumberChanged}
                  defaultValue={this.state.skuNumber.value}
                />
                <View>
                  <View style={styles.taxableContainer}>
                    <TouchableOpacity onPress={this.onShowTaxableDropdown}>
                      <Text style={styles.buttonContainer}>{translate('EDIT_PRODUCT_SCREEN.TAXABLE')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectedOptionContainer} onPress={this.onShowTaxableDropdown}>
                      <Text style={styles.selectedOptionStyle}>{picked}</Text>
                      <View style={styles.chevron_down}><Icon color={'white'} name='chevron-down'></Icon></View>
                    </TouchableOpacity>
                    <ModalFilterPicker
                      visible={this.state.taxableDropdown.visible}
                      onSelect={this.onSelectTaxableDropdown}
                      onCancel={this.onCancelTaxableDropdown}
                      options={options}
                      listContainerStyle={styles.listContainerStyle}
                      optionTextStyle={styles.optionTextStyle}
                      showFilter={false}
                      cancelContainerStyle={styles.cancelContainerStyle}
                    />
                  </View>
                  <View style={styles.taxableDropdownUnderline}></View>
                  {this.state.taxableDropdown.picked === '' && this.state.onceSubmitted &&
                    <View style={styles.errorLabelContainer}>
                    <Text style={styles.errorStyle}>{this.translate('EDIT_PRODUCT_SCREEN.INVALID_VALUE')}</Text>
                  </View>
                  }
                  </View>
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={this.editProduct}
                  disabled={isComponentLoading || uploadingImage || loadingImage}
                  showActivityIndicator={isComponentLoading}
                  text={translate('EDIT_PRODUCT_SCREEN.UPDATE')}
                  />
                  <Button
                  type={'btn-danger'}
                  onPress={() => navigate('ProductsDashboard')}
                  text={translate('EDIT_PRODUCT_SCREEN.CANCEL')}
                  />
                </View>
            </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
