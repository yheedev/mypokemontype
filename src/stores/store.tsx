// import { configureStore } from '@reduxjs/toolkit';
// import reducer, { persistedReducer } from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import RootRoute from 'route/RootRoute';
import { persistStore } from 'redux-persist';
import persistedReducer, { rootReducer } from './reducer';
// import { darkModeSlice } from 'features/darkModeSlice';
// import rootReducer, { persistConfig } from './reducer';

export const initialState = {
  RootRoute,
  darkMode: {
    theme: 'light',
  },
};

// export const store = configureStore({
//   reducer: persistedReducer,
//   preloadedState: initialState,
// });

export const store = configureStore({
  reducer: {
    // darkMode: darkModeSlice.reducer,
    persistedReducer,
    reducer: rootReducer,
  },
  // devTools: process.env.NODE_ENV !== 'production',
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

// export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
