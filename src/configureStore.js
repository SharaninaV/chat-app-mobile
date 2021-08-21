import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, compose, createStore } from "redux";
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from './redux/rootReducer';
import createSagaMiddleware from "redux-saga";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['asyncStorage', 'enterChat']
};

const enhancers = [];
const middleware = [];

export const saga = createSagaMiddleware();
middleware.push(saga);
enhancers.push(applyMiddleware(...middleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeEnhancers(...enhancers)
);

export const persistor = persistStore(store);
