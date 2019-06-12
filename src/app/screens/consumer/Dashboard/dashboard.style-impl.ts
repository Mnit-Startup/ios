import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  banner: {
    height: 244,
    backgroundColor: '#2C8DDB',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 21,
    paddingRight: 21,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginTop: 4,
    marginBottom: 4,
  },
  currenyBannerTextStyle: {
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
  },
  balanceImage: {
    marginTop: 35,
  },
  tab: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#2C8DDB',
  },
  activeTabIndicatorStyle: {
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    padding: 21,
  },
  messageError: {
    color: '#f44336',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    padding: 21,
  },
  balanceItem: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#35C5AB',
  },
  balanceDescription: {
    flexDirection: 'column',
    flex: 1,
  },
  balanceItemTitle: {
    fontSize: 17,
    color: '#4F6C8D',
  },
  balanceItemDate: {
    fontSize: 13,
    color: '#A3ADB4',
    marginTop: 8,
  },
  balanceItemValue: {
    color: '#35C5AB',
  },
});
