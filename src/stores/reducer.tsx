import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { darkModeSlice, DarkModeState } from '../features/darkModeSlice';
import { offenseCalSlice, OffenseCalState } from '../features/offenseCalSlice';
import { langState, languageSlice } from '../features/languageSlice';

export type RootState = {
  darkMode: DarkModeState;
  language: langState;
  offenseCal: OffenseCalState;
};

export const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  darkMode: darkModeSlice.reducer,
  language: languageSlice.reducer,
  offenseCal: offenseCalSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
