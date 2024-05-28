import { configureStore, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { rootReducer, persistedReducer } from './reducer';
//import { upToTwoState } from '../features/upToTwoSlice';
//import { OffenseCalState } from '../features/offenseCalSlice';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['payload.err', 'err'],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

// export type UpToTwoAction = PayloadAction<string>;
// export type OffenseCalAction = PayloadAction<OffenseCalState>;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, PayloadAction<string>>;
