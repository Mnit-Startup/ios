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
  rowItem: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#35C5AB',
  },
  rowDescription: {
    flexDirection: 'column',
    flex: 1,
  },
  rowTitle: {
    fontSize: 17,
    color: '#4F6C8D',
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#A3ADB4',
    marginTop: 8,
  },
  rowAmount: {
    color: '#35C5AB',
  },
  actionButtonTextStyle: {
    fontWeight: 'bold',
    marginTop: -12,
  },
  rowDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginTop: 10,
  },
  rowHeadings: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 13,
    marginTop: 20,
    marginBottom: 10,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  rowTax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  rowUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: '#4F6C8D',
    width: 350,
    marginTop: 15,
    marginHorizontal: 15,
  },
  itemPriceWidth: {
    width: 65,
    fontSize: 16,
    color: '#4F6C8D',
    textAlign: 'right',
  },
  itemNameWidth: {
    width: 100,
    fontSize: 16,
    color: '#4F6C8D',
  },
  itemQuantityWidth: {
    width: 62,
    fontSize: 16,
    color: '#4F6C8D',
    textAlign: 'center',
  },
  itemStore: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 17,
    color: '#4F6C8D',
  },
});
