import _ from 'lodash';
import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';

import {AppNavigationProps} from '../../../../app-navigation-props';
import {appStyles} from '../../../../app.style-impl';
import {styles} from './manageStore.style-impl';
import {ManageStoreScreenState} from './manageStore.screen.state';
import {ComponentViewState} from '../../../../component.state';
import * as Progress from 'react-native-progress';

export class ManageStoreScreen extends React.Component<AppNavigationProps, ManageStoreScreenState> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.state = {
      storeLogo: '',
      loadingLogo: false,
      componentState: ComponentViewState.DEFAULT,
    };
    this.back = this.back.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onLogoLoadStartFromSource = this.onLogoLoadStartFromSource.bind(this);
    this.onLogoLoadEndFromSource = this.onLogoLoadEndFromSource.bind(this);
  }

  getStoreService() {
    return this.props.screenProps.storeService;
  }

  translate(key: string) {
    return this.props.screenProps.translate(key, null);
  }

  async refresh() {
    const {navigation: {getParam}} = this.props;
    const store_id = getParam('store_id');
    this.setState({
      componentState: ComponentViewState.LOADING,
    });
    const storeService = this.getStoreService();
    const response = await storeService.getStore(store_id);
    if (response.hasData()
     && response.data) {
       if (response.data.image) {
        this.setState({
          componentState: ComponentViewState.LOADED,
          storeLogo: response.data.image,
        });
       } else {
        this.setState({
          componentState: ComponentViewState.NO_DATA,
        });
       }
     } else {
      const msg = response.error || this.translate('no_internet');
      this.setState({
        componentState: ComponentViewState.ERROR,
        error: msg,
      });
     }
  }

  back() {
    const {navigation: {goBack}} = this.props;
    goBack();
  }

  onLogoLoadStartFromSource() {
    this.setState({
      loadingLogo: true,
    });
  }

  onLogoLoadEndFromSource() {
    this.setState({
      loadingLogo: false,
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const {storeLogo, loadingLogo} = this.state;
    const store_id = getParam('store_id');
    const isStoreLogo = !_.isEmpty(storeLogo);
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../assets/images/logo/logo.png')}/>
              <View style={styles.storeLogoContainer}>
              {
                !isStoreLogo && (
                  <Image source={require('../../../../../assets/images/icons/merchant_logo.png')}/>
                )
              }
              {
                isStoreLogo && loadingLogo && (
                  <View style={styles.progressBar}>
                    <Progress.Bar indeterminate={true} width={100}/>
                  </View>
                )
              }
              {
                isStoreLogo && (
                  <TouchableOpacity>
                    <Image style={styles.storeLogo} onLoadStart={this.onLogoLoadStartFromSource}
                    onLoad={this.onLogoLoadEndFromSource}
                    source={{uri: storeLogo}}/>
                  </TouchableOpacity>
                )
              }
              </View>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={this.back}>
                <Image source={require('../../../../../assets/images/icons/back_icon.png')}/>
            </TouchableOpacity>
            <View style={styles.firstRow}>
            <TouchableOpacity style={styles.imageContainer} onPress={() => navigate('ProductsDashboard', {store_id})}>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/dummy_product_image_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MANAGE_STORE_SCREEN.MANAGE_PRODUCTS')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/edit_store_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MANAGE_STORE_SCREEN.EDIT_STORE')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
