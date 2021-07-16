import {AppRegistry} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';
import OneSignal from 'react-native-onesignal';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {setAsyncDataRequest} from './src/redux/asyncStorage/actions';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('b11b07e3-1352-4f27-9d6b-3b655859ec81');

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  (notificationReceivedEvent) => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  }
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler((notification) => {
  console.log('OneSignal: notification opened:', notification);
  Actions.dialog();
});

AppRegistry.registerComponent(appName, () => App);
