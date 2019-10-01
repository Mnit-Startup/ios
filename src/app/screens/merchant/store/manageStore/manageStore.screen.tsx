import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';

import {AppNavigationProps} from '../../../../app-navigation-props';
import {appStyles} from '../../../../app.style-impl';
import {styles} from './manageStore.style-impl';

export class ManageStoreScreen extends React.Component<AppNavigationProps> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.back = this.back.bind(this);
  }

  back() {
    const {navigation: {goBack}} = this.props;
    goBack();
  }

  render() {
    const {screenProps: {translate}, navigation: {navigate, getParam}} = this.props;
    const store_id = getParam('store_id');
    return (
      <SafeAreaView style={appStyles.safeAreaView}>
        <ScrollView>
          <View style={styles.rootView}>
            <View style={styles.header}>
              <Image source={require('../../../../../assets/images/logo/logo.png')}/>
              <Image source={require('../../../../../assets/images/icons/merchant_logo.png')}/>
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
