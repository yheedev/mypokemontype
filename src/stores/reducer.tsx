import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { darkModeSlice, DarkModeState } from '../features/darkModeSlice';

export type RootState = {
  darkMode: DarkModeState;
};

export const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  darkMode: darkModeSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
