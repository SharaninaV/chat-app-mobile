import {AppRegistry} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {Actions} from 'react-native-router-flux';
import {name as appName} from './app.json';
import {App} from './src/App';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('b11b07e3-1352-4f27-9d6b-3b655859ec81');

OneSignal.setNotificationWillShowInForegroundHandler(
  (notificationReceivedEvent) => {
    notificationReceivedEvent.complete(null);
  }
);

OneSignal.setNotificationOpenedHandler((notification) => {
  Actions.dialog();
});

AppRegistry.registerComponent(appName, () => App);
