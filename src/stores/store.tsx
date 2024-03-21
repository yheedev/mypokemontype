import { configureStore } from '@reduxjs/toolkit';
// import RootRoute from 'route/RootRoute';
import { persistStore } from 'redux-persist';
import { rootReducer, persistedReducer } from './reducer';
// import { PersistPartial } from 'redux-persist/lib/persistReducer';
// import { persistedReducer } from './reducer';
// import { RootState } from './reducer';

// const initialState: RootState = {
//   darkMode: {
//     theme: 'light',
//   },
// };

// const initialState: RootState & PersistPartial = {
//   darkMode: {
//     theme: 'light',
//   },
//   _persist: {
//     version: -1,
//     rehydrated: false,
//   },
// };

export const store = configureStore({
  reducer: persistedReducer,
  // preloadedState: initialState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['payload.err', 'err'],
      },
    }),

  //reducer: rootReducer,

  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(persistMiddleware, logger),
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }),
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),

  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

// export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
