import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity, Alert, Dimensions, Platform, ActivityIndicator} from 'react-native';

import {Button, StringInput, EmailInput, PhoneInput, ZipcodeInput, NumberInput} from '../../../../components';
import {AppNavigationProps} from '../../../../app-navigation-props';
import {ComponentViewState} from '../../../../component.state';
import {appStyles} from '../../../../app.style-impl';
import {styles} from './createStore.style-impl';
import {CreateStoreScreenState} from './createStore.screen.state';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {States} from '../../../../shared';
import {Store} from '../../../../models';
import {Orientation} from '../../../../models/device-orientation';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

const emitter = require('tiny-emitter/instance');

const PRODUCT_IMAGE_ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
];

export class CreateStoreScreen extends React.Component<AppNavigationProps, CreateStoreScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      storeName: {
        value: '',
        valid: false,
      },
      phone: {
        value: '',
        valid: false,
      },
      streetAddress: {
        value: '',
        valid: false,
      },
      streetAddress2: {
        value: '',
        valid: false,
      },
      city: {
        value: '',
        valid: false,
      },
      email: {
        address: '',
        valid: false,
      },
      merchantId: {
        value: '',
        valid: false,
      },
      stateDropdown: {
        visible: false,
        picked: '',
      },
      zip: {
        value: '',
        valid: false,
      },
      storeProfileDropdown: {
        visible: false,
        picked: '',
      },
      storeIdentifier: {
        value: '',
        valid: false,
      },
      tax: {
        value: 0,
        valid: true,
      },
      image: '',
      uploadingImage: false,
      reUploadingImage: false,
      loadingImage: false,
      orientation: Orientation.UNKNOWN,
      onceSubmitted: false,
      componentState: ComponentViewState.DEFAULT,
    };
    this.onStoreNameChanged = this.onStoreNameChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onStreetAddressChanged = this.onStreetAddressChanged.bind(this);
    this.onStreetAddress2Changed = this.onStreetAddress2Changed.bind(this);
    this.onMerchantIdChanged = this.onMerchantIdChanged.bind(this);
    this.onCityChanged = this.onCityChanged.bind(this);
    this.onPhoneChanged =  this.onPhoneChanged.bind(this);
    this.onZipcodeChanged = this.onZipcodeChanged.bind(this);
    this.onStoreIdentifierChanged = this.onStoreIdentifierChanged.bind(this);
    this.onTaxChanged = this.onTaxChanged.bind(this);
    this.createStore = this.createStore.bind(this);
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

  async createStore() {
    const {navigation: {goBack}} = this.props;
    this.setState({
      onceSubmitted: true,
    });
    if (this.state.storeName.valid && this.state.phone.valid && this.state.streetAddress.valid
      && this.state.email.valid && this.state.merchantId.valid
      && this.state.city.valid && this.state.zip.valid && this.state.stateDropdown.picked !== ''
      && this.state.storeIdentifier.valid && this.state.tax.valid) {
        const storeService = this.getStoreService();
        this.setState({
          componentState: ComponentViewState.LOADING,
        });
        const store: Store = {
          name: this.state.storeName.value,
          phone: this.state.phone.value,
          streetAddress: this.state.streetAddress.value,
          streetAddress2: this.state.streetAddress2.value,
          email: this.state.email.address,
          merchantIdEin: this.state.merchantId.value,
          city: this.state.city.value,
          state: this.state.stateDropdown.picked,
          storeProfile: this.state.storeProfileDropdown.picked,
          zipcode: this.state.zip.value,
          storeIdentifier: this.state.storeIdentifier.value,
          image: this.state.image,
          tax: this.state.tax.value,
        };
        const response = await storeService.createStore(store);
        if (response.hasData()
        && response.data) {
          this.setState({
            componentState: ComponentViewState.LOADED,
          });
          Alert.alert(this.translate('CREATE_STORE_SCREEN.CREATE_STORE_SUCCESS'));
          goBack();
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

  onEmailChanged(email: string, isValid: boolean): void {
    const state = {
      email: {
        address: email,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onStoreNameChanged(name: string, isValid: boolean): void {
    const state = {
      storeName: {
        value: name,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onPhoneChanged(number: string, isValid: boolean): void {
    const state = {
      phone: {
        value: number,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onStreetAddressChanged(addressLineFirst: string, isValid: boolean): void {
    const state = {
      streetAddress: {
        value: addressLineFirst,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onStreetAddress2Changed(addressLineSecond: string, isValid: boolean): void {
    const state = {
      streetAddress2: {
        value: addressLineSecond,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onMerchantIdChanged(merchantId: string, isValid: boolean): void {
    const state = {
      merchantId: {
        value: merchantId,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onCityChanged(city: string, isValid: boolean): void {
    const state = {
      city: {
        value: city,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onShowStoreProfileDropdown = () => {
    if (this.state.componentState !== ComponentViewState.LOADING) {
      this.setState({
        storeProfileDropdown: {
          visible: true,
          picked: this.state.storeProfileDropdown.picked,
        },
      });
    }
  }

  onSelectStoreProfileDropdown = (picked: string) => {
    this.setState({
      storeProfileDropdown: {
        visible: false,
        picked: picked,
      },
    });
  }

  onCancelStoreProfileDropdown = () => {
    this.setState({
      storeProfileDropdown: {
        visible: false,
        picked: this.state.storeProfileDropdown.picked,
      },
    });
  }

  onShowStateDropdown = () => {
    if (this.state.componentState !== ComponentViewState.LOADING) {
      this.setState({
        stateDropdown: {
          visible: true,
          picked: this.state.stateDropdown.picked,
        },
      });
    }
  }

  onSelectStateDropdown = (picked: string) => {
    this.setState({
      stateDropdown: {
        visible: false,
        picked: picked,
      },
    });
  }

  onCancelStateDropdown = () => {
    this.setState({
      stateDropdown: {
        visible: false,
        picked: this.state.stateDropdown.picked,
      },
    });
  }

  onZipcodeChanged(zipcode: string, isValid: boolean): void {
    const state = {
      zip: {
        value: zipcode,
        valid: isValid,
      },
    };
    this.setState(state);
  }

  onStoreIdentifierChanged(storeIdentifier: string, isValid: boolean) {
    this.setState({
      storeIdentifier: {
        value: storeIdentifier,
        valid: isValid,
      },
    });
  }

  onTaxChanged(number: Number, isValid: boolean): void {
    const state = {
      tax: {
        value: number,
        valid: isValid,
      },
    };
   this.setState(state);
  }

  getContainerStyle() {
    if (this.state.orientation === Orientation.POTRAIT) {
      return styles.orientationPortrait;
    }
  }

  onImageLoadStartFromSource() {
    this.setState({
      loadingImage: true,
    });
  }

  onImageLoadEndFromSource() {
    this.setState({
      loadingImage: false,
      reUploadingImage: false,
    });
    Alert.alert(this.translate('CREATE_PRODUCT_SCREEN.IMAGE_UPLOAD_SUCCESS'));
  }

  async selectImage() {
    const {image} = this.state;
    const {screenProps: {translate}} = this.props;
    const options = {
      title: translate('CREATE_PRODUCT_SCREEN.SELECT_PRODUCT_IMAGE'),
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, async(res) => {
      if (res.error) {
        Alert.alert(translate('CREATE_PRODUCT_SCREEN.IMAGE_PICKER_ERROR'));
      } else if (res.uri) {
        // image input validation
        if (!(res.type && PRODUCT_IMAGE_ALLOWED_FILE_TYPES.indexOf(res.type) + 1)) {
          Alert.alert(translate('CREATE_PRODUCT_SCREEN.INVALID_IMAGE_FORMAT'));
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
            image: '',
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
            reUploadingImage: false,
          });
        } else {
          const msg = response.error || this.translate('no_internet');
          Alert.alert(msg);
          this.setState({
            uploadingImage: false,
            reUploadingImage: false,
          });
        }
      }
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
    const {componentState, image, uploadingImage, reUploadingImage, loadingImage} = this.state;
    const options = States;
    const isComponentLoading = componentState === ComponentViewState.LOADING;
    const {screenProps: {translate}, navigation: {navigate, goBack}} = this.props;
    const isImage = !_.isEmpty(image);

    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../assets/images/logo/logo.png')}/>
              <View style={styles.storeLogoContainer}>
              {
                !isImage && (
                  <TouchableOpacity onPress={this.selectImage}>
                    <Image source={require('../../../../../assets/images/icons/add_merchant_logo.png')}/>
                    <ActivityIndicator size='large' animating={uploadingImage} key={uploadingImage ? 'loading' : 'not-loading'}/>
                  </TouchableOpacity>
                )
              }
              {
                isImage && loadingImage && !reUploadingImage && (
                  <View style={styles.progressBar}>
                    <Progress.Bar indeterminate={true} width={100}/>
                  </View>
                )
              }
              {
                isImage && (
                  <TouchableOpacity onPress={this.selectImage}>
                    <Image style={styles.storeLogo} onLoadStart={this.onImageLoadStartFromSource}
                    onLoad={this.onImageLoadEndFromSource} source={{uri: image}}/>
                  </TouchableOpacity>
                )
              }
              {
                isImage && reUploadingImage && (
                  <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' animating={reUploadingImage} key={reUploadingImage ? 'loading' : 'not-loading'}/>
                  </View>
                )
              }
              </View>
            </View>
            <View style={[{flexWrap: 'wrap', flexDirection: 'row'}, this.getContainerStyle()]}>
              <TouchableOpacity>
              <Image style={styles.manageStoreLogoStyle}
              source={require('../../../../../assets/images/icons/create_store_icon.png')}/>
              <Text style={styles.manageStoreLogoSubTextStyle}>{translate('CREATE_STORE_SCREEN.CREATE_STORE')}</Text>
              </TouchableOpacity>
            <View style={[styles.formContainer]}>
              <View style={styles.formRow}>
                <View>
                <StringInput
                  label={translate('CREATE_STORE_SCREEN.STORE_NAME')}
                  required={true}
                  autoFocus={true}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onStoreNameChanged}
                />
                </View>
                <View>
                <PhoneInput
                  label={translate('CREATE_STORE_SCREEN.PHONE')}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onPhoneChanged}
                />
                </View>
              </View>
              <View style={styles.formRow}>
                <StringInput
                  label={translate('CREATE_STORE_SCREEN.STREET_ADDRESS')}
                  required={true}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onStreetAddressChanged}
                />
                <EmailInput
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  style={inputStyle}
                  editable={true}
                  translate={this.props.screenProps.translate}
                  onChange={this.onEmailChanged}
              />
              </View>
              <View style={styles.formRow}>
                <StringInput
                  label={translate('CREATE_STORE_SCREEN.STREET_ADDRESS_2')}
                  required={false}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onStreetAddress2Changed}
                />
                <StringInput
                  label={translate('CREATE_STORE_SCREEN.MERCHANT_ID/EIN')}
                  required={true}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onMerchantIdChanged}
                />
              </View>
              <View style={styles.formRow}>
                <StringInput
                  label={translate('CREATE_STORE_SCREEN.CITY')}
                  required={true}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onCityChanged}
                />
                <StringInput
                  label={translate('CREATE_STORE_SCREEN.STORE_IDENTIFIER')}
                  required={true}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onStoreIdentifierChanged}
                />
              </View>
                <View style={styles.formRow}>
                  <View style={styles.stateZipcodeContainer}>
                  <View style={styles.stateDropdownContainer}>
                  <View style={styles.container}>
                    <TouchableOpacity onPress={this.onShowStateDropdown}>
                      <Text style={styles.buttonContainer}>{translate('CREATE_STORE_SCREEN.STATE')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectedOptionContainer} onPress={this.onShowStateDropdown}>
                      <Text style={styles.selectedOptionStyle}>
                      {this.state.stateDropdown.picked || translate('CREATE_STORE_SCREEN.SELECT_STATE')}</Text>
                      <View style={styles.chevron_down}><Icon color={'white'} name='chevron-down'></Icon></View>
                    </TouchableOpacity>
                    <ModalFilterPicker
                      visible={this.state.stateDropdown.visible}
                      onSelect={this.onSelectStateDropdown}
                      onCancel={this.onCancelStateDropdown}
                      options={options}
                      listContainerStyle={styles.listContainerStyle}
                      optionTextStyle={styles.optionTextStyle}
                      showFilter={true}
                      placeholderText={translate('CREATE_STORE_SCREEN.SEARCH')}
                      cancelContainerStyle={styles.cancelContainerStyle}
                    />
                  </View>
                  <View style={styles.stateDropdownUnderline}></View>
                  {this.state.stateDropdown.picked === '' && this.state.onceSubmitted &&
                    <View style={styles.errorLabelContainer}>
                    <Text style={styles.errorStyle}>{this.translate('EMAIL_INPUT_COMPONENT.INVALID_EMAIL')}</Text>
                  </View>
                  }
                  </View>
                  </View>
                  <View style={styles.stateZipcodeContainer}>
                  <View style={styles.storeProfileContainer}>
                    <View style={styles.container}>
                      <TouchableOpacity onPress={this.onShowStoreProfileDropdown}>
                        <Text style={styles.buttonContainer}>{translate('CREATE_STORE_SCREEN.STORE_PROFILE')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.selectedOptionContainer} onPress={this.onShowStoreProfileDropdown}>
                        <Text style={styles.selectedOptionStyle}>
                        {this.state.storeProfileDropdown.picked || translate('CREATE_STORE_SCREEN.PROFILE')}</Text>
                        <View style={styles.chevron_down}><Icon color={'white'} name='chevron-down'></Icon></View>
                      </TouchableOpacity>
                      <ModalFilterPicker
                        visible={this.state.storeProfileDropdown.visible}
                        onSelect={this.onSelectStoreProfileDropdown}
                        onCancel={this.onCancelStoreProfileDropdown}
                        options={options}
                        listContainerStyle={styles.listContainerStyle}
                        optionTextStyle={styles.optionTextStyle}
                        showFilter={false}
                        cancelContainerStyle={styles.cancelContainerStyle}
                      />
                    </View>
                    <View style={styles.storeProfileDropdownUnderline}></View>
                  </View>
                  </View>
                </View>
                <View style={[styles.formRow, {marginTop: 10}]}>
                <ZipcodeInput
                  label={translate('CREATE_STORE_SCREEN.ZIP')}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onZipcodeChanged}
                />
                <NumberInput
                  label={translate('CREATE_STORE_SCREEN.TAX_RATE')}
                  required={true}
                  autoFocus={false}
                  onceSubmitted={this.state.onceSubmitted}
                  editable={true}
                  style={inputStyle}
                  translate={this.props.screenProps.translate}
                  onChange={this.onTaxChanged}
                />
              </View>
                <View style={styles.buttonsContainer}>
                  <Button
                  type={'btn-primary'}
                  onPress={this.createStore}
                  disabled={isComponentLoading}
                  showActivityIndicator={isComponentLoading}
                  text={translate('CREATE_STORE_SCREEN.CREATE_STORE')}
                  />
                  <Button
                  type={'btn-danger'}
                  onPress={() => goBack()}
                  text={translate('CREATE_STORE_SCREEN.CANCEL')}
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
