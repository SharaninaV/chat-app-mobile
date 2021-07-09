import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {Start} from './screens/Start';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './redux/rootReducer';
import rootSaga from './redux/rootSaga';
import {Provider} from 'react-redux';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://df9e82dcdbd14fdcb36cbf5816359961@o913672.ingest.sentry.io/5851872'
});

const middleware = [];
const saga = createSagaMiddleware();
middleware.push(saga);

const store = createStore(rootReducer, applyMiddleware(...middleware));

saga.run(rootSaga);

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Stack key="root">
          <Scene key="home" component={Start} title="ChatApp" />
          {/*<Scene key="" component={} title="" />*/}
          {/*<Scene key="" component={} />*/}
        </Stack>
      </Router>
    </Provider>
  );
};
