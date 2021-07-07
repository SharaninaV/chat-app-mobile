import {AppRegistry} from 'react-native';
import * as Sentry from '@sentry/react-native';
import App from './App';
import { name as appName } from './app.json';

Sentry.init({
  dsn: 'https://df9e82dcdbd14fdcb36cbf5816359961@o913672.ingest.sentry.io/5851872'
});
Sentry.nativeCrash();

AppRegistry.registerComponent(appName, () => App);
