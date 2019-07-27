import React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, TouchableOpacity} from 'react-native';

import {AppNavigationProps} from '../../../../app-navigation-props';
import {appStyles} from '../../../../app.style-impl';
import {styles} from './dashboard.screen.style-impl';

export class StoreDashboardScreen extends React.Component<AppNavigationProps> {

  constructor(props: AppNavigationProps) {
    super(props);
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
            <View style={styles.imagesFirstRow}>
            <TouchableOpacity>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/process_sales_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MERCHANT_HOME_PAGE.PROCESS_SALE')}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/manage_users_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MERCHANT_HOME_PAGE.MANAGE_USERS')}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/run_reports_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MERCHANT_HOME_PAGE.RUN_REPORTS')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imagesSecondRow}>
            <TouchableOpacity onPress={() => navigate('ManageStore', {store_id})}>
              <Image style={styles.imageStyle}
              source={require('../../../../../assets/images/icons/manage_store_icon.png')}/>
              <Text style={styles.textStyle}>{translate('MERCHANT_HOME_PAGE.MANAGE_STORE')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
