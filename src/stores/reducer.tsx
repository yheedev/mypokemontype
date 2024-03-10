import { combineReducers } from 'redux';
// import RootRoute from '../route/RootRoute';
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
  // RootRoute,
  // RootRoute: serializedRootRoute,
  darkMode: darkModeSlice.reducer,
});

// const serializedRootRoute = Serialization(RootRoute);

// function Serialization(RootRoute: () => import('react/jsx-runtime').JSX.Element) {
//   throw new Error('Function not implemented.');
// }

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;

// export default rootReducer;
