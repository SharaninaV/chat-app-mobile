import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {Start} from './screens/Start';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from 'redux';
import {rootReducer} from './redux/rootReducer';
import rootSaga from './redux/rootSaga';
import {Provider} from 'react-redux';
import * as Sentry from '@sentry/react-native';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Queue} from './screens/Queue';
import {PersistGate} from 'redux-persist/integration/react';
import {Dialog} from './screens/Dialog';
import {PubNubProvider} from 'pubnub-react';
import PubNub from 'pubnub';
import {Camera} from './screens/Camera';
import {FinishDialog} from './screens/FinishDialog';
import {PhotoPreview} from './screens/PhotoPreview';

Sentry.init({
  dsn: 'https://df9e82dcdbd14fdcb36cbf5816359961@o913672.ingest.sentry.io/5851872'
});

const pubnub = new PubNub({
  subscribeKey: 'sub-c-83b478ee-d40d-11eb-a02e-0298fc8e4944',
  publishKey: 'pub-c-0cf38852-5091-4c70-9758-2140e626c2a0'
});

const middleware = [];
const enhancers = [];
const saga = createSagaMiddleware();
middleware.push(saga);
enhancers.push(applyMiddleware(...middleware));

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['asyncStorage', 'enterChat']
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeEnhancers(...enhancers));
const persistor = persistStore(store);

saga.run(rootSaga);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PubNubProvider client={pubnub}>
          <Router>
            <Stack key="root">
              <Scene key="start" component={Start} title="ChatApp" />
              <Scene key="queue" component={Queue} title="ChatApp" />
              <Scene key="dialog" component={Dialog} title="ChatApp" />
              <Scene key="camera" component={Camera} title="ChatApp" />
              <Scene key="finish" component={FinishDialog} title="ChatApp" />
              <Scene key="preview" component={PhotoPreview} title="ChatApp" />
            </Stack>
          </Router>
        </PubNubProvider>
      </PersistGate>
    </Provider>
  );
};
