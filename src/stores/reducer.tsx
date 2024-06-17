import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { darkModeSlice, DarkModeState } from '../features/darkModeSlice';
import { offenseCalSlice, OffenseCalState } from '../features/offenseCalSlice';
import { languageSlice, langState } from '../features/languageSlice';
import { upToTwoSlice, upToTwoState } from '../features/upToTwoSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export type RootState = {
  darkMode: DarkModeState;
  language: langState;
  upToTwo: upToTwoState;
  offenseCal: OffenseCalState;
} & PersistPartial;

export const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  darkMode: darkModeSlice.reducer,
  language: languageSlice.reducer,
  upToTwo: upToTwoSlice.reducer,
  offenseCal: offenseCalSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
