import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    maxWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messageError: {
    color: '#f44336',
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'column',
    width: '80%',
    alignItems: 'center',
  },
});
