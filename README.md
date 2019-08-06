## Overview
This project contains source code for Blockade mobile consumer application. The mobile application is written using React Native framework.

### Project setup
The app was created using `react-native init` command as follows.
```
react-native init pos
```

The project uses Typescript instead of Flow. In order to use Typescript, following was done:

```
yarn add --dev typescript (add TypeScript to the project)
yarn add --dev react-native-typescript-transformer (add React Native TypeScript Transformer to the project)
yarn tsc --init --pretty --jsx react (initialize an empty TypeScript config file)
touch rn-cli.config.js (add an empty React Native TypeScript Transformer config file)
yarn add --dev @types/react @types/react-native (adds typings for React and React Native)
```

### Configuration:
It is important for the app to be able to use different settings during development, staging and production environment. In order to maintain various configurations, it use [`react-native-config`](https://github.com/luggit/react-native-config) package. It is added to project as follows:

```
yarn add react-native-config
```

```
react-native link react-native-config
```

The configuration files are stored under `config` folder. If you want to add any config value, it should be added in `.env.*` files. `react-native-config` makes it available with `Config` object. It can be accessed as:

```
import Config from 'react-native-config'

Config.API_URL  // 'https://myapi.com'
```

Please see [`react-native-config`](https://github.com/luggit/react-native-config) to learn more about how its installed and other features. In order to generate builds with appropriate configuration files, will entries are added to `package.json` `script` section

```
"android-dev": "ENVFILE=./config/.env.dev react-native run-android",
"android-staging": "ENVFILE=./config/.env.staging react-native run-android",
"android-prod": "ENVFILE=./config/.env.production react-native run-android --variant=release",
"ios-dev": "ENVFILE=./config/.env.dev react-native run-ios",
"ios-staging": "ENVFILE=./config/.env.staging react-native run-ios",
"ios-prod": "ENVFILE=./config/.env.production react-native run-ios"
```

### Navigation
The application uses [`react-navigation`](https://github.com/react-navigation/react-navigation) to build the application navigation. It is added to the project as follows:

```
yarn add react-navigation
```

```
yarn add react-native-gesture-handler
```

To finalise installation of react-native-gesture-handler for Android, be sure to make the necessary modifications to `MainActivity.java`:

```
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

#### Localization
In order to display localized string, application uses [react-native-localize](https://github.com/react-native-community/react-native-localize) and [i18n-js](https://github.com/AlexanderZaytsev/react-native-i18n) together. `react-native-localize` helps to get system level settings where as `i18n-js` provides helper methods to fetch localized version of string based on system settings.

```
yarn add react-native-localize
```

```
react-native link react-native-localize
```

```
yarn add i18n-js
```

All translate files are located under `src/assets/locale` folder. Please see [link](https://github.com/react-native-community/react-native-localize/blob/master/example/src/SyncExample.js) for more details.

```
`app.tsx` does all the work and passes `translate` function to all screens. Each can screen can simply call `this.props.screenProps.translate` method with they key of string to translate. As an example:
```

```
this.props.screenProps.translate('sign_in')
```

#### Other
- `axios` for making network call. 
- `lodash` for writing efficient js code
- `moment` to deal with time related issues
- `react-native-vector-icons` for icons
- `react-native-sentry` for monitoring crashes in production
- `tslint` for linting

### Architecture
`index.js` serves as the entry point for the application. Every UI element is represented via `Component` in RN. `index.js` registers the application. The application is located at `src/app/app.tsx`. It initiates the route container, all services that the application and injects it to all screens in the application.

It also initiatilize the app navigation.

### Running the application

For iOS:
```
yarn run ios-dev
```

For Android:
```
yarn run android-dev
```