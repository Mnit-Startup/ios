import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';

import {Button} from '../../../../components';
import {AppNavigationProps} from '../../../../app-navigation-props';
import {appStyles} from '../../../../app.style-impl';
import {styles} from './manageStore.style-impl';

export class ManageStoreScreen extends React.Component<AppNavigationProps> {

  constructor(props: AppNavigationProps) {
    super(props);
    this.back = this.back.bind(this);
  }

  back() {
    const {navigation: {navigate}} = this.props;
    navigate('MerchantDashboard');
  }

  render() {
    const {screenProps: {translate}, navigation: {navigate}} = this.props;
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
            <TouchableOpacity onPress={() => navigate('CreateStore')}>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/create_store_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MANAGE_STORE_SCREEN.CREATE_STORE')}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/add_product_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MANAGE_STORE_SCREEN.ADD_PRODUCT')}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/remove_product_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MANAGE_STORE_SCREEN.REMOVE_PRODUCT')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
