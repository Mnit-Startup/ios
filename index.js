import {AppRegistry} from 'react-native';
import App from './src/app/app';
import {name as appName} from './app.json';

import { Sentry, SentryLog } from 'react-native-sentry';

Sentry.config('https://46169904e60843048fd756f1d5829b5c@sentry.io/1468665', {
  deactivateStacktraceMerging: false, // default: true | Deactivates the stacktrace merging feature
  logLevel: SentryLog.None, // default SentryLog.None | Possible values:  .None, .Error, .Debug, .Verbose
  disableNativeIntegration: false, // default: false | Deactivates the native integration and only uses raven-js
  handlePromiseRejection: true // default: true | Handle unhandled promise rejections
}).install();

AppRegistry.registerComponent(appName, () => App);
