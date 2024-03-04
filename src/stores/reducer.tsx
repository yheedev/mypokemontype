import { combineReducers } from 'redux';
import RootRoute from '../route/RootRoute';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { darkModeSlice } from '../features/darkModeSlice';
//import { createStore } from '@reduxjs/toolkit';

// function reducer(state, action) {
//   if (action.type === 'dark') {
//     return (...state, value:state.value + action.step);
//   }
// }

export const persistConfig = {
  key: 'root',
  storage,
};

export interface CombineReducers {}

export const rootReducer = combineReducers({
  RootRoute,
  darkMode: darkModeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
// export default rootReducer;

// export const store = createStore(persistedReducer);
