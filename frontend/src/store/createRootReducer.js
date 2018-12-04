import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from '../services/Auth/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

export const createRootReducer = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
  });

  // logout interceptor: https://github.com/cngroupdk/vse-4it445-2017/blob/practical-11/frontend/src/store/configureStore.js

  return persistReducer(persistConfig, rootReducer);
};
